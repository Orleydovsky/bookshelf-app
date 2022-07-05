/** @jsxImportSource @emotion/react */
import { addDoc, collection, deleteDoc, doc, serverTimestamp, setDoc } from "firebase/firestore"
import { FaBook, FaCheckCircle, FaMinusCircle, FaPlusCircle } from "react-icons/fa"
import { useMutation } from "react-query"
import { db } from "../../firebase-config"
import { RoundButton, Spinner } from "./styledComponents"

function DeleteBookButton({docId}) {
    const {mutate, isLoading} = useMutation(
        deleteDoc(doc(db, "books", docId)))
    return(
        <RoundButton onClick={mutate}>
            {isLoading ? <Spinner/> : <FaMinusCircle/>}
        </RoundButton>
    )
}

function AddBookButton({user, bookId}) {
    const {mutate, isLoading} = useMutation(
        addDoc(collection(db, "books"), {
        uid: user,
        finishedOn: null,
        bookId: bookId,
    }))
    return(
        <RoundButton onClick={mutate}>
            {isLoading ? <Spinner/> : <FaPlusCircle/>}
        </RoundButton> 
    )
}
function SwitchBookButton({isFinished, docId}) {

    const {mutate, isLoading} = useMutation(
        setDoc(doc(db, "books", docId), {
            finishedOn: isFinished ? null : serverTimestamp(),
        }, 
            {merge: true})
    )
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
                {isLoading? <Spinner/> : isFinished? <FaBook/> : <FaCheckCircle/>}
            </RoundButton>
        </div>
    )
}


function ButtonSet ({docId, user, bookId, userBook}) {
    const isFinished = userBook?.finishedOn
    return(
        <>
        {!docId ? 
        <AddBookButton user={user} bookId={bookId}/> :
        <SwitchBookButton isFinished={isFinished} docId={docId}/>}
        </>
    ) 
}

export {ButtonSet}
