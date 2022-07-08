/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled/macro'
import { FaSpinner } from "react-icons/fa";
import {keyframes} from '@emotion/react'
import  { Dialog } from '@reach/dialog';
import "@reach/dialog/styles.css";


const DialogWindow = styled(Dialog)({
  width: 'clamp(200px, 90%, 300px)',
  borderRadius: '15px',
  paddingBottom: '3.5em',
  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
  margin: '20vh auto',
})

const spin = keyframes({
  '0%': {transform: 'rotate(0deg)'},
  '100%': {transform: 'rotate(360deg)'}
})

const Spinner = styled(FaSpinner)({
  animation: `${spin} 1s linear infinite`,
})
Spinner.defaultProps={
  'aria-label': 'loading',

}
const buttonVariants = {
    primary: {
      backgroundColor: '#8080ff',
      color: 'white',
    },
    secondary: {
      backgroundColor: '#e5e5e5',
      color: '#191919'
    },  
  }
  
  const Button = styled.button({
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '10px 20px',
    transition: '0.15s',
    color: 'white',
    '&:hover' : {
      boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'
    }
  }, ({variant = 'primary'}) => buttonVariants[variant])

  const RoundButton = styled.button({

    width: '40px',
    height: '40px',
    border: 'none',
    borderRadius: '50%',
    fontSize: '16px',
    transition: '0.15s',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',


    '&:hover' : {
      boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'
    }
  }, ({variant = 'primary'}) => buttonVariants[variant])
  
  const Input = styled.input({
    backgroundColor: '#f6f6f6',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 10px',
  })

  const FormGroup = styled.div({
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px',
  })
  
  const CloseButton = styled.button({
    boxSizing: 'border-box',
    backgroundColor: '#f6f6f6',
    opacity: '0.6',
    border: 'none',
    cursor: 'pointer',
    padding: '10px 15px',
    borderRadius: '15px',
    transition: '0.3s',
    '&:hover': {
      opacity: '1',
      boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'
    }
  })

  function FullPageSpinner() {
    return (
      <div
        css={{
          fontSize: '4em',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Spinner color='#8080ff'/>
      </div>
    )
  }

  export {
    Button, 
    Input, 
    CloseButton, 
    RoundButton,
    Spinner,
    FullPageSpinner,
    DialogWindow,
    FormGroup
  }