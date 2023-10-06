import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SWCharacterProperties } from '@core/models/intefaces/character.interface';
import { SWStarshipProperties } from '@core/models/intefaces/starship.interface';
import { SWPlayerItem } from '@core/models/intefaces/common-response.interface';

@Component({
  selector: 'app-game-cards',
  templateUrl: './game-cards.component.html',
  styleUrls: ['./game-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameCardsComponent {
  @Input() clashActivated = false;
  @Input() isLoading = false;
  @Input() players: (SWPlayerItem<
    SWCharacterProperties | SWStarshipProperties
  > | null)[] = [];
  @Input() losingIndex = 0;
}
