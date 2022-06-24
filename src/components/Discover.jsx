/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {client} from '../utils/client'
import Card from './Card';
import SearchBar from './SearchBar';


function Discover() {
    const [status, setStatus] = useState('idle')
    const [data, setData] = useState()
    const [error, setError] = useState()
    const [query, setQuery] = useState()
    const [queried, setQueried] = useState(false)
  
    const isLoading = status === 'loading'
    const isSuccess = status === 'success'
    const isError = status === 'error'

    useEffect(()=>{
        if (!queried) return
        setStatus('loading')
        client(`https://www.googleapis.com/books/v1/volumes?q=${query}&`)
            .then(responseData => {
                setData(responseData)
                setStatus('success')
                console.log(data)
            }, errorData => {
                setError(errorData)
                setStatus('error') 
              })
    }, [query, queried])

    const handleSearch = e => {
        e.preventDefault()
        setQuery(e.target.elements.search.value)
        setQueried(true)
    }
    return (
        <div css={{
          width: '60%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <h2>Discover books today!</h2>
        <SearchBar handleSearch={handleSearch} isError={isError} isLoading={isLoading}  />
        {isError ? 
            <div>
                <p>Nothing found</p>
                <pre>{error.message}</pre>
            </div> 
        : null}
        {isSuccess ? (
        data?.items?.length ? (
          <div css={{
        display: 'grid',
        width: '100%',
        gridGap: '15px',
        gridTemplateColumns: 'repeat(auto-fill, 150px)',
        gridAutoRows: '200px',
        justifyContent: 'center',
        marginTop: '15px',
         }}>
            {data.items.map(volume => (
              <Link key={volume.id} to={`book/${volume.id}`} css={{
            textDecoration: 'none',
        }}>
                <Card  data={data} title={volume.volumeInfo.title} imageURl={volume.volumeInfo.imageLinks?.thumbnail}/>
                </Link>
            ))}
          </div>
        ) : (
          <p>No books found. Try another search.</p>
        )
      ) : null}
        </div>
        )
}



export default Discover;
