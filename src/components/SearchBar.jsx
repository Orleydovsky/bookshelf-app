/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import {FaSearch} from "react-icons/fa";
import {Spinner} from '../components/styledComponents'


function SearchBar() {
    const [searchInput, setSearchInput] = useState('')
    const [queried, setQueried] = useState(false)
    const [loading, setLoading] = useState(false)
    const apiKey = import.meta.env.VITE_BOOKS_API_KEY

    useEffect(()=>{
        if (!queried) return
        setLoading(true)
        window.fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}&key=${apiKey}`)
            .then(response => response.json())
                .then(responseData => {
                    if (!responseData.totalItems) {
                        alert(`No results matching ${searchInput}`)
                        return
                    }
                    responseData.items.map(volumes => {
                        console.log(volumes.volumeInfo.title)
                    })
                    setLoading(false)
                })
    }, [searchInput])

    const handleSearch = e => {
        e.preventDefault()
        setSearchInput(e.target.elements.search.value)
        setQueried(true)
    }
    return (
        <form onSubmit={handleSearch} css={{
            border: '5px solid #8080ff;',
            display: 'flex',
            flexDirection:'row',
            justifyContent:'center',
            alignItems: 'center',
            padding: '10px 20px',
            borderRadius: '5px',
            }}>
            <input id="search" type="search" placeholder="Search books" css={{
                border: 'none',
                fontSize: '16px',
                '&:focus' : {
                    outline: 'none',
                }
            }}/>
            {loading ? <Spinner/ > : <FaSearch color='#8080ff'/>}
        </form>
    );
}

export default SearchBar;