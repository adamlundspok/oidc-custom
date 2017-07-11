import { OidcSecurityUserService } from './services/oidc.security.user-service';
import { OidcSecurityCommon } from './services/oidc.security.common';
import { OidcSecurityValidation } from './services/oidc.security.validation';

export class OIDCUser {
    access_token: string;
    id_token: string;
    user_data: any;
    session_state: any;
    state: any;
    token_type: string;
    customer_id: string;
    name: string;
    user_id: string;
    scope: string;
    profile: any;
    expires_at: number;
    expires_in: number;

    authorizationComplete: boolean;

    constructor() {
        this.authorizationComplete = false;
    }

    public toStorageString() {
        const b = {
            'access_token': this.access_token,
            'id_token': this.id_token,
            'user_data': this.user_data,
            'session_state': this.session_state,
            'state': this.state,
            'token_type': this.token_type,
            'customer_id': this.customer_id,
            'name': this.name,
            'user_id': this.user_id,
            'scope': this.scope,
            'profile': this.profile,
            'expires_at': this.expires_at,
            'expires_in': this.expires_in
        };
        return b;
    }
}
