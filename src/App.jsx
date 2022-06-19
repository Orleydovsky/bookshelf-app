/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import "@reach/dialog/styles.css";
import UnauthenticatedApp from "./UnauthenticatedApp";
import AuthenticatedApp from "./AuthenticatedApp";

function App() {
    return (
        false ? <AuthenticatedApp/> : <UnauthenticatedApp/>
    )
}
export default App
