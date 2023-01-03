describe('Candidates page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-cy=candidate-item]', { timeout: 10_000 });
  });

  it('Displays list of candidates', () => {
    cy.validatePath('/candidates', true);
    cy.get('[data-cy=candidate-item]').should('have.length.greaterThan', 0);
  });

  it('Creates new candidate', () => {
    const name = Math.floor(Math.random() * 1_000_000);

    cy.validatePath('/candidates', true);
    cy.get('[data-cy=new-candidate]').click();
    cy.contains('Create new candidate');
    cy.get('[data-cy=new-candidate-name]').type(name.toString());
    cy.get('[data-cy=create-new-candidate]').click();

    cy.validatePath(`/candidates/details/${name.toString()}`, true);
  });

  it('Goes to details page', () => {
    cy.get('[data-cy=candidate-item-more]').first().click({ force: true });
    cy.validatePath('/candidates/details', false);
    cy.get('[data-cy=back-button]').click();
    cy.get('[data-cy=candidate-item]').should('be.visible');
  });

  // it('Goes to Attributes page', () => {
  //   cy.get('[data-cy=menu]').click();
  //   cy.get('[data-cy=attributes]').click();
  //   cy.get('[data-cy=attribute-form]').should('be.visible');
  // });
});
