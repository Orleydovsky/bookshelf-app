import styled from '@emotion/styled/macro'
import { FaSpinner } from "react-icons/fa";
import {keyframes} from '@emotion/react'

const spin = keyframes({
  '0%': {transform: 'rotate(0deg)'},
  '100%': {transform: 'rotate(360deg)'}
})

const Spinner = styled(FaSpinner)({
  animation: `${spin} 1s linear infinite`,
  color: '#8080ff',
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
  })

  const CloseButton = styled.button({
    boxSizing: 'border-box',
    backgroundColor: '#f6f6f6',
    opacity: '0.6',
    border: 'none',
    cursor: 'pointer',
    position: 'absolute',
    right: '15px',
    top: '15px',
    padding: '10px 15px',
    borderRadius: '15px',
    transition: '0.3s',
    '&:hover': {
      opacity: '1',
      boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'
    }
  })

  export {
    Button, 
    Input, 
    FormGroup, 
    CloseButton, 
    Spinner,
  }