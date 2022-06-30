/** @jsxImportSource @emotion/react */
import { useState } from "react";
import "@reach/dialog/styles.css";
import {auth} from "../firebase-config"
import { signOut } from "firebase/auth";
import { Header } from './components/Header';
import Discover from "./components/Discover";
import {BookDetail} from "./components/BookDetail";
import { Routes, Route, Link, useMatch, NavLink} from 'react-router-dom'
import ReadingList from "./components/ReadingList";
import FinishedBooks from "./components/FinishedBooks";
import { Button } from "./components/styledComponents";

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
    <div css={{
      marginTop: '15px',
      '& .active Button' : {
      boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
      border: '2.5px solid #6f6fff'
      }
    }}>
         <NavLink to='/' activeclassname='active'>
          <Button>
            Discover
          </Button>
         </NavLink>
         <NavLink to='/readinglist' activeclassname='active'>
          <Button>
            Reading list
          </Button>
         </NavLink>
         <NavLink to='/finishedbooks' activeclassname='active'>
          <Button>
             Finished books
          </Button>
         </NavLink>
         </div>
        <Routes>
          <Route path="/" element={
            <Discover 
              handleSearch={handleSearch} 
              query={query}
            />} 
          />
          <Route path="/book/:bookId" element={<BookDetail/>}/>
          <Route path="/readinglist" element={<ReadingList/>}/>
          <Route path="/finishedbooks" element={<FinishedBooks/>}/>
          <Route path="*" element={<h1>Nothing found <Link to="/">Back</Link></h1>} />
        </Routes>
    </div>
    )
}

export default AuthenticatedApp