import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameContainerComponent } from './game-container/game-container.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GameEffects } from './store/game.effects';
import { gameReducer } from './store/game.reducer';
import { GameCardComponent } from './game-card/game-card.component';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [GameContainerComponent, GameCardComponent],
  imports: [CommonModule, MatCardModule, StoreModule.forFeature('game', gameReducer), EffectsModule.forFeature([GameEffects])],
  exports: [GameContainerComponent],
})
export class GameModule {}
