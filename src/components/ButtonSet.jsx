/** @jsxImportSource @emotion/react */
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
        <RoundButton onClick={mutate}>
            {isLoading ? <Spinner/> : <FaMinusCircle/>}
        </RoundButton>
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
        <RoundButton onClick={mutate}>
            {isLoading ? <Spinner/> : <FaPlusCircle/>}
        </RoundButton> 
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
            <RoundButton>
                <DeleteBookButton docId={docId}/>
            </RoundButton> 
            <RoundButton onClick={mutate}>
                {isLoading? <Spinner/> : isFinished ? <FaBook/> : <FaCheckCircle/>}
            </RoundButton>
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
