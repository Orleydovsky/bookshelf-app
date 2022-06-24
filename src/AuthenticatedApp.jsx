/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import "@reach/dialog/styles.css";
import {auth} from "../firebase-config"
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Header } from './components/Header';
import Discover from "./components/Discover";
import BookDetail from "./components/BookDetail";
import { Routes, Route, Link } from 'react-router-dom'
import { useAuthSignOut } from "@react-query-firebase/auth";

function AuthenticatedApp() {
    const [data, setData] = useState()
    const logout = async () => {
        await signOut(auth)
    }

    

    return (<div css={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }}>
    <Header logout={logout}/>
        <Routes>
          <Route path="/" element={<Discover/>} />
          <Route path="/book/:bookId" element={<BookDetail data={data} />} />
          <Route path="*" element={<h1>Nothing found <Link to="/">Back</Link></h1>} />
        </Routes>
    </div>
    )
}

export default AuthenticatedApp