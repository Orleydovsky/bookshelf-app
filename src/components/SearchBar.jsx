/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import {FaSearch, FaTimes} from "react-icons/fa";
import {Spinner} from '../components/styledComponents'
import {client} from '../utils/client'
import Card from './Card';

function SearchBar() {
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
        <form onSubmit={handleSearch} 
        css={{
            border: `5px solid ${isError ? 'red' : '#8080ff'}`,
            display: 'flex',
            flexDirection:'row',
            alignItems: 'center',
            padding: '10px 20px',
            borderRadius: '5px',
            backgroundColor: 'transparent',
            width: '60%',
            }}
            >
            <input id="search" type="search" placeholder="Search books..." 
            css={{
                border: 'none',
                fontSize: '1em',
                width: '100%',
                '&:focus' : {
                    outline: 'none',
                }
            }}
            />
            {isLoading ? 
            <Spinner/> : 
            isError ? 
            <FaTimes color='red'/> : 
            <FaSearch color='#8080ff'/>}
        </form>
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



export default SearchBar;
