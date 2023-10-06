import {
  SWPlayerItem,
  SWSingleResult,
} from '@core/models/intefaces/common-response.interface';
import { createReducer, on } from '@ngrx/store';
import { SWCharacterProperties } from '@core/models/intefaces/character.interface';
import { SWStarshipProperties } from '@core/models/intefaces/starship.interface';
import { GameApiActions, GameComponentActions } from './actions';
import { isCharacter, isStarship } from '../utils/utils';

export interface GameState {
  charactersList: { [id: string]: SWSingleResult };
  starshipsList: { [id: string]: SWSingleResult };
  leftPlayer: SWPlayerItem<SWCharacterProperties | SWStarshipProperties> | null;
  rightPlayer: SWPlayerItem<
    SWCharacterProperties | SWStarshipProperties
  > | null;
  losingIndex: number;
  leftPlayerWins: number;
  rightPlayerWins: number;
  isLoading: boolean;
}

export const initialState: GameState = {
  charactersList: {},
  starshipsList: {},
  leftPlayer: null,
  rightPlayer: null,
  losingIndex: 0,
  leftPlayerWins: 0,
  rightPlayerWins: 0,
  isLoading: true,
};

export const gameReducer = createReducer(
  initialState,
  on(GameApiActions.fetchAllCharactersSuccess, (state, action): GameState => {
    return {
      ...state,
      charactersList: {
        ...action.charactersResponse.results.reduce((acc, curr) => {
          return {
            ...acc,
            [curr.uid]: { ...state.charactersList[curr.uid], ...curr },
          };
        }, {}),
      },
      isLoading: false,
    };
  }),
  on(GameApiActions.fetchAllStarshipsSuccess, (state, action): GameState => {
    return {
      ...state,
      starshipsList: {
        ...action.starshipsResponse.results.reduce((acc, curr) => {
          return {
            ...acc,
            [curr.uid]: { ...state.starshipsList[curr.uid], ...curr },
          };
        }, {}),
      },
      isLoading: false,
    };
  }),
  on(GameApiActions.fetchRandomCharacters, (state): GameState => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(GameApiActions.fetchRandomStarships, (state): GameState => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(
    GameApiActions.fetchRandomItemSuccess,
    (state, { randomItems }): GameState => {
      const [left, right] = randomItems;
      return {
        ...state,
        leftPlayer: {
          ...state.leftPlayer,
          uid: left.result.uid,
          properties: left.result.properties,
        },
        rightPlayer: {
          ...state.rightPlayer,
          uid: right.result.uid,
          properties: right.result.properties,
        },
        losingIndex: getLosingIndex(
          left.result.properties,
          right.result.properties,
        ),
        isLoading: false,
      };
    },
  ),
  on(GameApiActions.fetchRandomItemFail, (state): GameState => {
    return { ...state, isLoading: false };
  }),
  on(GameComponentActions.leftPlayerWin, (state): GameState => {
    return { ...state, leftPlayerWins: state.leftPlayerWins++ };
  }),
  on(GameComponentActions.leftPlayerWin, (state): GameState => {
    return { ...state, rightPlayerWins: state.rightPlayerWins++ };
  }),
  on(GameComponentActions.updateWinsCounter, (state): GameState => {
    return {
      ...state,
      leftPlayerWins:
        state.losingIndex === 0
          ? state.leftPlayerWins
          : state.leftPlayerWins + 1,
      rightPlayerWins:
        state.losingIndex === 1
          ? state.rightPlayerWins
          : state.rightPlayerWins + 1,
    };
  }),
);

function getLosingIndex(
  leftProperties: SWCharacterProperties | SWStarshipProperties,
  rightProperties: SWCharacterProperties | SWStarshipProperties,
): number {
  if (isCharacter(leftProperties) && isCharacter(rightProperties)) {
    const leftValue = Number(leftProperties.height.replace(/,/g, ''));
    const rightValue = Number(rightProperties.height.replace(/,/g, ''));

    const leftCharacterValue = leftValue ? leftValue : 0;
    const rightCharacterValue = rightValue ? rightValue : 0;
    return setLoserIndex(leftCharacterValue, rightCharacterValue);
  }

  if (isStarship(leftProperties) && isStarship(rightProperties)) {
    const leftValue = Number(leftProperties.crew.replace(/,/g, ''));
    const rightValue = Number(rightProperties.crew.replace(/,/g, ''));

    const leftStarshipValue = leftValue ? leftValue : 0;
    const rightStarshipValue = rightValue ? rightValue : 0;
    return setLoserIndex(leftStarshipValue, rightStarshipValue);
  }

  return 0;
}

function setLoserIndex(leftValue: number, rightValue: number) {
  if (leftValue === rightValue) {
    return 2;
  }

  return leftValue < rightValue ? 0 : 1;
}
