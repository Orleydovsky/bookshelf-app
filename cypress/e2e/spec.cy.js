/// <reference types="cypress" />

describe('should allow a typical user flow', () => {
  it('can login', () => {
    cy.visit('http://localhost:3000/')

    cy.findByRole('dialog').should('not.exist')
    cy.findByRole('button', { name: /register/i }).click()
    cy.findByRole('dialog').should('be.visible')
    cy.findByRole('dialog').within(() => {
      cy.findByRole('textbox', { name: /Email:/i }).type('test@test.com')
      cy.findByPlaceholderText(/password/i).type('123456')
      cy.findByRole('button', { name: /register/i }).click()
      cy.get('.errorMessage').should('contain', 'Error (auth/email-already-in-use).')
      cy.findByRole('button', { name: /✖/i }).click()
    })

    cy.findByRole('button', { name: /login/i }).click()
    cy.findByRole('dialog').should('be.visible')
    cy.findByRole('dialog').within(() => {
      cy.findByRole('textbox', { name: /Email:/i }).type('test@test.com')
      cy.findByPlaceholderText(/password/i).type('123456')
      cy.findByRole('button', { name: /login/i }).click()
    })
  })

  it('can search for books and add them reading list', () => {
    cy.findByRole('searchbox').type('vampyr{enter}')
    cy.get('p').first().click()
    cy.get('.add').click()
    cy.wait(3000)
    cy.get('.delete').should('exist')
    cy.get('.markAsRead').should('exist')
  })

  it('can mark books as finished', () => {
    cy.visit('http://localhost:3000/readinglist')
    cy.get('.delete').should('exist')
    cy.get('.markAsRead').click()
    cy.wait(3000)
  })

  it('can delete a book from finished list', () => {
    cy.visit('http://localhost:3000/finishedbooks')
    cy.get('.delete').click()
    cy.wait(3000)
  })

  it('can logout', () => {
    cy.get('.logout').click()
  })
})
