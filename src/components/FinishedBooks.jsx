/** @jsxImportSource @emotion/react */

import React, { useEffect } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from '../../firebase-config';
import { useQuery } from 'react-query';
import { BookDetailCard } from './BookDetail';
import { FullPageSpinner } from './styledComponents';
import { Link } from 'react-router-dom';

function FinishedBooks() {
    
    const {data, isLoading} = useQuery(['finishedBooks', auth.currentUser.uid], () => getDocs(query(collection(db, "books"), where("uid", "==", auth.currentUser.uid), where("list", "==", "finishedBooks"))))
    return (
        <>
        {isLoading ? <FullPageSpinner/> :
        <div css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}>
        {
            data.empty ?
            <p css={{
                width: '60vw',
                fontSize: '1.25em'
                }}>
                There is nothing on your finished books list! head to the&nbsp;  
                <Link to="/"><strong>discover</strong></Link> page and start searching for awsome books
            </p> :
            data?.docs?.map(books => {
                const bookId = books.data().bookId

                return <BookDetailCard bookId={bookId} key={bookId} docId={books.id}/>
            }) 
        }
        </div>
        }
        </>
    )
}

export default FinishedBooks;