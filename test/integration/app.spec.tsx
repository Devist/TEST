export {}

it('should work', () => {
  cy.visit('http://localhost:5015/dashboard/home')
  cy.get('a').should('have text', 'Learn React')
})
