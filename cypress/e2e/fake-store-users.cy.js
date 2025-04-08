describe('Fake Store API - Users Documentation', () => {
  beforeEach(() => {
    // Visit Users documentation
    cy.visit('https://fakestoreapi.com/docs#tag/Users')
  })

  it('should show Users documentation section', () => {
    // Verify Users section is visible
    cy.get('h2').contains('Users').should('be.visible')
  })
}) 