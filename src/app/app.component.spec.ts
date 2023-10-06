import { fetchAllCharacters, fetchAllStarships } from './game/store/actions/game-api.actions';
import { GameContainerComponent } from './game/game-container/game-container.component';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { GameFacade } from './game/store/facade/game.facade';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {

  class GameFacadeMock {

  }

  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule, MatRadioModule, FormsModule],
    declarations: [AppComponent, GameContainerComponent],
    providers: [{
      provide: GameFacade, useClass: GameFacadeMock
    }],
  }));

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
