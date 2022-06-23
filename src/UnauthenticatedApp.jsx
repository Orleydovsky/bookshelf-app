/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { Button, CloseButton } from "./components/styledComponents";
import { Form } from "./components/Form";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";

function UnauthenticatedApp() {
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const fromLogin = async (thisFormData) => {
        setLoading(true)
        const {username, password} = thisFormData
        try {
            const user = await signInWithEmailAndPassword(auth, username, password)
        } catch (error) {
            setError(error)
        }
        setLoading(false)
    }
    
    const fromRegister = async (thisFormData) => {
        setLoading(true)
        const {username, password} = thisFormData
        try {
            const user = await createUserWithEmailAndPassword(auth, username, password)
        } catch (error) {
            setError(error)
        }
        setLoading(false)
    }

    const [openModal, setOpenModal] = useState({
        login: false,
        register: false,
    })
    const {login, register} = openModal
    
    const handleOpening = e => {
        setOpenModal({
            ...openModal,
            [e.target.name]: true,
        })
    }
    const handleClosing = () => {
        setOpenModal({login: false, register: false})
        setError(null)
    }

    const dialogCss = {
        width: 'clamp(200px, 50%, 300px)', 
        position: 'relative',
        borderRadius: '15px'
    }

    return (<div
    css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
        <img src="src\assets\logo.png" alt="Bookshelf logo" width="75px" height="75px"/>
            <h1 css={{color: '#8080ff'}}>Bookshelf</h1>
            <div css={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gridGap: '0.75rem',
            }}>

            <Button name="login" onClick={handleOpening}>
                Login
            </Button>
            <Button name="register" onClick={handleOpening} variant="secondary">
                Register
            </Button>

            </div>
            <Dialog aria-label="Login form" isOpen={login} css={dialogCss}>
                <CloseButton onClick={handleClosing}>&#10005;</CloseButton>
                <h2 css={{color: '#8080ff'}}>
                    Login now!
                </h2>
                <Form error={error} loading={loading} onSubmit={fromLogin} buttonText="Login" />
            </Dialog>

            <Dialog aria-label="Registration form" isOpen={register} css={dialogCss}>
                <CloseButton onClick={handleClosing}>&#10005;</CloseButton>
                <h2 css={{color: '#8080ff'}}>
                    Register today!
                </h2>
                <Form error={error} loading={loading} onSubmit={fromRegister}  buttonText="Register" />
            </Dialog>
    </div>
    )
}
export default UnauthenticatedApp