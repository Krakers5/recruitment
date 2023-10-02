import { Injectable } from '@angular/core';
import { SWSingleResult } from '@core/models/intefaces/common-response.interface';
import { ApiService } from '@core/services/api.service';
import { Observable, map } from 'rxjs';
import { getRandomArrayElement } from '../utils/utils';
import { SWCharacter } from '@core/models/intefaces/character.interface';
import { SWStarship } from '@core/models/intefaces/starship.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private charactersList: SWSingleResult[] = [];
  private starshipsList: SWSingleResult[] = [];

  constructor(private apiService: ApiService) { }

  fetchCharactersList(): void {
    this.apiService.getAllCharacters().subscribe((res) => this.charactersList = res.results);
  }

  fetchStarshipsList(): void {
    this.apiService.getAllStarships().subscribe((res) => this.starshipsList = res.results);
  }

  fetchCharacter(): Observable<SWCharacter> {
    const id = getRandomArrayElement(this.charactersList).uid;
    return this.apiService.getCharacter(id).pipe(
      map((res) => ({id: res.result.id, properties: res.result.properties}))
    )
  }

  fetchStarship(): Observable<SWStarship> {
    const id = getRandomArrayElement(this.starshipsList).uid;
    return this.apiService.getStarship(id).pipe(
      map((res) => ({id: res.result.id, properties: res.result.properties}))
    )
  }
}
