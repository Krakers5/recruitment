import { Component, OnInit } from '@angular/core';
import { GameFacade } from '../store/facade/game.facade';

@Component({
  selector: 'app-game-container',
  templateUrl: './game-container.component.html',
  styleUrls: ['./game-container.component.scss'],
})
export class GameContainerComponent implements OnInit {
  constructor(private gameFacade: GameFacade) {}

  ngOnInit() {
    this.gameFacade.fetchAllCharacters();
    this.gameFacade.fetchAllStarships();
  }

  getRandomCharacters() {
    this.gameFacade.fetchRandomCharacters();
  }

  getRandomStarships() {
    this.gameFacade.fetchRandomStarships();
  }
}
