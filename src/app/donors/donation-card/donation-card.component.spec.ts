import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationCardComponent } from './donation-card.component';
import { CurrencyCode } from '../../core/donation-store/donation-store.service';
import { MatCardModule } from '@angular/material';

describe('DonationCardComponent', () => {
  let component: DonationCardComponent;
  let fixture: ComponentFixture<DonationCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatCardModule ],
      declarations: [ DonationCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationCardComponent);
    component = fixture.componentInstance;
    component.donation = {
      id: '',
      firstName: 'Kane',
      lastName: 'Chong',
      email: 'kchong@classy.org',
      amount: 10,
      currency: CurrencyCode.USD,
      seen: true
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
