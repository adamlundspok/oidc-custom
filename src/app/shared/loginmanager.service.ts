import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import { OidcSecurityService } from '../auth/services/oidc.security.service';
import { OidcSecurityCommon } from '../auth/services/oidc.security.common';
import { OidcSecurityUserService } from '../auth/services/oidc.security.user-service';

import { OIDCUser } from '../auth/oidc.user.model';

@Injectable()
export class LoginService implements Injectable, CanActivate {
    public oidcSession: OidcSecurityCommon;
    private oidcUser: OIDCUser;

    constructor(public securityService: OidcSecurityService, private router: Router) {

        this.oidcSession = securityService.oidcSecurityCommon;
        // this.userAuthLoaded = this.securityService.onUserDataLoaded.subscribe(evt => {
        //     console.log('LOGINMGR USER DATA LOADED');

        //     this.securityService.oidcSecurityUserService.getIdentityUserData()
        //         .map((res) => {
        //             console.log('Identity user data from asynch', res);
        //     });

        //     if (this.securityService.getUserData()) {
        //         this.user_data = this.securityService.getUserData();
        //         console.log('STORING USER DATA:', JSON.stringify(this.user_data));
        //         this.oidcSession.store(this.oidcSession.storage_user_data, this.user_data);
        //     }

        // });

        this.securityService.oidcUserShare
            .subscribe(
                (user: OIDCUser) => {
                    this.oidcUser = user;
                    console.log('LOGINMGR USER DATA LOADED');
                    console.log(user);
                },
                (error) => {

                }, () => {

                } );

    }

    public canActivate(thing: any): boolean {
        console.log('PASSED FROM CANACTIVATE', thing);
        if (this.securityService.isAuthorized) {
            return true;
        }
        return false;
    }

    public hasValidUserLogin(): boolean {
        if (this.oidcSession && this.oidcSession.storage && this.oidcSession.retrieve(this.oidcSession.storage_is_authorized) !== null) {
            return this.oidcSession.retrieve(this.oidcSession.storage_is_authorized);
        }
        return false;
    }

    public failedLoginAttempt(error: any): void {
        this.securityService.oidcSecurityCommon.logError(error);
        if (error.status === 403) {
            this.router.navigate([this.securityService.authConfiguration.forbidden_route]);
        } else if (error.status === 401) {
            this.securityService.resetAuthorizationData();
            this.router.navigate([this.securityService.authConfiguration.unauthorized_route]);
        } else {
            this.router.navigate([this.securityService.authConfiguration.unauthorized_route]);
        }
    }


    public printSessionStatetoConsole() {
        if (!this.oidcSession.storage) {
            console.log('OIDC Session not initialized');
            return false;
        }

        console.log('SESSION STATE');
        console.log('Is authorized: ', this.oidcSession.retrieve(this.oidcSession.storage_is_authorized));
        if (this.oidcSession.retrieve(this.oidcSession.storage_user_data)) {
            console.log('User data in storage: ', this.oidcSession.retrieve(this.oidcSession.storage_user_data));
        } else {
            console.log('No user data available in storage');
        }

        console.log('User data in local variable:', this.oidcUser);
        for (const key in this.oidcUser) {
            if (key) {
                console.log('\t' + key + ' : ' + this.oidcUser[key]);
            }
        }

    }
}

