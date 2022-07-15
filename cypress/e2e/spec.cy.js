describe('should allow a typical user flow', () => {
  it('can login', () => {
    
    cy.visit('http://localhost:3000/')
    
    cy.findByRole('dialog').should('not.exist')
    cy.findByRole('button', {name: /register/i}).click()
    cy.findByRole('dialog').should('be.visible')
    cy.findByRole('dialog').within(()=>{
      cy.findByRole('textbox', {name: /Email:/i}).type('test@test.com')
      cy.findByPlaceholderText(/password/i).type('123456')
      cy.findByRole('button', {name: /register/i}).click()
      cy.get('.errorMessage').should('contain', 'Error (auth/email-already-in-use).')
      cy.findByRole('button', {name: /✖/i}).click()
    })

    cy.findByRole('button', {name: /login/i}).click()
    cy.findByRole('dialog').should('be.visible')
    cy.findByRole('dialog').within(()=>{
      cy.findByRole('textbox', {name: /Email:/i}).type('test@test.com')
      cy.findByPlaceholderText(/password/i).type('123456')
      cy.findByRole('button', {name: /login/i}).click()
    })
    
  })
  
  it('can search for books and add them reading list and then to the finished books', async () => {
    cy.findByRole('searchbox').type('vampyr{enter}')
    cy.get('p').first().click()
    cy.get('.add').click()
    cy.wait(5000)
    cy.get('.markAsRead').click()
    cy.wait(5000)
    cy.visit('http://localhost:3000/finishedbooks')
    
  })

  // it('can mark a book as read', () => {
  //   cy.get('.markAsRead').click()
  // })

  // it('can logout', () => {
  //   cy.get('.logout').click()

  // })
})