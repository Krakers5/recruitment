export class GamePageObject {
  get playButton(): Cypress.Chainable<JQuery> {
    return cy.get('[data-test="play-button"]');
  }

  get radioButtonPeople(): Cypress.Chainable<JQuery> {
    return cy.get('[data-test="mat-radio-people"]');
  }

  get radioButtonStarships(): Cypress.Chainable<JQuery> {
    return cy.get('[data-test="mat-radio-starships"]');
  }

  getCardByClass(className: string): Cypress.Chainable<JQuery> {
    return cy.get(`.${className}`);
  }

  get counter(): Cypress.Chainable<JQuery> {
    return cy.get('[data-test="counter"]');
  }
}

