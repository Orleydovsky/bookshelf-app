/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import Card from './Card';
import { client } from '../utils/client';



function BookDetail() {
    const [data, setData] = useState()
    const [error, setError] = useState()
    const [status, setStatus] =useState()
    const {bookId} = useParams() 
    useEffect(()=>{
        client(`https://www.googleapis.com/books/v1/volumes/${bookId}?`)
            .then(responseData => {
                setData(responseData)
                setStatus('success')
                console.log(data)
            }, errorData => {
                setError(errorData)
                setStatus('error') 
              })
    }, [bookId])
    return (
        <div css={{

            width: '60vw',
            backgroundColor: '#DDD',
            marginTop: '15px',
            borderRadius: '15px',
            boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px',
            padding: '15px',
            }}>
            <h1>Titulo</h1>
            <h2>subtitulo</h2>
        <div css={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            <div css={{
                backgroundColor: 'white',
                width: '150px',
                height: '200px',
                borderRadius: '15px',
                }}>
                I am the photo
            </div>
            <div css={{
                backgroundColor: 'white',
                borderRadius: '15px',
                height: '200px',
                width: '100%',
                marginTop:' 15px',
                minWidth: '250px'
             }}>
            {data.volumeInfo.title}
            </div>
        </div>
        </div>
    );
}

export default BookDetail;