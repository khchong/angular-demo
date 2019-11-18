import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loginInProgress: boolean;
  loginError: string;
  private loginFormSubscription: Subscription;

  get email(): FormControl { return this.loginForm.controls.email as FormControl; }
  get password(): FormControl { return this.loginForm.controls.password as FormControl; }
  private avatarImg: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.email),
      password: new FormControl(''),
    });

    this.loginFormSubscription = this.loginForm.valueChanges.subscribe(() => {
      this.loginError = '';
    });
  }

  ngOnDestroy(): void {
    if (this.loginFormSubscription) {
      this.loginFormSubscription.unsubscribe();
    }
  }

  async login(): Promise<void> {
    this.loginInProgress = true;
    try {
      await this.authService.login(this.email.value, this.password.value, this.avatarImg);
      await this.router.navigate(['/donation-list']);
    } catch (e) {
      this.loginError = e === 'invalid_credentials'
        ? 'Invalid Credentials'
        : 'Unknown Error';

    } finally {
      this.loginInProgress = false;
    }
  }

  onFileSelected(imageUrl: string) {
    this.avatarImg = imageUrl;
  }
}
