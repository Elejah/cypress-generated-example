describe('Fake Store API Tests', () => {
  beforeEach(() => {
    // Visit Fake Store API before each test
    cy.visit('https://fakestoreapi.com/')
  })

  it('should have main heading and description', () => {
    // Verify main heading and description
    cy.get('h1').should('contain', 'Fake Store API')
    cy.get('p').should('contain', 'Fake store rest API for your e-commerce or shopping website prototype')
  })

  it('should show navigation links', () => {
    // Verify navigation links
    cy.get('nav').should('contain', 'Home')
    cy.get('nav').should('contain', 'Docs')
    cy.get('nav').should('contain', 'GitHub')
  })

  it('should show main resources section', () => {
    // Verify main resources are listed
    cy.get('h2').contains('Resources').should('be.visible')
    cy.get('ul').should('contain', 'Products')
    cy.get('ul').should('contain', 'Cart')
    cy.get('ul').should('contain', 'Users')
    cy.get('ul').should('contain', 'Login Token')
  })

  it('should show example code section', () => {
    // Verify example code section exists
    cy.get('h2').contains('Example Code').should('be.visible')
    cy.get('pre').should('contain', 'fetch')
    cy.get('pre').should('contain', 'products/1')
  })

  it('should show supported routes', () => {
    // Verify supported routes are listed
    cy.get('h2').contains('Routes').should('be.visible')
    cy.get('ul').should('contain', 'GET')
    cy.get('ul').should('contain', 'POST')
    cy.get('ul').should('contain', 'PUT')
    cy.get('ul').should('contain', 'PATCH')
    cy.get('ul').should('contain', 'DELETE')
  })

  it('should have working GitHub link', () => {
    // Verify GitHub link exists and is clickable
    cy.get('a').contains('GitHub').should('have.attr', 'href')
  })
}) 