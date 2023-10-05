import {Component, OnInit} from '@angular/core';
import {GameFacade} from '../store/facade/game.facade';
import {filter, of, tap, zip} from 'rxjs';
import {shareReplay} from 'rxjs/operators'
import {Resource} from "../models/resource";
import {SWPlayerItem} from "@core/models/intefaces/common-response.interface";
import {SWCharacterProperties} from "@core/models/intefaces/character.interface";
import {SWStarshipProperties} from "@core/models/intefaces/starship.interface";

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
  rightPlayer$ = this.gameFacade.rightPlayer$;
  rightPlayerWins$ = this.gameFacade.rightPlayerWins$;
  losingIndex$ = this.gameFacade.losingIndex$;
  players$ = zip(this.leftPlayer$, this.rightPlayer$)
    .pipe(
      filter(([left, right]) => Boolean(left) && Boolean(right)));
  players: SWPlayerItem<SWCharacterProperties | SWStarshipProperties>[] = [];
  Resource = Resource;

  constructor(private gameFacade: GameFacade) {}

  ngOnInit() {
    this.gameFacade.fetchAllCharacters();
    this.gameFacade.fetchAllStarships();
    this.players$.subscribe(() => {
      this.activateClash();
    })
  }

  getPlayers(): void {
    this.gameInitialized = true;
    this.clashActivated = false;
    this.chosenResource === Resource.PEOPLE ? this.gameFacade.fetchRandomCharacters() : this.gameFacade.fetchRandomStarships()
  }

  activateClash() {
    this.clashActivated = true;
    this.gameFacade.updateWinsCounter();
  }
}
