describe('Attributes page', () => {
  before(() => {
    cy.visit('/');
    cy.get('[data-cy=menu]').click();
    cy.get('[data-cy=attributes]').click();
    cy.get('[data-cy=attribute-form]').should('be.visible');
    cy.validatePath('/attributes', true);
  });

  it('Displays list of attributes', () => {
    cy.get('[data-cy=table]').contains('td').should('have.length.greaterThan', 0);
  });

  // it('Add new Attribute', () => {
  //   cy.get('[data-cy=add-attribute]').click();
  //   const inputs = [
  //     'name',
  //     'label',
  //     'type',
  //     'icon',
  //     'validation',
  //     'multivalued',
  //     'identifier',
  //     'close',
  //     'save',
  //   ];
  //
  //   inputs.forEach(function (value) {
  //     cy.get(`[data-cy=${value}]`).should('be.visible');
  //   });
  //
  //   cy.get('[data-cy=name]').type(String(Math.floor(Math.random() * 1_000_000)));
  //   cy.get('[data-cy=label]').type(String(Math.floor(Math.random() * 1_000_000)));
  //
  //   //select('number').should('have.value', 'number');
  //   cy.get('[data-cy=icon]')
  //     .type(String(Math.floor(Math.random() * 1_000_000)))
  //     .click();
  //   cy.get('[data-cy=validation]')
  //     .type(String(Math.floor(Math.random() * 1_000_000)))
  //     .click();
  //   cy.get('[data-cy=multivalued] input').click({ force: true }).should('be.checked');
  //   cy.get('[data-cy=identifier] input').click({ force: true }).should('be.checked');
  //
  //   cy.get('mat-select[formControlName=basicType]', { withinSubject: null })
  //     .click()
  //     .get('mat-option')
  //     .contains('String')
  //     .click();
  //   // cy.get('[data-cy=type]')
  //   //   .eq(0)
  //   //   .click({ force: true })
  //   //   .wait(500)
  //   //   .first()
  //   //   .focus()
  //   //   .then(() => {
  //   //     cy.get('#String').click({ force: true });
  //   //   });
  //   // cy.get('[data-cy=save]').click();
  // });
});
