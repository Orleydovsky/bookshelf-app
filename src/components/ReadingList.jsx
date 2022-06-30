/** @jsxImportSource @emotion/react */

import React, { useEffect } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from '../../firebase-config';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { BookDetailCard } from './BookDetail';
import { FullPageSpinner } from './styledComponents';

function ReadingList() {
    
    const {data, isLoading, isSuccess} = useQuery(['readingList', auth.currentUser.uid], () => getDocs(query(collection(db, "books"), where("uid", "==", auth.currentUser.uid), where("list", "==", "readingList"))))
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
                const bookId = books.data().bookId

                return <BookDetailCard bookId={bookId} key={bookId} docId={books.id}/>
            })
        }
        </div>
        }
        </>
    )
}

export default ReadingList;