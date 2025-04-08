describe('Fake Store API - Carts Documentation', () => {
  beforeEach(() => {
    // Visit Carts documentation
    cy.visit('https://fakestoreapi.com/docs#tag/Carts')
  })

  it('should show Get all carts section', () => {
    // Verify Get all carts section
    cy.get('h2').contains('Get all carts').should('be.visible')
    cy.contains('Retrieve a list of all available carts.').should('be.visible')
  })

  it('should show cart operation buttons', () => {
    // Verify cart operation buttons
    cy.contains('Get all carts').should('be.visible')
    cy.contains('Add a new cart').should('be.visible')
    cy.contains('Get a single cart').should('be.visible')
    cy.contains('Update a cart').should('be.visible')
    cy.contains('Delete a cart').should('be.visible')
  })
}) 