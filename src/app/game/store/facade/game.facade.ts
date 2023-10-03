import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCharactersList, selectStarshipsList } from '../game.selectors';
import { Resource } from '../../models/resource';
import { GameApiActions, GameComponentActions } from '../actions';

@Injectable({
  providedIn: 'root',
})
export class GameFacade {
  charactersList$ = this.store.select(selectCharactersList);
  starshipsList$ = this.store.select(selectStarshipsList);

  constructor(private store: Store) {}

  fetchAllCharacters(): void {
    this.store.dispatch(GameApiActions.fetchAllCharacters());
  }

  fetchAllStarships(): void {
    this.store.dispatch(GameApiActions.fetchAllStarships());
  }

  fetchRandomCharacters(): void {
    this.store.dispatch(GameApiActions.fetchRandomCharacters());
  }

  fetchRandomStarships(): void {
    this.store.dispatch(GameApiActions.fetchRandomStarships());
  }

  changeResource(resource: Resource): void {
    this.store.dispatch(GameComponentActions.changeResource({ resource }));
  }
}
