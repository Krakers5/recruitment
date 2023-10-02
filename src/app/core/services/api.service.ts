import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SWCharacterProperties } from '../models/intefaces/character.interface';
import { Observable, catchError, throwError } from 'rxjs';
import { SWAllItemsResponse, SWDetailedResponse } from '../models/intefaces/common-response.interface';
import { SWStarshipProperties } from '@core/models/intefaces/starship.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://www.swapi.tech/api';
  private peopleUrl = `${this.baseUrl}/people`;
  private starshipsUrl = `${this.baseUrl}/starships`

  constructor(private http: HttpClient) { }

  getAllCharacters(): Observable<SWAllItemsResponse> {
    const params = new HttpParams().set('page', '1').set('limit', '100')
    return this.http.get<SWAllItemsResponse>(this.peopleUrl, {params})
    .pipe(
      catchError(this.handleError)
      )
  }

  getAllStarships(): Observable<SWAllItemsResponse> {
    const params = new HttpParams().set('page', '1').set('limit', '100')
    return this.http.get<SWAllItemsResponse>(this.starshipsUrl, {params})
    .pipe(
      catchError(this.handleError)
    )
  }

  getCharacter(id: string): Observable<SWDetailedResponse<SWCharacterProperties>> {
    return this.http.get<SWDetailedResponse<SWCharacterProperties>>(`${this.peopleUrl}/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  getStarship(id: string): Observable<SWDetailedResponse<SWStarshipProperties>> {
    return this.http.get<SWDetailedResponse<SWStarshipProperties>>(`${this.starshipsUrl}/${id}`)
    .pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    console.log('error', error)
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Error with code ${error.status}`);
    }
    return throwError(() => new Error('Something went wrong, please try again'));
  }
}
