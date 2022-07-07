/** @jsxImportSource @emotion/react */
import { FaArrowLeft } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { Link, useParams, useRoutes } from "react-router-dom";
import { client } from '../utils/client';
import { RoundButton } from './styledComponents';
import { auth, db } from '../../firebase-config';
import { collection, getDocs, query, where} from "firebase/firestore";
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

    const {data: bookIdData} = useQuery(['bookDetail', bookId], 
    () => client(`https://www.googleapis.com/books/v1/volumes/${bookId}?`))
    return (
        <div css={{
            width: 'clamp(250px, 80%, 500px)',
            marginTop: '15px',
            borderRadius: '15px',
            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(128, 128, 255) 0px 0px 0px 3px',
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
