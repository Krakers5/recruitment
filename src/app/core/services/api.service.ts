import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getRandomNumber } from '../utils/random-number';
import { SWCharacterProperties } from '../models/intefaces/character.interface';
import { Observable, catchError, throwError } from 'rxjs';
import { SWResponse } from '../models/intefaces/common-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://www.swapi.tech/api';

  constructor(private http: HttpClient) { }

  getRandomCharacter(max: number): Observable<SWResponse<SWCharacterProperties>> {
    const characterId = getRandomNumber(max);
    return this.http.get<SWResponse<SWCharacterProperties>>(`${this.baseUrl}/people/${characterId}`)
    .pipe(
      catchError(this.handleError)
    );
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
