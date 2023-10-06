import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameContainerComponent } from './game-container/game-container.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GameEffects } from './store/game.effects';
import { gameReducer } from './store/game.reducer';
import { GameCardComponent } from './game-card/game-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GameCardsComponent } from './game-cards/game-cards.component';
import { CounterComponent } from './counter/counter.component';

@NgModule({
  declarations: [
    GameContainerComponent,
    GameCardComponent,
    GameCardsComponent,
    CounterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    StoreModule.forFeature('game', gameReducer),
    EffectsModule.forFeature([GameEffects]),
  ],
  exports: [GameContainerComponent],
})
export class GameModule {}
