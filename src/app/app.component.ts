import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { LoginService } from './shared/loginmanager.service';

import { OidcSecurityService } from './auth/services/oidc.security.service';

import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AuthDebugComponent } from './views/auth-debug.component';

import { LoadingComponent } from './views/loading.component';
import { OIDCUser } from "app/auth/oidc.user.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(LoadingComponent) loader: LoadingComponent;

  title = 'OIDC Test';

  constructor(public loginService: LoginService, private router: Router) {
  }

  ngOnInit() {
    this.loader.hide();
    if (window.location.hash) {
        this.loader.show();
        this.loader.setMessage('Logging you in now');

        console.log('APP INIT: Validating user from id_token, my url is', this.router.url);
        this.loginService.securityService.authorizedCallback().subscribe((res) => {
          this.loader.setMessage('Login successful');
          console.log('APP INIT: Authorize callback with data:', res);
        }, (error) => {
          this.loader.setMessage('Error trying to log you in: ' + error.toString());
          console.error('APP INIT: Authorize failed');
          // TODO ADD REDIRECT TO UNAUTHORIZED
          
        }, () => {
          this.loader.setMessage('Welcome');
          console.log('APP INIT: AUTH COMPLETE:');
          this.loader.hide();
        });


    } else if (!this.loginService.hasValidUserLogin()) {
        console.log('Invalid user, my url is', this.router.url);
        this.loader.show();
        this.loader.setMessage('Redirecting you to sign in');
        this.loginService.securityService.authorize();
    }
  }

  login() {
    console.log('start login');
    this.loginService.securityService.authorize();
  }

  refreshSession() {
    console.log('start refreshSession');
    this.loginService.securityService.authorize();
  }

  logout() {
    console.log('start logoff');
    this.loginService.securityService.logoff();
  }

  getSecuritySettings() {
    const token = this.loginService.securityService.getToken();
    const user = this.loginService.securityService.getUserData();
    this.loginService.securityService.oidcUserShare.subscribe(( userd: OIDCUser ) => {
      if ( userd ) {
        console.log('********* OIDC USER DATA ********');
        console.log(userd);
      }
    });
    console.log('********* TOKEN ********');
    console.log(token);
    console.log('********* USER ********');
    console.log(user);
  }

}
