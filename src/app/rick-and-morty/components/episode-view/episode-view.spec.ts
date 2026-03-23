import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeView } from './episode-view';

describe('EpisodeView', () => {
  let component: EpisodeView;
  let fixture: ComponentFixture<EpisodeView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpisodeView],
    }).compileComponents();

    fixture = TestBed.createComponent(EpisodeView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
