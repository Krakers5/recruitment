import { createAction, props } from '@ngrx/store';
import { Resource } from '../../models/resource';

export const changeResource = createAction('[Game - Component] Change resource', props<{ resource: Resource }>());
export const playAgain = createAction('[Game - Component] Play again');
export const leftPlayerWin = createAction('[Game - Component] Left player win');
export const righttPlayerWin = createAction('[Game - Component] Right player win');
export const updateWinsCounter = createAction('[Game - Component] Update wins counter');

