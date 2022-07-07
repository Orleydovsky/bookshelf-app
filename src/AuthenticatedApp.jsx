/** @jsxImportSource @emotion/react */
import { useState } from "react";
import "@reach/dialog/styles.css";
import {auth} from "../firebase-config"
import { signOut } from "firebase/auth";
import { queryClient } from "./main";
import {Header} from "./components/Header"
import {NavBar} from "./components/NavBar"
import {RoutesScreen} from "./components/RoutesScreen"


function AuthenticatedApp() {

    const [query, setQuery] = useState()
  
    const handleSearch = e => {
      e.preventDefault()
      setQuery(e.target.elements.search.value)
    }

    const logout = async (e) => {
        queryClient.removeQueries()
        await signOut(auth)
    }
      
    return (
      <div css={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        }}>
      <Header logout={logout}/>
      <NavBar/>
      <RoutesScreen handleSearch={handleSearch} query={query}/>
    </div>
    )
}

export default AuthenticatedApp
