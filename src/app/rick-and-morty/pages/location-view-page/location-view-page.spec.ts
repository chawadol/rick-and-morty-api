import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationViewPage } from './location-view-page';

describe('LocationViewPage', () => {
  let component: LocationViewPage;
  let fixture: ComponentFixture<LocationViewPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationViewPage],
    }).compileComponents();

    fixture = TestBed.createComponent(LocationViewPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
