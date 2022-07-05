/** @jsxImportSource @emotion/react */
import { FaArrowLeft, FaPlusCircle, FaMinusCircle, FaCheckCircle, FaBook, FaBookDead, FaPlus, FaRegCheckCircle } from 'react-icons/fa';
import { useQuery, useMutation } from 'react-query';
import { Link, useParams, useRoutes } from "react-router-dom";
import { client } from '../utils/client';
import { Button, Spinner } from './styledComponents';
import { auth, db } from '../../firebase-config';
import { collection, serverTimestamp, addDoc, getDocs, query, where, doc, setDoc, deleteDoc } from "firebase/firestore";
import { queryClient } from '../main';
import { useState } from 'react';

function BookDetail() {
    const {bookId} = useParams()
    const {data: userBooks} = useQuery(
        ['userBooks', auth.currentUser.uid], 
        () => getDocs(query(collection(db, "books"), 
            where("uid", "==", auth.currentUser.uid), 
            where("bookId", "==", bookId),
        )))
    return (
    <BookDetailCard bookId={bookId} docId={userBooks?.empty ? null : userBooks?.docs[0].id } userBook={userBooks?.empty ? null: userBooks?.docs[0].data()}/>
    );
}
 
function BookDetailCard({bookId, docId, userBook}) {

    const {data: bookIdData} = useQuery(['bookDetail', bookId], 
    () => client(`https://www.googleapis.com/books/v1/volumes/${bookId}?`))
    

    const talkToFirebase = async () => {
        if(!docId) {
            const docRef = await addDoc(collection(db, "books"), {
                uid: auth.currentUser.uid, 
                finishedOn: null,
                bookId: bookId,
            })
            docId = docRef.id
            // queryClient.invalidateQueries('userBooks')
        } 
        await setDoc(doc(db, "books", docId), {
            finishedOn: userBook.finishedOn ? null : serverTimestamp(),
        }, 
            {merge: true})
    }

    const deleteFromDataBase = async () => {
        await deleteDoc(doc(db, "books", docId))
        queryClient.invalidateQueries('finishedBooks')
        queryClient.invalidateQueries('readingList')
        queryClient.invalidateQueries('bookDetail')
        queryClient.invalidateQueries('userBooks')

    }

    const {mutate, isLoading} = useMutation(talkToFirebase, {
        onSuccess: () => {
            queryClient.invalidateQueries('userBooks')
            queryClient.invalidateQueries('finishedBooks')
            queryClient.invalidateQueries('readingList')
            queryClient.invalidateQueries('bookDetail')
        }
    })

     
    return (
        <div css={{
            width: 'clamp(250px, 80%, 500px)',
            marginTop: '15px',
            borderRadius: '15px',
            boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px',
            padding: '15px',
            }}>
            <div css={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>

                <Link to={'/'}>
                    <Button>
                        <FaArrowLeft/>
                    </Button>
                </Link>
                <div>
                {!docId ? 
                <Button onClick={mutate}>
                    {isLoading ? <Spinner css={{color: 'white'}}/> : <FaPlusCircle/>}
                </Button> :
                userBook.finishedOn ? 
                <>
                    <Button onClick={deleteFromDataBase}><FaMinusCircle/></Button>
                    <Button onClick={mutate}>
                    {isLoading ? <Spinner css={{color: 'white'}}/> : <FaBook/>}
                    </Button>
                </>
                : 
                <>
                    <Button onClick={deleteFromDataBase}><FaMinusCircle/></Button>
                    <Button onClick={mutate}>
                    {isLoading ? <Spinner css={{color: 'white'}}/> : <FaCheckCircle/>}
                    </Button>
                </>}
                </div>

            </div>
            <h2>{bookIdData?.volumeInfo.title} | {bookIdData?.volumeInfo.authors}</h2>
            <h3>{bookIdData?.volumeInfo.subtitle}</h3>
            <div css={{
                boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px',
                borderRadius: '15px',
                width: '150px',
                height: '200px',
                backgroundColor: 'white',
                backgroundImage: `url('${bookIdData?.volumeInfo?.imageLinks?.thumbnail}')`,
                backgroundSize: 'cover',
                }}>

            </div>
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
                color: 'black',
             }} dangerouslySetInnerHTML={{__html: bookIdData?.volumeInfo.description}}>
            </div>
        </div>
        </div>
    )
}

    
export {BookDetail, BookDetailCard}
