import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Dialog } from "@reach/dialog";
import '@reach/dialog/styles.css'

function Form({estaFuncion, buttonText}) {
    const handleSubmit = e => {
        e.preventDefault()
        const {username, password} = e.target.elements
        estaFuncion({
            username: username.value,
            password: password.value
        })
    }
    return (
    <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="username">Username:</label> 
            <input id="username" type="text" />
        </div>
        <div>
            <label id="password" htmlFor="password">Password:</label> 
            <input id="password" type="password" />
        </div>
        <button type="submit">{buttonText}</button>
    </form>
    )
  }

export default function App() {
    const fromLogin = (thisFormData) => {
        console.log('loginData', thisFormData)
    }
    const fromRegister = (thisFormData) => {
        console.log('registerData', thisFormData)
    }
    const [openModal, setOpenModal] = useState({
        login: false,
        register: false,
    })
    const {login, register} = openModal
    const handleClick = e => {
        setOpenModal({
            ...openModal,
            [e.target.name]: true,
        })
    }
    const handleClosing = () => {
        setOpenModal({login: false, register: false})
    }

    return <>
        <h1>Bookshelf</h1>
        <button name="login" onClick={handleClick}>Login</button>
        <button name="register" onClick={handleClick}>Register</button>

        <Dialog aria-label="Login form" isOpen={login}>
        <h3>Login content</h3>
            <button onClick={handleClosing}>&#10005;</button>
            <Form estaFuncion={fromLogin} buttonText="Login"/>
        </Dialog>
        <Dialog aria-label="Registration form" isOpen={register}>
        <h3>Register content</h3>
            <button onClick={handleClosing}>&#10005;</button>
            <Form estaFuncion={fromRegister}  buttonText="Register" />
        </Dialog>
    </>
}
const root = createRoot(document.getElementById("root"))
root.render(<App />)
