/** @jsxImportSource @emotion/react */

import React, { useEffect } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from '../../firebase-config';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { BookDetailCard } from './BookDetail';
import { FullPageSpinner } from './styledComponents';

function FinishedBooks() {
    
    const {data, isLoading, isSuccess} = useQuery(['finishedBooks', auth.currentUser.uid], () => getDocs(query(collection(db, "books"), where("uid", "==", auth.currentUser.uid), where("list", "==", "finishedBooks"))),{
        
    })
    return (
        <>
        {isLoading ? <FullPageSpinner/> :
        <div css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}>
        {
            data?.docs?.map(books => {
                return <BookDetailCard bookId={books.data().bookId} key={books.data().bookId}/>
            })
        }
        </div>
        }
        </>
    )
}

export default FinishedBooks;