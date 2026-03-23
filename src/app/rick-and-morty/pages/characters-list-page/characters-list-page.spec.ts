import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersListPage } from './characters-list-page';

describe('CharactersListPage', () => {
  let component: CharactersListPage;
  let fixture: ComponentFixture<CharactersListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharactersListPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CharactersListPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
