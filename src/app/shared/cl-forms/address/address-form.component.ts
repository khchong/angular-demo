import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {

  @Input() parentForm: FormGroup;

  get address(): FormControl { return this.parentForm.controls.address as FormControl; }
  get address2(): FormControl { return this.parentForm.controls.address2 as FormControl; }
  get city(): FormControl { return this.parentForm.controls.city as FormControl; }
  get zipcode(): FormControl { return this.parentForm.controls.zipcode as FormControl; }

  constructor() {}

  ngOnInit(): void {
    this.zipcode.setValidators(Validators.pattern(/(^(?!0{5})(\d{5})(?!-?0{4})(|-\d{4})?$)/));
  }
}
