import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanLoad {

  constructor(private authService: AuthService) {}

  canLoad( route: Route, segments: UrlSegment[]): boolean {
    const allowed = !!this.authService.session && this.authService.session.email === 'kchong@classy.org';
    if (!allowed) {
      window.alert('Not Authorized');
      return false;
    }
    return true;
  }
}
