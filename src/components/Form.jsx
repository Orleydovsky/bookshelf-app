/** @jsxImportSource @emotion/react */
import React from "react";
import { Button, FormGroup, Input, Spinner } from './styledComponents';

export function Form({ onSubmit, buttonText }) {
    const handleSubmit = e => {
        e.preventDefault();
        const { username, password } = e.target.elements;
        onSubmit({
            username: username.value,
            password: password.value
        });
    };
    return (
        <form onSubmit={handleSubmit} css={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%',
        }}>
            <FormGroup>
                <label htmlFor="username">Username:</label>
                <Input id="username" type="text" placeholder="Username" />
            </FormGroup>
            <FormGroup>
                <label id="password" htmlFor="password">Password:</label>
                <Input id="password" type="password" placeholder="Password" />
            </FormGroup>
            <FormGroup><br />
            <Button type="submit">{false ? <Spinner /> : buttonText}</Button>
            </FormGroup>
        </form>
    );
}
