Cypress.Commands.add('loadAndVisit', () => {
  cy.intercept('GET', '/api/hotels').as('fetchHotels');
  cy.visit('/hotel-collection');

  cy.wait('@fetchHotels');
});
