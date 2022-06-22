/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import "@reach/dialog/styles.css";
import {auth} from "../firebase-config"
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Header } from './components/Header';
import Discover from "./components/Discover";

function AuthenticatedApp() {
    const [data, setData] = useState()
    const logout = async () => {
        await signOut(auth)
    }
    const [user, setUser] = useState({})
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    })
    return (<div css={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }}>
    <Header logout={logout}/>
    <h3>Discover books today!</h3>
    <Discover/>
    </div>
    )
}
export default AuthenticatedApp