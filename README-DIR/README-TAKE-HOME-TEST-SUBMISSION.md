# README for Take Home Assessment Submission

## Notes on the Specs
- Need to connect to an API and fetch user's albums
    - Data for each album includes metadata like
        - album_title
        - band_name
        - etc.
        
- No need to write the actual API call. It can be simulated
  using the given mockFetchHelper() function.
  
  - mockFetchHelper() simulates a delay in fetching results using setTimeout()
  
  - <em>need to display a loading indicator while the data is being fetched</em>

## Implementation Notes

### Display of Album Data on a Page
- for displaying table data we may want to use the react-table package
    
    
    https://react-table.tanstack.com/
    

- react-table has facilities for sorting, pagination, grouping of data, styling of data cells etc.

### Refresh Page
- a user may choose to refresh a page using the refresh icon on the browser's
  navigation tool bar
  
- or, we could provide a 'Refresh Page' button on the album data display page.

- implementing a refresh-page button looks like more work. We could use something like react-router or browser history api
  to change the current web page location url to include some sort-column and sort-direction params. And, process 
  the sort-column and direction in code to preserve the data display sort parameters.

## Assumptions
### General
I made the following assumptions

    - Date Released can be displayed in MM/DD/YYYY format
    - Genres for a band need to be listed in alphabetical order

### Sorting
I made the following assumptions about sorting columns

    - Sorting by Genres means sort the strings representing genre lists
    
    - a column can be in one of three states: unsorted, sorted in descending order and
      sorted in ascending order.
      
### Page Refresh

    - If no column is sorted, a page refresh results in the initial default sort.
     
## Architecture

- data sorting and pagination could shift to the backend API server
- when sorting and pagination is done on the backend, we would need to 
    - specify in the API call URL the field to sort on, and the direction of the sort
    - may want to specify page size for pagination (10/20/50 albums per page etc.)
 
    
 - <em>to account for possible shift of sorting and pagination to the backend</em>
 
    
    - we may want to wrap the given mockFetchHelper() in a fetchAlbumData() function which 
      could take the params
        - sort column
        - sort direction
        - page size
        
 - <em> It will be good include the following along with the album data returned 
   by the backend</em>
   
    - current page #
    - total number of pages
    - urls of numbered pages, next page, previous page, first page, and last page. 

## Feature Development Roadmap

Develop features of the app in the following sequence

   - Basic Skeleton
    
   - Read Album Data
    
   - Display Albums in a Table
    
   - Fix Album Data Display
    
   - Sort Album Data
   
   - Preserve Sort on Refresh

### Basic Skeleton
    - create-react-app
    - remove redundant boilerplate code
    
    - create components directory and the subdirectories
        - Home
        - Albums
        
    - set Home page title        

### Read Album Data
    - read the given album data
        - read the data when the Home page loads
        - use useEffect hook
        
        - given mockFetchHelper() function simulates elapsed time with a setTimeout()
        - to account for the delay in reading data, use async() and await() while 
          invoking mockFetchHelper()
          
    - use console.log() or breakpoints to verify that input data has been correctly read
    
    - display a 'Loading...' indicator while reading the album data
    
    - after reading the album data, display album titles

### Display Albums in a Table
    - add react-table to package.json 
    
    - setup the column headers and data accessors for the album data display table
    
    - create some basic styling of the album data display table
    
    - display album data in the table
        - display the raw data that you have read in. do not need to format genres, dates etc.
        

### Format Album Data Display
    - display columns in the expected order: Band, Album etc.
    
    - display Genres as a column separated list
    - round Average User Rating to 1 decimal place
    
    - format Date Released data
    - format Last Played data

### Sort Album Data

    - implement default sort
    - set column sort direction indicator
    - visually represent current sort
    - set background color of sorted column's header

    - make each column sortable
   

### Preserve Sort on Refresh
    - store sort column and direction
    
    - restore sort column on refresh
    - restore sort direction on refresh
    
###  "Future Proof" the App
Features in this section will not be implemented. The section outlines 
a segue into a future iteration of the App.

Look into

    - implementing pagination
    
    - writing a wrapper around mockFetchHelper(). pass in to the wrapper
        - a placeholder API URL
        - sort column and sort direction
        - page size
        
    - handling potential errors in the API call
    
    - implementing
        - album creation
        - album filtering
        - album data searching

