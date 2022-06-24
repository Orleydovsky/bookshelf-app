/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import Card from './Card';
import { client } from '../utils/client';
import parse from 'html-react-parser';



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
            <h2>{data?.volumeInfo.title} | {data?.volumeInfo.authors}</h2>
            <h3>{data?.volumeInfo.subtitle}</h3>
        <div css={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            <div css={{
                backgroundColor: 'white',
                borderRadius: '15px',
                marginTop:' 15px',
                padding: '15px',
             }} dangerouslySetInnerHTML={{__html: data?.volumeInfo.description}}>
            </div>
        </div>
        </div>
    );
}

export default BookDetail;