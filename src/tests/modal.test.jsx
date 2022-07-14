//@vitest-environment jsdom
import { render, screen, within } from "@testing-library/react"
import { Modal, ModalContents, ModalOpenButton } from "../components/Modal"
import { Button } from "../components/styledComponents"
import userEvent from '@testing-library/user-event'
import { expect } from "vitest"

test('should open and close the modal',async () => { 
    const label = 'Modal Label'
    const title = 'Modal title'
    const content = 'Modal content'
    render(<Modal>
        <ModalOpenButton>
            <Button>open</Button>
        </ModalOpenButton>
        <ModalContents aria-label={label} title={title}>
            <div>{content}</div>
        </ModalContents>
    </Modal>)

    await userEvent.click(screen.getByRole('button', { name: /open/i }))
    const modal = screen.getByRole('dialog')
    expect(modal).toHaveAttribute('aria-label', label)

    const inModal = within(modal)
    expect(inModal.getByRole('heading', { name: /modal title/i })).toBeInTheDocument()
    await userEvent.click(inModal.getByRole('button', { name: /✖/i }))
 })