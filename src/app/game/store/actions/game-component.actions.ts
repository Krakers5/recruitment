import { createAction, props } from '@ngrx/store';
import { Resource } from '../../models/resource';

export const changeResource = createAction('[Game - Component] Change resource', props<{ resource: Resource }>());
export const playAgain = createAction('[Game - Component] Play again');
