import { createAction, props } from '@ngrx/store';
import {
  SWAllItemsResponse,
  SWDetailedResponse,
} from '@core/models/intefaces/common-response.interface';
import { SWCharacterProperties } from '@core/models/intefaces/character.interface';
import { SWStarshipProperties } from '@core/models/intefaces/starship.interface';

export const fetchAllCharacters = createAction(
  '[Game - API] Fetch all characters',
);
export const fetchAllCharactersSuccess = createAction(
  '[Game - API] Fetch all characters success',
  props<{ charactersResponse: SWAllItemsResponse }>(),
);
export const fetchAllCharactersFail = createAction(
  '[Game - API] Fetch all characters fail',
);

export const fetchAllStarships = createAction(
  '[Game - API] Fetch all starships',
);
export const fetchAllStarshipsSuccess = createAction(
  '[Game - API] Fetch all starships success',
  props<{ starshipsResponse: SWAllItemsResponse }>(),
);
export const fetchAllStarshipsFail = createAction(
  '[Game - API] Fetch all starships fail',
);

export const fetchRandomCharacters = createAction(
  '[Game - API] Fetch random characters',
);
export const fetchRandomStarships = createAction(
  '[Game - API] Fetch random starships',
);

export const fetchRandomItemSuccess = createAction(
  '[Game - API] Fetch random characters success',
  props<{
    randomItems: SWDetailedResponse<
      SWCharacterProperties | SWStarshipProperties
    >[];
  }>(),
);
export const fetchRandomItemFail = createAction(
  '[Game - API] Fetch random api fail',
);
