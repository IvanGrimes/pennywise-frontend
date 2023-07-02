/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RefreshTokenResponseDto } from '../models/RefreshTokenResponseDto';
import type { SignInRequestDto } from '../models/SignInRequestDto';
import type { SignInResponseDto } from '../models/SignInResponseDto';
import type { SignOutResponseDto } from '../models/SignOutResponseDto';
import type { SignUpRequestDto } from '../models/SignUpRequestDto';
import type { SignUpResponseDto } from '../models/SignUpResponseDto';
import type { UserResponseDto } from '../models/UserResponseDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AuthService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Sign up
     * @param requestBody
     * @returns SignUpResponseDto
     * @throws ApiError
     */
    public signUp(
        requestBody: SignUpRequestDto,
    ): CancelablePromise<SignUpResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/sign-up',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                409: `User already exists`,
            },
        });
    }

    /**
     * Sign in
     * @param requestBody
     * @returns SignInResponseDto
     * @throws ApiError
     */
    public signIn(
        requestBody: SignInRequestDto,
    ): CancelablePromise<SignInResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/sign-in',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Wrong credentials`,
            },
        });
    }

    /**
     * @returns UserResponseDto
     * @throws ApiError
     */
    public user(): CancelablePromise<UserResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/auth/user',
        });
    }

    /**
     * Refresh access token
     * @returns RefreshTokenResponseDto
     * @throws ApiError
     */
    public refresh(): CancelablePromise<RefreshTokenResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/refresh',
        });
    }

    /**
     * Sign out
     * @returns SignOutResponseDto
     * @throws ApiError
     */
    public signOut(): CancelablePromise<SignOutResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/sign-out',
        });
    }

}
