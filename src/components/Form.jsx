/** @jsxImportSource @emotion/react */
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
                <label htmlFor="username" css={{marginBottom: '5px'}}>Email:</label>
                <Input id="username" type="text" placeholder="username@email.com" />
            </FormGroup>
            <FormGroup>
                <label id="password" htmlFor="password" css={{marginBottom: '5px'}}>Password:</label>
                <Input id="password" type="password" placeholder="Password" />
            </FormGroup>
            <FormGroup><br />
            <Button type="submit">{false ? <Spinner /> : buttonText}</Button>
            </FormGroup>
        </form>
    );
}
