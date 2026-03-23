import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeViewPage } from './episode-view-page';

describe('EpisodeViewPage', () => {
  let component: EpisodeViewPage;
  let fixture: ComponentFixture<EpisodeViewPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpisodeViewPage],
    }).compileComponents();

    fixture = TestBed.createComponent(EpisodeViewPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
