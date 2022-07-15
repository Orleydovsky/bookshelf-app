/** @jsxImportSource @emotion/react */
import Tooltip from "@reach/tooltip"
import "@reach/tooltip/styles.css";
import { addDoc, collection, deleteDoc, doc, serverTimestamp, setDoc } from "firebase/firestore"
import { FaBook, FaCheckCircle, FaMinusCircle, FaPlusCircle } from "react-icons/fa"
import { useMutation } from "react-query"
import { db } from "../../firebase-config"
import { queryClient } from "../main"
import { RoundButton, Spinner } from "./styledComponents"

function DeleteBookButton({docId}) {
    const {mutate, isLoading} = useMutation(
        () => deleteDoc(doc(db, "books", docId)),{
            onSuccess: () => {
                queryClient.invalidateQueries()
            }
        })

    return(
        <Tooltip label="Delete">
        <RoundButton onClick={mutate} className="delete">
            {isLoading ? <Spinner/> : <FaMinusCircle/>}
        </RoundButton>
        </Tooltip>
    )
}

function AddBookButton({user, bookId}) {
    const {mutate, isLoading} = useMutation(
        () => addDoc(collection(db, "books"), {
        uid: user,
        finishedOn: null,
        bookId: bookId,
    }), {
        onSuccess: () => {
            queryClient.invalidateQueries('userBooks')
        }
    })
    return(
        <Tooltip label="Add to reading list">
            <RoundButton onClick={mutate} className="add">
                {isLoading ? <Spinner/> : <FaPlusCircle/>}
            </RoundButton> 
        </Tooltip>
    )
}
function SwitchBookButton({docId, userBook}) {
    const isFinished = userBook?.finishedOn
    const {mutate, isLoading} = useMutation(
        () => setDoc(doc(db, "books", docId), {
            finishedOn: isFinished ? null : serverTimestamp(),
        }, 
            {merge: true}),{
                onSuccess: () => {
                    queryClient.invalidateQueries()
                }
            })
    return(
        <div css={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gridGap: '5px',
            }}>
            <DeleteBookButton docId={docId}/>
            <Tooltip label={isFinished?'Unmark as read':'Mark as read'}>
                <RoundButton onClick={mutate}>
                    {isLoading? 
                    <Spinner/> : 
                    isFinished ? 
                    <FaBook className="markAsUnread"/>: 
                    <FaCheckCircle className="markAsRead"/>}
                </RoundButton>
            </Tooltip>
        </div>
    )
}

function ButtonSet ({docId, user, bookId, userBook}) {
    return(
        <>
        {!docId ? 
        <AddBookButton user={user} bookId={bookId}/> :
        <SwitchBookButton docId={docId} userBook={userBook}/>}
        </>
    ) 
}

export { ButtonSet }
