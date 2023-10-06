import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCardComponent } from './game-card.component';
import { MatCardModule } from '@angular/material/card';
import { SWCharacterProperties } from '@core/models/intefaces/character.interface';

describe('GameCardComponent', () => {
  let component: GameCardComponent;
  let fixture: ComponentFixture<GameCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameCardComponent],
      imports: [MatCardModule]
    });
    fixture = TestBed.createComponent(GameCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run setCharacterConfig when Character object passed', () => {
    spyOn(component, 'setCharacterConfig')

    component.playerItem = {name: 'sth', gender: 'sth'} as SWCharacterProperties;

    expect(component.setCharacterConfig).toHaveBeenCalled();
  });

  it('should not run setCharacterConfig when not Character object passed', () => {
    spyOn(component, 'setCharacterConfig')

    component.playerItem = {name: 'sth'} as SWCharacterProperties;

    expect(component.setCharacterConfig).not.toHaveBeenCalled();
  });
});
