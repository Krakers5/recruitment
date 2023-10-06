import { GamePageObject } from '../support';

const gamePage = new GamePageObject();
describe('Starting page', () => {
  it('Visits the starting page', () => {
    cy.visit('/');
    gamePage.playButton.contains('Play');
    gamePage.radioButtonPeople.should('have.class', 'mat-mdc-radio-checked');
  });
});
