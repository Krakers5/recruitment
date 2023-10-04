import {Component, OnInit} from '@angular/core';
import {GameFacade} from '../store/facade/game.facade';
import {filter, zip} from 'rxjs';
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

  bioCharacteristics: { [key: string]: string } = {};
  chosenResource: Resource = Resource.PEOPLE;
  leftPlayer$ = this.gameFacade.leftPlayer$;
  rightPlayer$ = this.gameFacade.rightPlayer$;
  players$ = zip(this.leftPlayer$, this.rightPlayer$)
    .pipe(
      filter(([left, right]) => Boolean(left) && Boolean(right))
    );
  players: SWPlayerItem<SWCharacterProperties | SWStarshipProperties>[] = [];
  Resource = Resource

  constructor(private gameFacade: GameFacade) {}

  ngOnInit() {
    this.gameFacade.fetchAllCharacters();
    this.gameFacade.fetchAllStarships();
  }
  getPlayers(): void {
    this.chosenResource === Resource.PEOPLE ? this.gameFacade.fetchRandomCharacters() : this.gameFacade.fetchRandomStarships()
  }
}
