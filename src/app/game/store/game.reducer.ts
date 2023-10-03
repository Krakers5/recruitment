import { SWPlayerItem, SWSingleResult } from '@core/models/intefaces/common-response.interface';
import { createReducer, on } from '@ngrx/store';
import { SWCharacterProperties } from '@core/models/intefaces/character.interface';
import { SWStarshipProperties } from '@core/models/intefaces/starship.interface';
import { Resource } from '../models/resource';
import { GameApiActions, GameComponentActions } from './actions';

export interface GameState {
  charactersList: { [id: string]: SWSingleResult };
  starshipsList: { [id: string]: SWSingleResult };
  leftPlayer: SWPlayerItem<SWCharacterProperties | SWStarshipProperties> | null;
  rightPlayer: SWPlayerItem<SWCharacterProperties | SWStarshipProperties> | null;
  resource: Resource;
}

const initialState: GameState = {
  charactersList: {},
  starshipsList: {},
  leftPlayer: null,
  rightPlayer: null,
  resource: Resource.PEOPLE,
};

export const gameReducer = createReducer(
  initialState,
  on(GameApiActions.fetchAllCharactersSuccess, (state, action) => {
    return {
      ...state,
      charactersList: {
        ...action.charactersResponse.results.reduce((acc, curr) => {
          return { ...acc, [curr.uid]: { ...state.charactersList[curr.uid], ...curr } };
        }, {}),
      },
    };
  }),
  on(GameApiActions.fetchAllStarshipsSuccess, (state, action) => {
    return {
      ...state,
      starshipsList: {
        ...action.starshipsResponse.results.reduce((acc, curr) => {
          return { ...acc, [curr.uid]: { ...state.starshipsList[curr.uid], ...curr } };
        }, {}),
      },
    };
  }),
  on(GameApiActions.fetchRandomItemSuccess, (state, { randomItems }) => {
    const [left, right] = randomItems;
    return {
      ...state,
      leftPlayer: { ...state.leftPlayer, uid: left.result.uid, properties: left.result.properties },
      rightPlayer: { ...state.rightPlayer, uid: right.result.uid, properties: right.result.properties },
    };
  }),
  on(GameComponentActions.changeResource, (state, action) => {
    return { ...state, resource: action.resource };
  }),
);
