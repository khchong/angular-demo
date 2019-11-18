import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressFormComponent } from './address-form.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AddressComponent', () => {

  let component: AddressFormComponent;
  let fixture: ComponentFixture<AddressFormComponent>;

  let parentForm: FormGroup;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NoopAnimationsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule ],
      declarations: [ AddressFormComponent ]
    })
    .compileComponents();

    parentForm = new FormGroup({
      address: new FormControl(''),
      address2: new FormControl(''),
      city: new FormControl(''),
      zipcode: new FormControl('')
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressFormComponent);
    component = fixture.componentInstance;
    component.parentForm = parentForm;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
