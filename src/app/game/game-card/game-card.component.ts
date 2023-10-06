import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SWCharacterProperties } from '@core/models/intefaces/character.interface';
import { SWStarshipProperties } from '@core/models/intefaces/starship.interface';
import { isCharacter, isStarship } from '../utils/utils';
import { ClashFactor } from '../models/interfaces/clash-factor';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameCardComponent {
  bioCharacteristics: { [key: string]: string } = {};
  clashFactor: ClashFactor | null = null;

  @Input() clashActivated = false;
  @Input() losingIndex: number | null = null;
  @Input() set playerItem(
    playerItem: SWCharacterProperties | SWStarshipProperties | undefined,
  ) {
    if (isCharacter(playerItem)) {
      this.setCharacterConfig(playerItem);
    }

    if (isStarship(playerItem)) {
      this.setStarshipConfig(playerItem);
    }
  }
  @Input() index = 0;

  setCharacterConfig(player: SWCharacterProperties): void {
    this.bioCharacteristics = {
      name: player.name,
      mass: player.mass,
      birthYear: player.birth_year,
      gender: player.gender,
    };

    this.clashFactor = {
      name: 'Height',
      value: player.height,
    };
  }

  setStarshipConfig(starship: SWStarshipProperties): void {
    this.bioCharacteristics = {
      name: starship.name,
      passengers: starship.passengers,
      consumables: starship.consumables,
      length: starship.length,
    };

    this.clashFactor = {
      name: 'Crew',
      value: starship.crew,
    };
  }

  isWinner(): boolean {
    return (
      this.clashActivated &&
      this.index !== this.losingIndex &&
      this.losingIndex !== 2
    );
  }
}
