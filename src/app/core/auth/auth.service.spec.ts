import { fakeAsync, flushMicrotasks, TestBed, tick } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { PlaceholderPageComponent } from '../../../test/placeholder-page.component';

describe('AuthService', () => {

  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', component: PlaceholderPageComponent }
        ])
      ],
      declarations: [
        PlaceholderPageComponent
      ]
    });
    authService = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('login()', () => {

    describe('with password less than 8 characters', () => {

      it('should return invalid credentials error', fakeAsync(() => {
        try {
          authService.login('blah@blah.com', '1234');
          tick(1500);
          fail('Did not throw invalid_credentials exception when it should.');
        } catch (e) {
          expect(e.rejection).toEqual('invalid_credentials');
        }
      }));
    });

    describe('with valid password', () => {

      it('should emit new session', fakeAsync(() => {
        let email;
        authService.session$.subscribe(session => {
          email = session && session.email;
        });

        authService.login('blah@blah.com', '12345678');
        tick(1500);

        flushMicrotasks();
        expect(email).toEqual('blah@blah.com');
      }));
    });
  });
});
