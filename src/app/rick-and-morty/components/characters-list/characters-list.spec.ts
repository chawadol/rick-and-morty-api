import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersList } from './characters-list';

describe('CharactersList', () => {
  let component: CharactersList;
  let fixture: ComponentFixture<CharactersList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharactersList],
    }).compileComponents();

    fixture = TestBed.createComponent(CharactersList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
