import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { GameContainerComponent } from './game-container.component';
import { GameFacade } from '../store/facade/game.facade';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GameCardsComponent } from '../game-cards/game-cards.component';
import { CounterComponent } from '../counter/counter.component';

describe('GameContainerComponent', () => {
  let component: GameContainerComponent;
  let fixture: ComponentFixture<GameContainerComponent>;

  class GameFacadeMock {
    fetchAllCharacters() {}

    fetchAllStarships() {}

    fetchRandomCharacters() {}
    fetchRandomStarships() {}
  }

  const gameFacadeSpy = jasmine.createSpyObj('GameFacade', [
    'fetchAllCharacters',
    'fetchAllStarships',
    'fetchRandomCharacters',
    'fetchRandomStarships',
    'updateWinsCounter',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameContainerComponent,
        GameCardsComponent,
        CounterComponent,
      ],
      providers: [{ provide: GameFacade, useValue: gameFacadeSpy }],
      imports: [MatRadioModule, FormsModule, MatProgressSpinnerModule],
    });
    fixture = TestBed.createComponent(GameContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run logic inside getPlayers method', () => {
    component.getPlayers();

    fixture.detectChanges();

    expect(component.gameInitialized).toBe(true);
    expect(component.clashActivated).toBe(false);
    expect(gameFacadeSpy.fetchRandomCharacters).toHaveBeenCalled();
  });

  it('should show spinner when isLoading', fakeAsync(() => {
    const spinnerWhenNothingIsLoading = fixture.debugElement.query(
      By.css('mat-progress-spinner'),
    );

    expect(spinnerWhenNothingIsLoading).toBeNull();

    component.isLoading$ = of(true);
    fixture.detectChanges();
    tick();

    const spinnerWhenIsLoading = fixture.debugElement.query(
      By.css('mat-progress-spinner'),
    );

    expect(spinnerWhenIsLoading).not.toBeNull();
  }));

  it('should call getPlayers() when Play button is clicked', fakeAsync(() => {
    spyOn(component, 'getPlayers');

    const button = fixture.debugElement.nativeElement.querySelector(
      '.game-container__play-button',
    );
    button.click();

    expect(component.getPlayers).toHaveBeenCalled();
  }));
});
