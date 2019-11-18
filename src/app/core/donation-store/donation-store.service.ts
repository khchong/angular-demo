import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as uuid from 'uuid/v4';

export enum CurrencyCode {
  USD = 'USD',
  CAD = 'CAD'
}

export interface Address {
  address: string;
  address2: string;
  city: string;
  zipcode: string;
}

export interface Donation {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  address?: Address;
  amount: number;
  currency: CurrencyCode;
  seen: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DonationStoreService {

  private readonly _donations = new BehaviorSubject<Donation[]>([]);
  readonly donations$ = this._donations.asObservable();

  get donations(): Donation[] {
    return this._donations.getValue();
  }

  constructor() { }

  addDonation(donation: Donation): void {
    donation.id = uuid();
    this._donations.next([
      ...this.donations,
      donation
    ]);
  }

  removeDonation(id: string): void {
    this._donations.next(
      this.donations.filter(d => d.id !== id)
    );
  }

  setDonationAsSeen(id: string): void {
    const donation = this.donations.find(d => d.id === id);

    if (!donation) {
      return;
    }

    // we make a copy of the donation-form object as well as the donations array so that our state follows immutability
    // generally a good practice and also necessary if using Angular's onPushChangeDetection strategy
    const index = this.donations.indexOf(donation);
    this.donations[index] = {
      ...donation,
      seen: true
    };

    this._donations.next([...this.donations]);
  }
}
