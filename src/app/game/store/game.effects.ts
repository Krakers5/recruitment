import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { forkJoin, of, withLatestFrom } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ApiService } from '@core/services/api.service';
import { GameFacade } from './facade/game.facade';
import { getRandomArrayElement } from '../utils/utils';
import { SWDetailedResponse } from '@core/models/intefaces/common-response.interface';
import { SWCharacterProperties } from '@core/models/intefaces/character.interface';
import { SWStarshipProperties } from '@core/models/intefaces/starship.interface';
import { GameApiActions } from './actions';

@Injectable()
export class GameEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private gameFacade: GameFacade,
  ) {}

  fetchAllCharacters$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GameApiActions.fetchAllCharacters),
      switchMap(() => {
        return this.apiService.getAllCharacters().pipe(
          map((charactersResponse) => {
            return GameApiActions.fetchAllCharactersSuccess({
              charactersResponse,
            });
          }),
          catchError(() => of(GameApiActions.fetchAllCharactersFail())),
        );
      }),
    );
  });

  fetchAllStarships$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GameApiActions.fetchAllStarships),
      switchMap(() => {
        return this.apiService.getAllStarships().pipe(
          map((starshipsResponse) =>
            GameApiActions.fetchAllStarshipsSuccess({ starshipsResponse }),
          ),
          catchError(() => of(GameApiActions.fetchAllStarshipsFail())),
        );
      }),
    );
  });

  fetchRandomCharacters$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GameApiActions.fetchRandomCharacters),
      withLatestFrom(this.gameFacade.charactersList$),
      switchMap(([, charactersList]) => {
        const leftPlayerCharacter = getRandomArrayElement(
          Object.values(charactersList),
        );
        const rightPlayerCharacter = getRandomArrayElement(
          Object.values(charactersList),
          leftPlayerCharacter.uid,
        );
        return forkJoin([
          this.apiService.getCharacter(leftPlayerCharacter.uid),
          this.apiService.getCharacter(rightPlayerCharacter.uid),
        ]).pipe(
          map((randomItems: SWDetailedResponse<SWCharacterProperties>[]) => {
            return GameApiActions.fetchRandomItemSuccess({ randomItems });
          }),
          catchError(() => of(GameApiActions.fetchRandomItemFail())),
        );
      }),
    );
  });

  fetchRandomStarships$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GameApiActions.fetchRandomStarships),
      withLatestFrom(this.gameFacade.starshipsList$),
      switchMap(([, starshipsList]) => {
        const leftPlayerStarship = getRandomArrayElement(
          Object.values(starshipsList),
        );
        const rightPlayerStarship = getRandomArrayElement(
          Object.values(starshipsList),
        );
        return forkJoin([
          this.apiService.getStarship(leftPlayerStarship.uid),
          this.apiService.getStarship(rightPlayerStarship.uid),
        ]).pipe(
          map((randomItems: SWDetailedResponse<SWStarshipProperties>[]) => {
            return GameApiActions.fetchRandomItemSuccess({ randomItems });
          }),
          catchError(() => of(GameApiActions.fetchRandomItemFail())),
        );
      }),
    );
  });
}
