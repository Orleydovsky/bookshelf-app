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

    const [query, setQuery] = useState()
  
    const handleSearch = e => {
      e.preventDefault()
      setQuery(e.target.elements.search.value)
    }

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
          <Route path="/" element={<Discover handleSearch={handleSearch} query={query}/>} />
          <Route path="/book/:bookId" element={<BookDetail/>} />
          <Route path="*" element={<h1>Nothing found <Link to="/">Back</Link></h1>} />
        </Routes>
    </div>
    )
}

export default AuthenticatedApp