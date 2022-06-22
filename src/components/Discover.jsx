/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
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
        client(query)
            .then(responseData => {
                setData(responseData)
                setStatus('success')
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
        <>
        <SearchBar handleSearch={handleSearch} isError={isError} isLoading={isLoading}  />
        {isError ? 
            <div>
                <p>Nothing found</p>
                <pre>{error.message}</pre>
            </div> 
        : null}
        {isSuccess ? (
        data?.items?.length ? (
          <ul>
            {data.items.map(volume => (
              <li>
                <Card title={volume.volumeInfo.title}/>
              </li>
            ))}
          </ul>
        ) : (
          <p>No books found. Try another search.</p>
        )
      ) : null}
        </>
        )
}



export default Discover;