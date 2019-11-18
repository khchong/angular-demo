import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

// Responsible for checking that the user is logged in
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next, state): Observable<boolean> {
    return this.authService.session$.pipe(
      take(1),
      tap(session => {
        if (!session) {
          window.alert('Not Logged In');
          this.router.navigate(['/login']);
        }
      }),
      map(session => !!session)
    );
  }
}
