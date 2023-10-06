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
  name = '';

  @Input() clashActivated = false;
  @Input() index = 0;
  @Input() losingIndex: number | null = null;
  @Input() set playerItem(
    playerItem: SWCharacterProperties | SWStarshipProperties | undefined,
  ) {
    this.handlePlayerItemUpdate(playerItem);
  }

  handlePlayerItemUpdate(
    playerItem: SWCharacterProperties | SWStarshipProperties | undefined,
  ) {
    this.name = playerItem?.name || '';
    if (isCharacter(playerItem)) {
      this.setCharacterConfig(playerItem);
    }

    if (isStarship(playerItem)) {
      this.setStarshipConfig(playerItem);
    }
  }

  isWinner(): boolean {
    return (
      this.clashActivated &&
      this.index !== this.losingIndex &&
      this.losingIndex !== 2
    );
  }

  setCharacterConfig(player: SWCharacterProperties): void {
    this.bioCharacteristics = {
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
      passengers: starship.passengers,
      consumables: starship.consumables,
      length: starship.length,
    };

    this.clashFactor = {
      name: 'Crew',
      value: starship.crew,
    };
  }
}
