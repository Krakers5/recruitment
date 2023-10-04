import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GameState } from './game.reducer';

export const featureSelector = createFeatureSelector<GameState>('game');

export const selectCharactersList = createSelector(featureSelector, (state: GameState) => state.charactersList);

export const selectStarshipsList = createSelector(featureSelector, (state: GameState) => state.starshipsList);

export const selectLeftPlayer = createSelector(featureSelector, (state: GameState) => state.leftPlayer);

export const selectRightPlayer = createSelector(featureSelector, (state: GameState) => state.rightPlayer);
