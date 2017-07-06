import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import { OidcSecurityService } from '../auth/services/oidc.security.service';
import { OidcSecurityCommon } from '../auth/services/oidc.security.common';

import { UserAuth } from './userauth.model';

@Injectable()
export class LoginService implements Injectable, CanActivate {
    public user_auth: UserAuth;
    public user_data: any;
    public oidcSession: OidcSecurityCommon;
    private userAuthLoaded: any;

    private authenticatedUser: BehaviorSubject<UserAuth> = new BehaviorSubject(new UserAuth);

    constructor(public securityService: OidcSecurityService, private router: Router) {

        this.oidcSession = securityService.oidcSecurityCommon;
        this.userAuthLoaded = this.securityService.onUserDataLoaded.subscribe(evt => {
            console.log('LOGINMGR USER DATA LOADED');
            this.user_auth = new UserAuth();
            if (this.securityService.getUserData()) {
                this.user_data = this.securityService.getUserData();
                this.user_auth.name = this.user_data.name;
                this.authenticatedUser.next(this.user_auth);
                console.log('STORING USER DATA:', JSON.stringify(this.user_data));
                this.oidcSession.store(this.oidcSession.storage_user_data, this.user_data);
            }
        });
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

        console.log('User data in local variable:', this.user_data);
        for (const key in this.user_data) {
            if (key) {
                console.log('\t' + key + ' : ' + this.user_data[key]);
            }
        }


    }

    public storeAuthUser(userData: any): void {
        this.oidcSession.store(this.oidcSession.storage_user_data, userData);
    }

    public getAuthUser(): UserAuth {
        if (this.oidcSession.retrieve(this.oidcSession.storage_user_data)) {
            let ud = new UserAuth();
            ud.name = this.oidcSession.retrieve(this.oidcSession.storage_user_data).name;
            return ud;
        }
        return null;
    }

    public getAuthenticatedUser(): Observable<UserAuth> {
        return this.authenticatedUser.share();
    }
}

