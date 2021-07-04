import React, {useState, useEffect} from 'react';

import {mockFetchHelper} from '../Backend/mock_api'
import Albums from "../Albums";

import {albumData} from '../Backend/albumsData'

export default function Home() {
    const [albums, setAlbums] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect (() => {
        const getAlbums =  async () =>{
            const result = await mockFetchHelper(true, albumData, 2000)

            setAlbums(result.albums)
            setLoading(false)
        }

        getAlbums()
    }, [])

    return (
        <div>
            <h1>Albums</h1>
            {isLoading ? 'Loading Albums...' : <Albums albums={albums}/>}
        </div>
    )
}

