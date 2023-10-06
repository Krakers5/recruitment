import { SWAllItemsResponse } from '@core/models/intefaces/common-response.interface';
import { gameReducer, initialState } from '../game.reducer';
import { GameApiActions } from '../actions';

describe('Game reducer', () => {
  it('should update isLoading state', () => {
    const state = gameReducer(
      initialState,
      GameApiActions.fetchRandomCharacters,
    );
    const expectedState = { ...initialState, isLoading: true };

    expect(state).toEqual(expectedState);
  });

  it('should update characters list', () => {
    const fakeResult = { uid: '1', name: 'Luke', url: '' };
    const fakeActionPayload = { results: [fakeResult] } as SWAllItemsResponse;
    const state = gameReducer(
      initialState,
      GameApiActions.fetchAllCharactersSuccess({
        charactersResponse: fakeActionPayload as SWAllItemsResponse,
      }),
    );
    const expectedState = {
      ...initialState,
      charactersList: { '1': fakeResult },
      isLoading: false,
    };

    expect(state).toEqual(expectedState);
  });
});
