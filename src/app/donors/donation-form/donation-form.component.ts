import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CurrencyCode, DonationStoreService } from '../../core/donation-store/donation-store.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-donation',
  templateUrl: './donation-form.component.html',
  styleUrls: ['./donation-form.component.scss']
})
export class DonationFormComponent implements OnInit {

  donationForm: FormGroup;

  get firstName() { return this.donationForm.controls.firstName as FormControl; }
  get lastName() { return this.donationForm.controls.lastName as FormControl; }
  get email() { return this.donationForm.controls.email as FormControl; }
  get amount() { return this.donationForm.controls.amount as FormControl; }
  get currency() { return this.donationForm.controls.currency as FormControl; }
  get address() { return this.donationForm.controls.address as FormGroup; }

  constructor(private authService: AuthService,
              private donationStore: DonationStoreService,
              private router: Router) { }

  ngOnInit(): void {
    this.donationForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl(this.authService.session.email, [
        Validators.required,
        Validators.email
      ]),
      amount: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]\d*(\.\d+)?$/),
        Validators.min(1)
      ]),
      currency: new FormControl(CurrencyCode.USD, [
        Validators.required,
        (c: AbstractControl) => this.currencyCodeValidator(c)
      ]),
      address: new FormGroup({
        address: new FormControl(''),
        address2: new FormControl(''),
        city: new FormControl(''),
        zipcode: new FormControl('')
      })
    });
  }

  saveDonation(): void {
    this.donationStore.addDonation(this.donationForm.value);
    this.router.navigate(['/donation-list']);
  }

  private currencyCodeValidator(c: AbstractControl): ValidationErrors | null {
    const validCurrency = c.value === CurrencyCode.USD || c.value === CurrencyCode.CAD;

    return !validCurrency ? { invalidCurrency: true } : null;
  }
}
