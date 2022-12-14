describe('Candidates detail page', () => {
  before(() => {
    cy.visit('/');
    cy.get('[data-cy=candidate-item]', { timeout: 10_000 });
    cy.get('[data-cy=candidate-item-more]').first().click({ force: true });
    cy.validatePath('/candidates/details', false);
  });

  it('Displays candidate details', () => {
    cy.validatePath('/candidates/details', false);
    cy.get('[data-cy=currentCandidate]').should('be.visible');
  });

  it('Should save comment', () => {
    const comment = Math.floor(Math.random() * 1_000_000);

    cy.get('[data-cy=comments]').click();
    cy.get('[data-cy=add-comment]', { timeout: 1000 });
    cy.get('[data-cy=comment]').type(comment.toString());
    cy.get('[data-cy=save-comment]').click();
  });

  it('Should open edit candidate modal', () => {
    cy.get('[data-cy=candidate-edit]').click();
    cy.get('[data-cy=edit-candidate]').should('be.visible');
    cy.get('[data-cy=cancel-edit]').click();
  });

  it('Main info should be opened', () => {
    cy.get('[data-cy=main-info]').should('be.visible');
  });

  it('Shows communication history', () => {
    cy.get('[data-cy=communication-history]').click();
    cy.get('[data-cy=comm-history]');
  });

  it('Shows candidates updates', () => {
    cy.get('[data-cy=candidate-updates]').click();
    cy.get('[data-cy=updates]');
  });
});
