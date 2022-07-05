/** @jsxImportSource @emotion/react */
import { useState } from "react";
import "@reach/dialog/styles.css";
import {auth, db} from "../firebase-config"
import { signOut } from "firebase/auth";
import { queryClient } from "./main";
import { useQuery } from "react-query";
import {Header} from "./components/Header"
import {NavBar} from "./components/NavBar"
import {RoutesScreen} from "./components/RoutesScreen"
import { getDocs, query, collection, where } from "firebase/firestore";
import { RoundButton } from "./components/styledComponents";
import { FaBook } from "react-icons/fa";

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