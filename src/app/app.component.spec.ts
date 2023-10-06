import { GameContainerComponent } from './game/game-container/game-container.component';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { GameFacade } from './game/store/facade/game.facade';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { GameCardsComponent } from './game/game-cards/game-cards.component';
import { CounterComponent } from './game/counter/counter.component';

describe('AppComponent', () => {
  class GameFacadeMock {}

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatRadioModule, FormsModule],
      declarations: [
        AppComponent,
        GameContainerComponent,
        GameCardsComponent,
        CounterComponent,
      ],
      providers: [
        {
          provide: GameFacade,
          useClass: GameFacadeMock,
        },
      ],
    }),
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'recruitment-task'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('recruitment-task');
  });
});
