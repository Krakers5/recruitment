import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { allCharactersMock } from '@core/mocks/http-mocks';

// For purpose of this task I test only 1 endpoint, the rest endpoints (as all are gets) would be tested the same way

describe('ApiServiceService', () => {
  let service: ApiService;
  let httpController: HttpTestingController;

  const AllCharactersEndpoint = 'https://www.swapi.tech/api/people?page=1&limit=100'


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ApiService);
    httpController = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all characters', () => {
    service.getAllCharacters().subscribe(res => {
      expect(res).toEqual(allCharactersMock)
    });

    const req = httpController.expectOne(AllCharactersEndpoint);
    req.flush(allCharactersMock);

    expect(req.request.method).toBe('GET');
  });

  it('should handle http error', () => {

    const errorResponse = {
      status: 0,
      statusText: 'Unknown Error'
    };


    service.getAllCharacters().subscribe(
      () => {},
      (error) => {
        expect(error.message).toBe('Something went wrong, please try again');
        expect(errorResponse.status).toBe(0);
        expect(errorResponse.statusText).toBe('Unknown Error');
      }
    )
    
    const req = httpController.expectOne(AllCharactersEndpoint);
    req.flush({}, errorResponse);

  });
});
