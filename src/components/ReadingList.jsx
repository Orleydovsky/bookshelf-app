import React, { useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from '../../firebase-config';
import { useQuery } from 'react-query';
import BookDetail from './BookDetail';
import { Link } from 'react-router-dom';

function ReadingList() {
    const {data, isLoading} = useQuery('books', () => getDocs(collection(db, "books")))

    return (
        <>

        <Link to="/">Back</Link>
        <div>
            {isLoading? <p>Loading...</p>: 
            <ul>
                {data?.docs.map(favorites => {
                    return <li>
                        {favorites.data().bookId}
                    </li>
                })}
            </ul>
            }
        </div>
        </>
    )
}

export default ReadingList;