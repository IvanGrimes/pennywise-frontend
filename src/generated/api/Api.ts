/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { AxiosHttpRequest } from './core/AxiosHttpRequest';

import { AuthService } from './services/AuthService';
import { EmailVerificationService } from './services/EmailVerificationService';
import { ResetPasswordService } from './services/ResetPasswordService';
import { SessionService } from './services/SessionService';
import { UserService } from './services/UserService';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class Api {

    public readonly auth: AuthService;
    public readonly emailVerification: EmailVerificationService;
    public readonly resetPassword: ResetPasswordService;
    public readonly session: SessionService;
    public readonly user: UserService;

    public readonly request: BaseHttpRequest;

    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = AxiosHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? '',
            VERSION: config?.VERSION ?? '1.0.0',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });

        this.auth = new AuthService(this.request);
        this.emailVerification = new EmailVerificationService(this.request);
        this.resetPassword = new ResetPasswordService(this.request);
        this.session = new SessionService(this.request);
        this.user = new UserService(this.request);
    }
}

