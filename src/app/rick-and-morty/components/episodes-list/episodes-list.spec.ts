import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodesList } from './episodes-list';

describe('EpisodesList', () => {
  let component: EpisodesList;
  let fixture: ComponentFixture<EpisodesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpisodesList],
    }).compileComponents();

    fixture = TestBed.createComponent(EpisodesList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
