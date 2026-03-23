import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsListPage } from './locations-list-page';

describe('LocationsListPage', () => {
  let component: LocationsListPage;
  let fixture: ComponentFixture<LocationsListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationsListPage],
    }).compileComponents();

    fixture = TestBed.createComponent(LocationsListPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
