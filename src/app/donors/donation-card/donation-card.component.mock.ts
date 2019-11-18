import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Donation } from '../../core/donation-store/donation-store.service';

@Component({
  selector: 'app-donation-card',
  template: `<div>DonationCardComponentMock</div>`
})
export class DonationCardComponentMock {

  @Input() donation: Donation;

  @Output() delete = new EventEmitter<string>();
}
