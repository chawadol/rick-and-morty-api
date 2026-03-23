import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodesListPage } from './episodes-list-page';

describe('EpisodesListPage', () => {
  let component: EpisodesListPage;
  let fixture: ComponentFixture<EpisodesListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpisodesListPage],
    }).compileComponents();

    fixture = TestBed.createComponent(EpisodesListPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
