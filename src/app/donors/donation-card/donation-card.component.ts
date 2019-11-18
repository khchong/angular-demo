import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Donation, DonationStoreService } from '../../core/donation-store/donation-store.service';

@Component({
  selector: 'app-donation-card',
  templateUrl: './donation-card.component.html',
  styleUrls: ['./donation-card.component.scss']
})
export class DonationCardComponent {

  @Input() donation: Donation;

  @Output() delete = new EventEmitter<string>();

  constructor(private donationStore: DonationStoreService) { }

  // an example where the child itself will set the state through the donationStore
  seenClicked(): void {
    this.donationStore.setDonationAsSeen(this.donation.id);
  }

  // an example where the child emits an event for the parent to handle instead
  deleteClicked(id: string): void {
    this.delete.emit(id);
  }
}
