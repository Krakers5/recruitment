import { selectLeftPlayer } from './../store/game.selectors';
import { Component, OnInit } from '@angular/core';
import { GameFacade } from '../store/facade/game.facade';
import { Observable, filter, zip } from 'rxjs';

@Component({
  selector: 'app-game-container',
  templateUrl: './game-container.component.html',
  styleUrls: ['./game-container.component.scss'],
})
export class GameContainerComponent implements OnInit {
  constructor(private gameFacade: GameFacade) {}

  leftPlayer$ = this.gameFacade.leftPlayer$;
  rightPlayer$ = this.gameFacade.rightPlayer$;
  players$ = zip(this.leftPlayer$, this.rightPlayer$).pipe(filter(([left, right]) => Boolean(left) && Boolean(right)));


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
