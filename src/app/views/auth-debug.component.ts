import {
  Component, OnDestroy,
  OnInit, ViewChild,
} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OidcSecurityService } from '../auth/services/oidc.security.service';
import { LoginService } from '../shared/loginmanager.service';


@Component({
  selector: 'app-auth-debug',
  templateUrl: './auth-debug.component.html'
})
export class AuthDebugComponent implements OnInit {

    private userLoadedListener: any;
    public token: string;
    public user_data: any = { name: '', customer_id: '', sub: '' };

    constructor(private loginmanager: LoginService) {}

    public ngOnInit() {

        // this.userLoadedListener = this.loginmanager.securityService.onUserDataLoaded.subscribe(evt => {
        //     console.log('USER DATA LOADED');
        //     console.log(evt);
        //     this.token = this.loginmanager.securityService.getToken();
        //     if (this.loginmanager.securityService.getUserData()) {
        //         this.user_data = this.loginmanager.securityService.getUserData();
        //         console.log('GET USER DATA', this.user_data);
        //         for (const key in this.user_data) {
        //             if (key) {
        //                 console.log(key + ' : ' + this.user_data[key]);
        //             }
        //         }
        //     }
        // });
    }

    public checkAuthorization() {
        console.log('is authorized: ' + this.loginmanager.securityService.isAuthorized);
        console.log('user data' + this.loginmanager.securityService.getUserData());
        this.loginmanager.printSessionStatetoConsole();
    }
}
