/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { FaArrowLeft, FaPlusCircle, FaMinusCircle, FaCheckCircle, FaBook, FaBookDead, FaPlus, FaRegCheckCircle } from 'react-icons/fa';
import { useQuery, useMutation } from 'react-query';
import { Link, useParams } from "react-router-dom";
import { client } from '../utils/client';
import { Button, Spinner } from './styledComponents';
import { auth, db } from '../../firebase-config';
import { collection, serverTimestamp, addDoc, getDocs, query, where, doc, setDoc, deleteDoc } from "firebase/firestore";
import { queryClient } from '../main';

function BookDetail({userBooks}) {
    const {bookId} = useParams()
    return (<BookDetailCard bookId={bookId} userBooks={userBooks}/>);
}

function BookDetailCard({bookId, userBooks, docId}) {

    const defineInitialState = (bookId, userBooks) => {
        if(Boolean(userBooks?.docs.find(books => books.data().bookId == bookId))) return 'notListed'
        if(Boolean(userBooks?.docs.find(books => books.data().bookId == bookId && books.data().list === 'finishedBooks'))) return 'finishedBooks'
        return 'readingList'
    }
    
    const [bookList, setBookList] = useState(defineInitialState())

    const notListed = bookList === 'notListed'
    const onReadingList = bookList === 'readingList'
    const onFinishedBooks = bookList === 'finishedBooks'

    const {data: bookIdData} = useQuery(['bookDetail', bookId], 
    () => client(`https://www.googleapis.com/books/v1/volumes/${bookId}?`))
    

    const talkToFirebase = async () => {
        if(notListed) {
            const docRef = await addDoc(collection(db, "books"), {
                uid: auth.currentUser.uid, 
                createdAt: serverTimestamp(),
                bookId: bookId,
                list: 'readingList'
            }) 
            docId = docRef.id
            setBookList('readingList')
            } else if (onFinishedBooks) {
                await setDoc(doc(db, "books", docId), {
                    list: 'readingList',
                }, 
                    {merge: true})
                setBookList('readingList')
            } else if (onReadingList) {
                await setDoc(doc(db, "books", docId), {
                    list: 'finishedBooks',
                }, 
                {merge: true})
                setBookList('finishedBooks')
            }
    }

    const deleteFromDataBase = async () => {
        await deleteDoc(doc(db, "books", docId))
        queryClient.invalidateQueries('finishedBooks')
        queryClient.invalidateQueries('readingList')
    }

    const {mutate, isLoading} = useMutation(talkToFirebase, {
        onSuccess: () => {
            queryClient.invalidateQueries('finishedBooks')
            queryClient.invalidateQueries('readingList')
            queryClient.invalidateQueries('userBooks')
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

                {
                notListed ? 
                <Button onClick={mutate}>
                    {isLoading ? <Spinner css={{color: 'white'}}/> : <FaPlusCircle/>}
                </Button> :
                onFinishedBooks ? 
                <>
                    <Button onClick={deleteFromDataBase}><FaMinusCircle/></Button>
                    <Button onClick={mutate}>
                    {isLoading ? <Spinner css={{color: 'white'}}/> : <FaBook/>}
                    </Button>
                </>
                : onReadingList ? 
                <>
                    <Button onClick={deleteFromDataBase}><FaMinusCircle/></Button>
                    <Button onClick={mutate}>
                    {isLoading ? <Spinner css={{color: 'white'}}/> : <FaCheckCircle/>}
                    </Button>
                </>  
                : null
                } 
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
