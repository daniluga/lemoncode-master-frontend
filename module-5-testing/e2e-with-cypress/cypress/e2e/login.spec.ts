describe('Login specs', () => {
  it('', () => {
    // Arrange
    // Act
    cy.visit('http://localhost:8080');
    // Assert
  });

  it('should name input has the focus when it clicks on it', () => {
    // Arrange
    // Act
    cy.visit('/');
    cy.get('input[name="name"]').click();

    // Assert
    cy.get('input[name="name"]').should('have.focus');
  });

  it('should show an alert with a message when type invalid credentials', () => {
    // Arrange
    const user = 'admin';
    const password = '1234'; // password ok -> test

    //capturar el objeto window y meterlo en el stub
    cy.on('window:alert', cy.stub().as('alert'));

    // Act
    cy.visit('/');
    cy.findByRole('input[name="name"]').as('userInput');
    cy.findByLabelText('input[name="password"]').as('passwordInput');

    cy.get('@userInput').type(user);
    cy.get('@passwordInput').type(password);
    cy.findByRole('button', { name: 'Login' }).click();

    // Assert
    cy.get('@userInput').should('have.value', user);
    cy.get('@passwordInput').should('have.value', password);
    cy.get('@alert').should(
      'have.been.calledWith',
      'invalid credentials, use admin/test, excercise: display a mui snackbar instead of this alert.'
    );
  });

  it('should navigate to hotels when type valid credentials', () => {
    // Arrange
    const user = 'admin';
    const password = 'test'; // password ok -> test
    // Act
    cy.visit('/');
    cy.findByRole('input[name="name"]').as('userInput');
    cy.findByLabelText('input[name="password"]').as('passwordInput');
    cy.get('@userInput').type(user);
    cy.get('@passwordInput').type(password);
    cy.findbyRole('button', { name: 'Login' }).click();
    // Assert
    cy.url().should('include', '/hotels');
  });
});
