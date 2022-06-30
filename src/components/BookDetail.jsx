/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { FaArrowLeft, FaPlusCircle, FaMinusCircle, FaCheckCircle, FaBook, FaBookDead, FaPlus } from 'react-icons/fa';
import { useQuery, useMutation } from 'react-query';
import { Link, useParams } from "react-router-dom";
import { client } from '../utils/client';
import { Button, Spinner } from './styledComponents';
import { auth, db } from '../../firebase-config';
import { collection, serverTimestamp, addDoc, getDocs, query, where, doc, setDoc } from "firebase/firestore";
import { queryClient } from '../main';

function BookDetailCard({bookId, docId}) {

    const {data} = useQuery(['books', auth.currentUser.uid], () => getDocs(query(collection(db, "books"), where("uid", "==", auth.currentUser.uid), where("bookId", "==", bookId))))  
    const [isListed, setIsListed] = useState(Boolean(data?.docs.find(items => items.data().bookId === bookId))) 
    console.log(isListed)
    const [isOnFinishedBooks, setIsOnFinishedBooks] = useState(Boolean(data?.docs.find(items => items.data().bookId === bookId && items.data().list === 'finishedBooks'))) 
    const {data: bookIdData} = useQuery(['bookDetail', bookId], 
    () => client(`https://www.googleapis.com/books/v1/volumes/${bookId}?`))

    const createDocumentOnDataBase = async () => {
        !isListed ?
            await addDoc(collection(db, "books"), {
            uid: auth.currentUser.uid, 
            createdAt: serverTimestamp(),
            bookId: bookId,
            list: 'readingList'
        }) 
        : 
        await setDoc(doc(db, "books", docId), {
            list: 'finishedBooks',
        }, 
            {merge: true}) 
    } 
    const {mutate, isLoading, isSuccess} = useMutation(createDocumentOnDataBase, {
        onSettled: () => queryClient.invalidateQueries('books')
    })

    return (
        <div css={{
            width: 'clamp(250px, 80%, 500px)' ,
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
                    isOnFinishedBooks ? 
                    <>
                        <Button><FaMinusCircle/></Button>
                        <Button><FaBook/></Button>
                    </> :
                    isListed || isSuccess ? 
                    <>
                        <Button><FaMinusCircle/></Button>
                        <Button><FaCheckCircle/></Button>
                    </> 
                    : 
                    <Button>
                    <FaPlusCircle/>
                    </Button>
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

function BookDetail() {

    const {bookId} = useParams() 

    return (
        <BookDetailCard bookId={bookId}/>
    );
}

export {BookDetail, BookDetailCard}