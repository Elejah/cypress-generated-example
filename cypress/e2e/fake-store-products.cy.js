describe('Fake Store API - Products Documentation', () => {
  beforeEach(() => {
    // Visit Products documentation
    cy.visit('https://fakestoreapi.com/docs#tag/Products')
  })

  it('should show Products documentation section', () => {
    // Verify Products section is visible
    cy.get('h2').contains('Products').should('be.visible')
  })
}) 