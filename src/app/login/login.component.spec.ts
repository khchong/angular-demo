import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { TestHelper } from '../../test/test-helper';
import { LoginComponent } from './login.component';
import { PlaceholderPageComponent } from '../../test/placeholder-page.component';
import { AuthService } from '../core/auth/auth.service';
import { AuthServiceMock } from '../core/auth/auth.service.mock';
import { FileUploadComponentMock } from '../shared/file-dropzone/file-upload.component.mock';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let componentElement: DebugElement;
  let location: Location;

  let authServiceMock: AuthServiceMock;

  beforeEach(() => {
    authServiceMock = new AuthServiceMock();
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'donation-list', component: PlaceholderPageComponent }
        ])
      ],
      declarations: [
        LoginComponent,
        FileUploadComponentMock,
        PlaceholderPageComponent
      ],
      providers: [
        { provide: AuthService, useFactory: () => authServiceMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    componentElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should be in the base route', () => {
    expect(location.path()).toEqual('');
  });

  it('should display the login form', () => {
    expect(TestHelper.getElement(componentElement, '#email')).toBeTruthy();
    expect(TestHelper.getElement(componentElement, '#password')).toBeTruthy();
    expect(TestHelper.getElement(componentElement, '.login-button')).toBeTruthy();
  });

  it('should not display login error', () => {
    expect(TestHelper.getElement(componentElement, '.login-error')).toBeFalsy();
  });

  describe('User submits the form with email and password', () => {

    beforeEach(() => {
      TestHelper.setInputValue(componentElement, '#email', 'kchong@classy.org');
      TestHelper.setInputValue(componentElement, '#password', '123456789');
      TestHelper.clickElement(componentElement, '.login-button');
      fixture.detectChanges();
    });

    it('should disable the login button', () => {
      expect(TestHelper.getElement(componentElement, '.login-button', true)
        .nativeElement.disabled)
        .toBeTruthy();
    });

    it('should attempt to login the user', () => {
      expect(authServiceMock.login).toHaveBeenCalledWith('kchong@classy.org', '123456789', undefined);
    });

    describe('And the login succeeds', () => {

      beforeEach(async () => {
        authServiceMock.login.resolve();

        await TestHelper.whenStable(fixture, 2);
      });

      it('should navigate to the donation page', () => {
        expect(location.path()).toEqual('/donation-list');
      });
    });

    describe('And the login fails with an unknown error', () => {

      beforeEach(async () => {
        authServiceMock.login.reject('blah blah blah');

        await TestHelper.whenStable(fixture, 2);
      });

      it('should display there was an unknown error', () => {
        expect(TestHelper.getElementText(componentElement, '.login-error'))
          .toEqual('Unknown Error');
      });
    });

    describe('And the login fails with invalid credentials error', () => {

      beforeEach(async () => {
        authServiceMock.login.reject('invalid_credentials');

        await TestHelper.whenStable(fixture, 2);
      });

      it('should display error for invalid credentials', () => {
        expect(TestHelper.getElementText(componentElement, '.login-error'))
          .toEqual('Invalid Credentials');
      });
    });
  });
});
