import { Component, Input } from '@angular/core';
import { SWCharacterProperties } from '@core/models/intefaces/character.interface';
import { SWPlayerItem } from '@core/models/intefaces/common-response.interface';
import { SWStarshipProperties } from '@core/models/intefaces/starship.interface';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent {
    @Input() playerItem: SWCharacterProperties | SWStarshipProperties | undefined;
}
