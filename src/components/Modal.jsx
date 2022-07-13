/** @jsxImportSource @emotion/react */
import React from "react"
import { CloseButton, DialogWindow } from "./styledComponents"

const ModalContext = React.createContext()

function Modal(props) {
  const [isOpen, setIsOpen] = React.useState(false)

  return <ModalContext.Provider value={[isOpen, setIsOpen]} {...props} />
}

function ModalDismissButton({children: child}) {
  const [, setIsOpen] = React.useContext(ModalContext)
  return React.cloneElement(child, {
    onClick: () => setIsOpen(false),
  })
}

function ModalOpenButton({children: child}) {
  const [, setIsOpen] = React.useContext(ModalContext)
  return React.cloneElement(child, {
    onClick: (...args) => {
      setIsOpen(true)
      if(child.props.onClick) {
        child.props.onClick(...args)
      }
    },
  })
}

function ModalContentsBase(props) {
  const [isOpen, setIsOpen] = React.useContext(ModalContext)
  return (
    <DialogWindow aria-label="dialog" isOpen={isOpen} onDismiss={() => setIsOpen(false)} {...props} />
  )
}

function ModalContents({title, children, ...props}) {
  return (
    <ModalContentsBase {...props}>
      <div css={{display: 'flex', justifyContent: 'flex-end'}}>
        <ModalDismissButton>
            <CloseButton>&#10006;</CloseButton>
        </ModalDismissButton>
      </div>
      <h2>{title}</h2>
      {children}
    </ModalContentsBase>
  )
}

export {Modal, ModalDismissButton, ModalOpenButton, ModalContents}