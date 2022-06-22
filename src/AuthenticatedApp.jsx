/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import "@reach/dialog/styles.css";
import SearchBar from "./components/SearchBar";
import {auth} from "../firebase-config"
import { onAuthStateChanged, signOut } from "firebase/auth";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import Card from "./components/Card";
import { Button } from "./components/styledComponents";

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
    <div css={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#8080ff',
        color: 'white',
        padding: '1em',
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'
        }}>
        <div css={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",    

        }}>
        <FaUser css={{
            marginRight: '15px',
            padding: '10px',
            borderRadius: '15px',
            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'
            }}/>
        Welcome, <br/>
        {auth.currentUser.email.split('@').slice(0, 1).join()}!
        </div>
         <Button onClick={logout}>
            <FaSignOutAlt/>
         </Button>
    </div>
    <h3>Discover books today!</h3>
    <SearchBar/>
    </div>
    )
}
export default AuthenticatedApp