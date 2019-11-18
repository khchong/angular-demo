import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationListComponent } from './donation-list.component';
import { DonationCardComponentMock } from '../donation-card/donation-card.component.mock';
import { MatProgressSpinnerModule } from '@angular/material';
import { HttpClient } from '@angular/common/http';

describe('DonationListComponent', () => {
  let component: DonationListComponent;
  let fixture: ComponentFixture<DonationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatProgressSpinnerModule ],
      declarations: [ DonationListComponent, DonationCardComponentMock ],
      providers: [
        { provide: HttpClient, useFactory: () => ({ get: jasmine.createSpy() }) }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
