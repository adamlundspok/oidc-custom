import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';

import { LoginService } from './shared/loginmanager.service';

import { APP_ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { DashboardComponent } from './views/dashboard.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { AuthDebugComponent } from './views/auth-debug.component';
import { LoadingComponent } from './views/loading.component';

import { AuthModule } from './auth/modules/auth.module';
import { OidcSecurityService } from './auth/services/oidc.security.service';
import { OpenIDImplicitFlowConfiguration, DefaultConfiguration } from './auth/modules/auth.configuration';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ForbiddenComponent,
    HomeComponent,
    UnauthorizedComponent,
    AuthDebugComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(APP_ROUTES),
    JsonpModule,
    AuthModule.forRoot()
  ],
  providers: [
    LoginService,
    OidcSecurityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
    constructor(public oidcSecurityService: OidcSecurityService, private config: DefaultConfiguration) {

        let openIDImplicitFlowConfiguration = new OpenIDImplicitFlowConfiguration();
        openIDImplicitFlowConfiguration.stsServer = config.stsServer; //'https://localhost:44318';

        openIDImplicitFlowConfiguration.redirect_url = config.redirect_url; //'https://local.spokci.com/portal/';
        // The Client MUST validate that the aud (audience) Claim contains its client_id value registered at the Issuer identified by the iss (issuer) Claim as an audience.
        // The ID Token MUST be rejected if the ID Token does not list the Client as a valid audience, or if it contains additional audiences not trusted by the Client.
        openIDImplicitFlowConfiguration.client_id = config.client_id; //'angularclient';
        openIDImplicitFlowConfiguration.response_type = 'id_token token';
        openIDImplicitFlowConfiguration.scope = config.scope; //'dataEventRecords securedFiles openid';
        openIDImplicitFlowConfiguration.post_logout_redirect_uri = config.post_logout_redirect_uri; // 'https://localhost:44311/Unauthorized';
        openIDImplicitFlowConfiguration.start_checksession = false;
        openIDImplicitFlowConfiguration.silent_renew = true;
        openIDImplicitFlowConfiguration.startup_route = '/dashboard';
        // HTTP 403
        openIDImplicitFlowConfiguration.forbidden_route = '/Forbidden';
        // HTTP 401
        openIDImplicitFlowConfiguration.unauthorized_route = '/Unauthorized';
        openIDImplicitFlowConfiguration.log_console_warning_active = true;

        // turn off debug once stable
        openIDImplicitFlowConfiguration.log_console_debug_active = true;

        // id_token C8: The iat Claim can be used to reject tokens that were issued too far away from the current time,
        // limiting the amount of time that nonces need to be stored to prevent attacks.The acceptable range is Client specific.
        openIDImplicitFlowConfiguration.max_id_token_iat_offset_allowed_in_seconds = 3;

        this.oidcSecurityService.setupModule(openIDImplicitFlowConfiguration);
    }

}
