import { Component, OnInit } from '@angular/core';
import { GameFacade } from '../store/facade/game.facade';
import { filter, zip } from 'rxjs';
import { Resource } from '../models/resource';

@Component({
  selector: 'app-game-container',
  templateUrl: './game-container.component.html',
  styleUrls: ['./game-container.component.scss'],
})
export class GameContainerComponent implements OnInit {
  clashActivated = false;
  chosenResource: Resource = Resource.PEOPLE;
  gameInitialized = false;
  isLoading$ = this.gameFacade.isLoading$;
  leftPlayer$ = this.gameFacade.leftPlayer$;
  leftPlayerWins$ = this.gameFacade.leftPlayerWins$;
  losingIndex$ = this.gameFacade.losingIndex$;
  rightPlayer$ = this.gameFacade.rightPlayer$;
  players$ = zip(this.leftPlayer$, this.rightPlayer$).pipe(
    filter(([left, right]) => Boolean(left) && Boolean(right)),
    filter(([left, right]) => left !== null && right !== null),
  );
  rightPlayerWins$ = this.gameFacade.rightPlayerWins$;
  Resource = Resource;

  constructor(private gameFacade: GameFacade) {}

  ngOnInit() {
    this.gameFacade.fetchAllCharacters();
    this.gameFacade.fetchAllStarships();
    this.players$.subscribe(() => {
      this.activateClash();
    });
  }

  getPlayers(): void {
    this.gameInitialized = true;
    this.clashActivated = false;
    this.chosenResource === Resource.PEOPLE
      ? this.gameFacade.fetchRandomCharacters()
      : this.gameFacade.fetchRandomStarships();
  }
  activateClash() {
    this.clashActivated = true;
    this.gameFacade.updateWinsCounter();
  }
}
