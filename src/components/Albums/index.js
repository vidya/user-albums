import React from 'react';

import styled from 'styled-components'
import styles from './Album.module.scss'

import { useTable, useSortBy } from 'react-table'

const Styles = styled.div`
  height: 500px;
  overflow: auto;

  table {
    border-spacing: 0;
    border: 1px solid black;
    margin-top: 40px;
    margin-left: 40px;

    tbody tr:nth-child(odd) {
       background-color: #e6ffe6;
    }

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

function Table({
   columns,
   data,
}) {
    // use browser localStorage for preserving sortColumn and sortDirection across page refreshes

    // retrieve sortColumn from localStorage
    const getStoredSortColumnID = () => {
        const sortedColumnID = localStorage.getItem('sortedColumnID')
        if (sortedColumnID === "null") {
            return 'last_listened'
        }

        return sortedColumnID
    }

    // retrieve sortDirection from localStorage
    const getStoredSortedDescending = () => {
        const sortedColumnID = localStorage.getItem('sortedColumnID')
        if (sortedColumnID === "null") {
            return true
        }

        let sortedDescending = localStorage.getItem('sortedDescending')
        return sortedDescending === "true"
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        allColumns
    } = useTable({
        columns,
        data,

        initialState: {
            sortBy: [
                {
                    id: getStoredSortColumnID(),
                    desc: getStoredSortedDescending()
                }
            ]
        }
    }, useSortBy)

    // read the sorted column id from the react-table tableInstance
    const getTableSortColumnID = () => {
        const sortedCol = allColumns.find(col => col.isSorted)

        if (typeof sortedCol !== 'undefined') {
            return sortedCol.id
        }

        return undefined
    }

    // read the sort direction from the react-table tableInstance
    const getTableSortedDescending = () => {
        const sortedCol = allColumns.find(col => col.isSorted)

        if (typeof sortedCol !== 'undefined') {
            return sortedCol.isSortedDesc
        }

        return undefined
    }

    const tableSortColumnID = getTableSortColumnID()
    const tableSortedDescending = getTableSortedDescending()

    const sortedColumnID = (typeof tableSortColumnID === 'undefined') ? getStoredSortColumnID() : tableSortColumnID
    let sortedDescending = undefined
    if (typeof sortedColumnID !== 'undefined') {
        sortedDescending = (typeof tableSortedDescending === 'undefined') ? getStoredSortedDescending() : tableSortedDescending
    }

    if ((typeof sortedColumnID === 'undefined') || (typeof tableSortColumnID === 'undefined')) {
        localStorage.setItem('sortedColumnID', 'last_listened')
        localStorage.setItem('sortedDescending', "true")
    }
    else {
        localStorage.setItem('sortedColumnID', sortedColumnID)
        localStorage.setItem('sortedDescending', sortedDescending)
    }

    return (
        <table {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th
                            {...column.getHeaderProps([
                                    column.getSortByToggleProps(),
                                    {
                                        className: column.isSorted ? styles.sortedColumn : "",
                                        style: column.style
                                    },
                                ])
                            }
                        >
                            {column.render('Header')}
                            <span>
                                {(column.isSorted && (column.id === sortedColumnID))
                                    ? (column.isSortedDesc)
                                        ? ' 🔽'
                                        : ' 🔼'
                                    : ''}
                            </span>
                        </th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        })}
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

// modify raw input data into a form suitable for display
function getDisplayAlbums(albums) {
    const avgUserRatingDisplay = (rating) => (rating === null) ? "" : rating.toFixed(1)

    const dateReleasedDisplay = (date) => {
        let month = date.getMonth() + 1
        let day = date.getDay()
        let fullYear = date.getFullYear()

        month = month.toString().padStart(2, '0')
        day = day.toString().padStart(2, '0')

        return `${month}/${day}/${fullYear}`;
    }

    const lastPlayedDisplay = (date) => {
        let month = date.getMonth() + 1
        let day = date.getDay()
        let fullYear = date.getFullYear()

        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';

        month = month.toString().padStart(2, '0')
        day = day.toString().padStart(2, '0')

        hours = hours % 12;
        hours = hours ? hours : 12;
        hours = hours.toString().padStart(2, '0')
        minutes = minutes.toString().padStart(2, '0');

        return `${month}/${day}/${fullYear} ${hours}:${minutes} ${ampm}`
    }

    return albums.map(album => {
        return {
            ...album,

            "genres": album.genres.sort().join(),
            "avg_user_rating": avgUserRatingDisplay(album.avg_user_rating),

            "release_date": dateReleasedDisplay(new Date(album.release_date)),
            "last_listened": lastPlayedDisplay(new Date(album.last_listened)),
        }
    })
}

function Albums({albums}) {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Band',
                accessor: 'band_name',
            },
            {
                Header: 'Album',
                accessor: 'album_title',
            },
            {
                Header: 'Genres',
                accessor: 'genres',
            },
            {
                Header: 'Average User Rating',
                accessor: 'avg_user_rating',
            },
            {
                Header: 'Date Released',
                accessor: 'release_date',

                // convert the displayed form of release_date into unix time for comparison purposes
                sortType: (rowA, rowB, id, desc) => {
                    const dateA = new Date(rowA.values.release_date)
                    const dateB = new Date(rowB.values.release_date)

                    const timeA = dateA.getTime()
                    const timeB = dateB.getTime()

                    if (timeA < timeB) return -1;
                    if (timeA > timeB) return 1;
                    return 0;
                }
            },
            {
                Header: 'Last Played',
                accessor: 'last_listened',

                // convert the displayed form of release_date into unix time for comparison purposes
                sortType: (rowA, rowB, id, desc) => {
                    const dateA = new Date(rowA.values.last_listened)
                    const dateB = new Date(rowB.values.last_listened)

                    const timeA = dateA.getTime()
                    const timeB = dateB.getTime()

                    if (timeA < timeB) return -1;
                    if (timeA > timeB) return 1;
                    return 0;
                }
            },
        ],
        []
    )

    const displayAlbums = getDisplayAlbums(albums)
    const data = React.useMemo(() => displayAlbums, [displayAlbums])

    return (
        <Styles>
            <Table columns={columns} data={data} />
        </Styles>
    )
}

export default Albums

