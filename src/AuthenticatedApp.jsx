/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import SearchBar from "./components/SearchBar";


function AuthenticatedApp() {

    return (<div css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }}>
        <h1>Authenticated</h1>
    <SearchBar />
    </div>
    )
}
export default AuthenticatedApp