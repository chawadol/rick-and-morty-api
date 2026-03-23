import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterViewPage } from './character-view-page';

describe('CharacterViewPage', () => {
  let component: CharacterViewPage;
  let fixture: ComponentFixture<CharacterViewPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterViewPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterViewPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
