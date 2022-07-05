/** @jsxImportSource @emotion/react */
import { FaArrowLeft, FaPlusCircle, FaMinusCircle, FaCheckCircle, FaBook, FaBookDead, FaPlus, FaRegCheckCircle } from 'react-icons/fa';
import { useQuery, useMutation } from 'react-query';
import { Link, useParams, useRoutes } from "react-router-dom";
import { client } from '../utils/client';
import { Button, RoundButton, Spinner } from './styledComponents';
import { auth, db } from '../../firebase-config';
import { collection, serverTimestamp, addDoc, getDocs, query, where, doc, setDoc, deleteDoc } from "firebase/firestore";
import { queryClient } from '../main';
import { useState } from 'react';
import { ButtonSet } from './ButtonSet';

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

    // const {data: bookIdData} = useQuery(['bookDetail', bookId], 
    // () => client(`https://www.googleapis.com/books/v1/volumes/${bookId}?`))

    const bookIdData = {
        volumeInfo: {
         title: 'The adventures of Martha the Martian',
         authors: 'J.P. Mejía',
         description: 'Marvin was never named in the original shorts – he was referred to as the Commander of Flying Saucer X-2 in The Hasty Hare in 1952, and sometimes referred to as "Antwerp" in promotional material or other projects like the live stage show version of Bugs Bunny in Space. However, in 1979, once the character attracted merchandising interest, the name "Marvin" was selected for The Bugs Bunny/Road Runner Movie.[4] Marvin appeared in five theatrical cartoons from 1948 to 1963:',
         imageLinks: {
            thumbnail: 'https://i.pinimg.com/originals/73/b5/7a/73b57a5169ef151b7f8ce24ef51eae7a.jpg'
         }
        }
    }
    

    const talkToFirebase = async (e) => {
        console.log(e.target)
        if(e.target.id == 'delete') {
            await deleteDoc(doc(db, "books", docId))
        } else {
            if(!docId) {
                const docRef = await addDoc(collection(db, "books"), {
                    uid: auth.currentUser.uid, 
                    finishedOn: null,
                    bookId: bookId,
                })
                docId = docRef.id
                queryClient.invalidateQueries('userBooks')
            }
            await setDoc(doc(db, "books", docId), {
                finishedOn: userBook?.finishedOn ? null : serverTimestamp(),
            }, 
                {merge: true})
        }
    }

    const {mutate, isLoading} = useMutation(
        talkToFirebase, 
        {
        onSuccess: () => {
            queryClient.invalidateQueries()
        }})

     
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
                    <RoundButton>
                        <FaArrowLeft/>
                    </RoundButton>
                </Link>
                <div css={{display: 'flex', flexDirection:'row'}}>
                {
                isLoading ? <Spinner/> :
                !docId ? 
                <RoundButton onClick={mutate}>
                    <FaPlusCircle/>
                </RoundButton> :
                userBook.finishedOn ? 
                <>
                    <RoundButton onClick={mutate}><FaMinusCircle/></RoundButton>
                    <RoundButton onClick={mutate}><FaBook/></RoundButton>
                </>
                : 
                <>
                    <RoundButton onClick={mutate}><FaMinusCircle/></RoundButton>
                    <RoundButton onClick={mutate}><FaCheckCircle/></RoundButton>
                </>}
                </div>
                <ButtonSet docId={docId} user={auth.currentUser.uid} bookId={bookId} userBook={userBook}/>

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
