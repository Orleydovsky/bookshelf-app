/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import "@reach/dialog/styles.css";
import SearchBar from "./components/SearchBar";
import {auth} from "../firebase-config"
import { onAuthStateChanged, signOut } from "firebase/auth";


function AuthenticatedApp() {
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
        alignItems: 'center',
    }}>
        <h1>{user?.email}</h1>
        <button onClick={logout}>logout</button>
    <SearchBar />
    </div>
    )
}
export default AuthenticatedApp