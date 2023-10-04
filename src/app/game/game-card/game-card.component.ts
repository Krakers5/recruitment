import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { SWCharacterProperties } from '@core/models/intefaces/character.interface';
import { SWPlayerItem } from '@core/models/intefaces/common-response.interface';
import { SWStarshipProperties } from '@core/models/intefaces/starship.interface';
import {isCharacter, isStarship} from "../utils/utils";
import {ClashFactor} from "../models/interfaces/clash-factor";

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnChanges {
    bioCharacteristics: { [key: string]: string } = {};
    clashFactor: ClashFactor | null = null;
    private noData = 'Lack of data'

  @Input() playerItem: SWCharacterProperties | SWStarshipProperties | undefined;

    ngOnChanges(): void {
      if (isCharacter(this.playerItem)) {
        this.bioCharacteristics = {
          height: this.playerItem.height || this.noData,
          birthYear: this.playerItem.birth_year || this.noData,
          gender: this.playerItem.gender || this.noData
        }

        this.clashFactor = {
          name: 'Height',
          value: this.playerItem.height
        }
      }

      if (isStarship(this.playerItem)) {
        this.bioCharacteristics = {
          model: this.playerItem.model || this.noData,
          manufacturer: this.playerItem.manufacturer || this.noData,
          length: this.playerItem.length || this.noData
        }

        this.clashFactor = {
          name: 'Crew',
          value: this.playerItem.crew
        }
      }
    }
}
