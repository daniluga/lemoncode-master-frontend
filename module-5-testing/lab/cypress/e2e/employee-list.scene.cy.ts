import { name } from '#pods/employee/components/data.styles';

beforeEach(() => {});

describe('Verify employee list scene behaviour', () => {
  it('should navigate to employees list and add a new employee', () => {
    // Arrange
    const data = {
      user: 'admin',
      password: 'test',
      id: '123',
      tempPassword: 'Test123',
      name: 'Test',
      email: 'test@test.com',
      isActive: true,
    };

    // Act and Assert
    cy.visit('/');
    cy.findByTestId('user-input').as('userInput');
    cy.findByTestId('password-input').as('passwordInput');
    cy.get('@userInput').type(data.user);
    cy.get('@passwordInput').type(data.password);
    cy.findByRole('button', { name: /login/i }).click();
    cy.url().should('include', '/submodule-list');
    cy.findByRole('link', { name: /empleados/i }).click();
    cy.url().should('include', '/employees');
    cy.findByRole('button', { name: /nuevo empleado/i }).click();
    cy.findByTestId('employee-form').within(() => {
      cy.findByRole('textbox', { name: /id/i }).type(data.id, { force: true });
      cy.findByRole('textbox', { name: /clave temporal/i }).type(
        data.tempPassword
      );
      cy.findByRole('textbox', { name: /nombre/i }).type(data.name);
      cy.findByRole('textbox', { name: /email/i }).type(data.email);
      if (data.isActive) {
        cy.findByRole('checkbox', { name: /activo/i }).click();
      }
      cy.findByRole('button', { name: /guardar/i }).click();
    });
  });
});
