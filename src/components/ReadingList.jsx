import React, { useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from '../../firebase-config';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { BookDetailCard } from './BookDetail';

function ReadingList() {
    const {data, isLoading, isSuccess} = useQuery('books', () => getDocs(collection(db, "books")))
    return (
        <div>
        <Link to="/">Back</Link> 
        {
            data.docs.map(books => {
                return <BookDetailCard bookId={books.data().bookId}/>
            })
        }
        </div>
    )
}

export default ReadingList;