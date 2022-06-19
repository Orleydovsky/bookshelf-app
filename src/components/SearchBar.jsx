/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import {FaSearch, FaTimes} from "react-icons/fa";
import {Spinner} from '../components/styledComponents'
import {client} from '../utils/client'


function SearchBar() {
    const [status, setStatus] = React.useState('idle')
    const [data, setData] = React.useState()
    const [error, setError] = React.useState()
    const [query, setQuery] = React.useState()
    const [queried, setQueried] = React.useState(false)
  
    const isLoading = status === 'loading'
    const isSuccess = status === 'success'
    const isError = status === 'error'

    useEffect(()=>{
        if (!queried) return
        setStatus('loading')
        client(query)
            .then(responseData => {
                setData(responseData)
                setStatus('sucess')
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
                fontSize: '16px',
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
        </div> : null}
        </>
        )
}

export default SearchBar;
