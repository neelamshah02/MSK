describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true);
  });
});

describe('My First Test', () => {
  it('Gets, types and asserts', () => {
    cy.visit('https://sdir-d-cdnep-apsminsidekvalifikasjoner.azureedge.net/#/'); // Yields the window of the remote page
    cy.contains('ID-porten').click();
    cy.contains('MinID').click();

    cy.get('#input_USERNAME_IDPORTEN').type('22035601345');
    cy.get('#input_PASSWORD_IDPORTEN').type('password01');
    cy.contains('Neste').click();

    cy.get('#input_PINCODE1_IDPORTEN').type('12345');
    cy.contains('Neste').click();

    cy.contains('Meld inn fartstid').click();

    cy.get('#personNumber').type('15120599558'); // Type 'Hello, World' into the 'input'
    cy.get('#firstName').type('ULF');
    cy.get('#lastName').type('FAMILIE');
    cy.contains('Neste').click();
    cy.contains('Neste').click();

    cy.get('#vesselName').type('Maritime');
    cy.get('#startDate').type('2020-08-07');
    cy.get('#endDate').type('2020-08-07');
    cy.get('#hours').type('12');

    cy.contains('Legg til').click();
  });
});
