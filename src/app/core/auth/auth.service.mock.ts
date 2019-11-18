import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';

interface CustomSpy extends jasmine.Spy {
  resolve: any;
  reject: any;
}

export class AuthServiceMock {
  private mock: jasmine.SpyObj<AuthService>;

  session$ = new BehaviorSubject(undefined);
  login: CustomSpy;
  logout: CustomSpy;

  constructor() {
    this.mock = jasmine.createSpyObj('AuthServiceMock', [
      'login',
      'logout'
    ]);

    this.login = this.decorateSpyPromise(this.mock.login);
    this.logout = this.decorateSpyPromise(this.mock.logout);
  }

  // we can go one step further and handle multiple calls to the same spy but would be more work
  private decorateSpyPromise(spy: jasmine.Spy): CustomSpy {
    const customSpy = spy as CustomSpy;
    customSpy.and.returnValue(new Promise((resolve, reject) => {
      customSpy.resolve = stub => resolve(stub);
      customSpy.reject = err => reject(err);
    }));
    return customSpy;
  }
}
