import { Component } from '@angular/core';
import { DonationStoreService } from '../../core/donation-store/donation-store.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-donation-list',
  templateUrl: './donation-list.component.html',
  styleUrls: ['./donation-list.component.scss']
})
export class DonationListComponent {

  randomUser$: Observable<any>;
  initialized: boolean;

  constructor(public donationStore: DonationStoreService, private httpClient: HttpClient) { }

  deleteDonation(id: string): void {
    this.donationStore.removeDonation(id);
  }

  // This is just for example of using HttpClient
  // You shouldn't use HttpClient directly in a component and put data access stuff behind a service instead
  getRandomUser() {
    this.initialized = true;
    this.randomUser$ = this.httpClient.get('https://randomuser.me/api');
  }
}
