import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {Router} from '@angular/router';
import { Donation } from '../donation-store/donation-store.service';

export interface UserSession {
  email: string;
  avatarImg?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _session: BehaviorSubject<UserSession> = new BehaviorSubject<UserSession>(undefined);
  readonly session$: Observable<UserSession> = this._session.asObservable();

  get session(): UserSession | undefined {
    return this._session.getValue();
  }

  constructor(private router: Router) { }

  async login(email: string, password: string, avatarImg?: string): Promise<void> {
    await this.sendLoginRequest(email, password);
    this._session.next({ email, avatarImg });
  }

  logout(): void {
    this._session.next(undefined);
    this.router.navigate(['/login']);
  }

  private async sendLoginRequest(email: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        email && password && password.length >= 8
          ? resolve()
          : reject('invalid_credentials');
      }, 1000);
    });
  }
}
