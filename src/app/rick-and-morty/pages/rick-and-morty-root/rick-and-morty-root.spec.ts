import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RickAndMortyRoot } from './rick-and-morty-root';

describe('RickAndMortyRoot', () => {
  let component: RickAndMortyRoot;
  let fixture: ComponentFixture<RickAndMortyRoot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RickAndMortyRoot],
    }).compileComponents();

    fixture = TestBed.createComponent(RickAndMortyRoot);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
