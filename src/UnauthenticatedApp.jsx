/** @jsxImportSource @emotion/react */
import { Button, CloseButton } from "./components/styledComponents";
import { auth } from "../firebase-config";
import Logo from './assets/logo.png'
import { Modal, ModalContents, ModalDismissButton, ModalOpenButton } from "./components/Modal";
import { Form } from "./components/Form";
import { useAuthCreateUserWithEmailAndPassword,useAuthSignInWithEmailAndPassword } from "@react-query-firebase/auth";

const circleDismissButton = (
    <div css={{
        display: 'flex',
        flexDirection: 'row-reverse',
        }}>
        <CloseButton>&#10006;</CloseButton>
    </div>
)

export default function UnauthenticatedApp() {
        
    const {
        mutate: registerUser, 
        isLoading: registerLoading, 
        error: registerError
    } = useAuthCreateUserWithEmailAndPassword(auth);
        
    const {
        mutate: loginUser,
        isLoading: loginLoading,
        error: loginError,
    } = useAuthSignInWithEmailAndPassword(auth);

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
                    {circleDismissButton}
                </ModalDismissButton>
                    <h2>Login now!</h2>
                    <Form 
                        onSubmit={loginUser} 
                        buttonText={"Login"} 
                        isLoading={loginLoading} 
                        error={loginError}
                    />
                </ModalContents>
            </Modal>
            <Modal>
                <ModalOpenButton>
                    <Button name="password" variant='secondary'>Register</Button>
                </ModalOpenButton>
                <ModalContents>
                <ModalDismissButton>
                    {circleDismissButton}
                </ModalDismissButton>
                    <h2>Register today!</h2>
                    <Form 
                        onSubmit={registerUser} 
                        buttonText={"Register"} 
                        isLoading={registerLoading} 
                        error={registerError}
                     />
                </ModalContents>
            </Modal>
            </div>
        </div>
    )
}