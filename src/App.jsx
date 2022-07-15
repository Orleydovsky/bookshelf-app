/** @jsxImportSource @emotion/react */
import React, { lazy, useState } from "react";
import "@reach/dialog/styles.css";
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { FullPageSpinner } from "./components/styledComponents";
import { BrowserRouter } from "react-router-dom";

const AuthenticatedApp = lazy(()=> import('./AuthenticatedApp'))
const UnauthenticatedApp = lazy(()=> import('./UnauthenticatedApp'))

function App() {
    const [status, setStatus] = useState('loading')
    const isLoading = status === 'loading'
    const isSuccess = status === 'success'
    onAuthStateChanged(auth, currentUser => {
        currentUser ? setStatus('success') : setStatus('idle')
    })
    
    if(isLoading) return <FullPageSpinner/>
    if(auth.currentUser) return (
    <BrowserRouter>
        <AuthenticatedApp/>
    </BrowserRouter>
    )
    return <UnauthenticatedApp/>
    
}
export default App
