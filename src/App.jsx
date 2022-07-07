/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import "@reach/dialog/styles.css";
import UnauthenticatedApp from "./UnauthenticatedApp";
import AuthenticatedApp from "./AuthenticatedApp";
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { FullPageSpinner } from "./components/styledComponents";
import { BrowserRouter } from "react-router-dom";


function App() {
    const [status, setStatus] = useState('loading')
    const isLoading = status === 'loading'
    const isSuccess = status === 'success'
    onAuthStateChanged(auth, currentUser => {
        currentUser ? setStatus('success') : setStatus('idle')
    })
        
    return (
        <React.Fragment>
        {isLoading ? 
        <FullPageSpinner/> : 
        isSuccess ?
        
        <BrowserRouter>
            <AuthenticatedApp/>  
        </BrowserRouter> :     
        <UnauthenticatedApp/>}
        </React.Fragment>
    )
}
export default App
