import { Injectable } from '@angular/core';

const url = 'https://local.spokci.com';
    // const settings = {
    //   'authority': `${url}/identity`,
    //   'client_id': 'portal.web',
    //   'redirect_uri': `${url}/portal/`,
    //   'post_logout_redirect_uri': `${url}/portal/`,
    //   'response_type': 'id_token token',
    //   'scope': 'openid profile portal.api',
    //   'silent_redirect_uri': `${url}/portal/`,
    //   'automaticSilentRenew': true,
    //   'filterProtocolClaims': true,
    //   'loadUserInfo': true
    // };

export class DefaultConfiguration {
    stsServer = `${url}/identity`;
    redirect_url = `${url}/portal/`;

    client_id = 'portal.web';
    response_type = 'id_token token';
    // For some oidc, we require resource identifier to be provided along with the request.
    resource = '';
    scope = 'openid profile portal.api';
    post_logout_redirect_uri = `${url}/portal/`;
    start_checksession = false;
    silent_renew = true;
    startup_route = '/dataeventrecords/list';
    // HTTP 403
    forbidden_route = '/Forbidden';
    // HTTP 401
    unauthorized_route = '/Unauthorized';
    log_console_warning_active = true;
    log_console_debug_active = false;


    // id_token C8: The iat Claim can be used to reject tokens that were issued too far away from the current time,
    // limiting the amount of time that nonces need to be stored to prevent attacks.The acceptable range is Client specific.
    max_id_token_iat_offset_allowed_in_seconds = 3;
    override_well_known_configuration = false;
    override_well_known_configuration_url = 'https://localhost:44386/wellknownconfiguration.json';
    // identity/.well-known/openid-configuration
}

export class OpenIDImplicitFlowConfiguration {

    stsServer: string;
    redirect_url: string;
    client_id: string;
    response_type: string;
    resource: string;
    scope: string;
    post_logout_redirect_uri: string;
    start_checksession: boolean;
    silent_renew: boolean;
    startup_route: string;
    forbidden_route: string;
    unauthorized_route: string;
    log_console_warning_active: boolean;
    log_console_debug_active: boolean;
    max_id_token_iat_offset_allowed_in_seconds: number;
    override_well_known_configuration: boolean;
    override_well_known_configuration_url: string;
}

@Injectable()
export class AuthConfiguration {
    private openIDImplicitFlowConfiguration: OpenIDImplicitFlowConfiguration;

    get stsServer(): string {
        return this.openIDImplicitFlowConfiguration.stsServer || this.defaultConfig.stsServer;
    }

    get redirect_url(): string {
        return this.openIDImplicitFlowConfiguration.redirect_url || this.defaultConfig.redirect_url;
    }

    get client_id(): string {
        return this.openIDImplicitFlowConfiguration.client_id || this.defaultConfig.client_id;
    }

    get response_type(): string {
        return this.openIDImplicitFlowConfiguration.response_type || this.defaultConfig.response_type;
    }

    get resource(): string {
        return this.openIDImplicitFlowConfiguration.resource || this.defaultConfig.resource;
    }

    get scope(): string {
        return this.openIDImplicitFlowConfiguration.scope || this.defaultConfig.scope;
    }

    get post_logout_redirect_uri(): string {
        return this.openIDImplicitFlowConfiguration.post_logout_redirect_uri || this.defaultConfig.post_logout_redirect_uri;
    }

    get start_checksession(): boolean {
        return this.openIDImplicitFlowConfiguration.start_checksession || this.defaultConfig.start_checksession;
    }

    get silent_renew(): boolean {
        return this.openIDImplicitFlowConfiguration.silent_renew || this.defaultConfig.silent_renew;
    }

    get startup_route(): string {
        return this.openIDImplicitFlowConfiguration.startup_route || this.defaultConfig.startup_route;
    }

    get forbidden_route(): string {
        return this.openIDImplicitFlowConfiguration.forbidden_route || this.defaultConfig.forbidden_route;
    }

    get unauthorized_route(): string {
        return this.openIDImplicitFlowConfiguration.unauthorized_route || this.defaultConfig.unauthorized_route;
    }

    get log_console_warning_active(): boolean {
        return this.openIDImplicitFlowConfiguration.log_console_warning_active || this.defaultConfig.log_console_warning_active;
    }

    get log_console_debug_active(): boolean {
        return this.openIDImplicitFlowConfiguration.log_console_debug_active || this.defaultConfig.log_console_debug_active;
    }

    get max_id_token_iat_offset_allowed_in_seconds(): number {
        return this.openIDImplicitFlowConfiguration.max_id_token_iat_offset_allowed_in_seconds || this.defaultConfig.max_id_token_iat_offset_allowed_in_seconds;
    }

    get override_well_known_configuration(): boolean {
        return this.openIDImplicitFlowConfiguration.override_well_known_configuration || this.defaultConfig.override_well_known_configuration;
    }

    get override_well_known_configuration_url(): string {
        return this.openIDImplicitFlowConfiguration.override_well_known_configuration_url || this.defaultConfig.override_well_known_configuration_url;
    }

    constructor(private defaultConfig: DefaultConfiguration) { }

    init(openIDImplicitFlowConfiguration: OpenIDImplicitFlowConfiguration) {
        this.openIDImplicitFlowConfiguration = openIDImplicitFlowConfiguration;
    }
}
