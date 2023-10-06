import { GamePageObject, randomCharacter, randomStarships } from '../support';

const gamePage = new GamePageObject();
describe('Playing game', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.intercept('GET', 'https://www.swapi.tech/api/people/*', {
      fixture: 'get-random-character.json',
    });

    cy.intercept('GET', 'https://www.swapi.tech/api/starships/*', {
      fixture: 'get-random-starship.json',
    });

    cy.intercept(
      {
        method: 'GET',
        url: 'https://www.swapi.tech/api/people/*',
        times: 1,
      },
      {
        statusCode: 200,
        body: randomCharacter[0],
      },
    );

    cy.intercept(
      {
        method: 'GET',
        url: 'https://www.swapi.tech/api/people/*',
        times: 1,
      },
      {
        statusCode: 200,
        body: randomCharacter[1],
      },
    );

    cy.intercept(
      {
        method: 'GET',
        url: 'https://www.swapi.tech/api/starships/*',
        times: 1,
      },
      {
        statusCode: 200,
        body: randomStarships[0],
      },
    );

    cy.intercept(
      {
        method: 'GET',
        url: 'https://www.swapi.tech/api/starships/*',
        times: 1,
      },
      {
        statusCode: 200,
        body: randomStarships[1],
      },
    );
  });

  it('Playing the first game', () => {
    // I know it's an anti-pattern and should be sth like ('@getPeople') but with this approach the test was unstable.
    // There was sometimes a timeout error, although the request had status 200. I found github issues with similar problem
    // and unfortunately didn't manage to quickly find solution for this problem
    cy.wait(2000);
    const winnerClass = 'game-card__winner';
    const loserClass = 'game-card__loser';
    gamePage.playButton.click();
    gamePage.playButton.contains('Play Again');
    gamePage.getCardByClass(winnerClass).contains('Winner');
    gamePage.getCardByClass(winnerClass).contains('19BBY');
    gamePage.getCardByClass(loserClass).contains('Mark');
    gamePage.counter.contains('Right player wins: 1');
  });

  it('Playing the next game with different resource', () => {
    const winnerClass = 'game-card__winner';
    const loserClass = 'game-card__loser';
    cy.wait(2000);
    gamePage.playButton.click();
    gamePage.radioButtonStarships.click();
    gamePage.playButton.click();
    gamePage.getCardByClass(winnerClass).contains('Death Star');
    gamePage.getCardByClass(loserClass).contains('Losing Star');
    gamePage.playButton.click();
    gamePage.getCardByClass('game-card').contains('Draw');
  });
});
