/** @jsxImportSource @emotion/react */
import { Button, FormGroup, Input, Spinner } from './styledComponents'

export function Form ({ onSubmit, buttonText, error, isLoading }) {
  const handleSubmit = e => {
    e.preventDefault()
    const { username, password } = e.target.elements
    onSubmit({
      email: username.value,
      password: password.value
    })
  }
  return (
    <form onSubmit={handleSubmit} css={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: '100%',
      position: 'relative'
    }}>
      <FormGroup>
        <label htmlFor="username" css={{ marginBottom: '5px' }}>Email:</label>
        <Input id="username" type="text" placeholder="username@email.com" />
      </FormGroup>
      <FormGroup>
        <label id="password" htmlFor="password" css={{ marginBottom: '5px' }}>Password:</label>
        <Input id="password" type="password" placeholder="Password" />
      </FormGroup>
      {error ? <p className='errorMessage'>{error.message.split(': ')[1]}</p> : null}
      <Button type="submit">{isLoading ? <Spinner/> : buttonText}</Button>
    </form>
  )
}
