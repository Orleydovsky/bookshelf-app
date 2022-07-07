/** @jsxImportSource @emotion/react */
import { Button, CloseButton, RoundButton } from "./components/styledComponents";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import Logo from './assets/logo.png'
import { Modal, ModalContents, ModalDismissButton, ModalOpenButton } from "./components/Modal";

export default function UnauthenticatedApp() {
    return (
        <div css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100vh',
            }}>
            <img src={Logo} alt="Bookshelf logo" width="75px" height="75px"/>
            <h1 css={{color: '#8080ff'}}>Bookshelf</h1>
            <div css={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gridGap: '0.75rem',
                }}>
            <Modal>
                <ModalOpenButton>
                    <Button name="login">Login</Button>
                </ModalOpenButton>
                <ModalContents>
                <ModalDismissButton>
                    <CloseButton>&#10006;</CloseButton>
                </ModalDismissButton>
                    <h2>Login now!</h2>
                </ModalContents>
            </Modal>
            </div>
        </div>
    )
}

// const fromLogin = async (thisFormData) => {
//     setLoading(true)
//     const {username, password} = thisFormData
//     try {
//         const user = await signInWithEmailAndPassword(auth, username, password)
//     } catch (error) {
//         setError(error)
//     }
//     setLoading(false)
// }

// const fromRegister = async (thisFormData) => {
//     setLoading(true)
//     const {username, password} = thisFormData
//     try {
//         const user = await createUserWithEmailAndPassword(auth, username, password)
//     } catch (error) {
//         setError(error)
//     }
//     setLoading(false)
// }