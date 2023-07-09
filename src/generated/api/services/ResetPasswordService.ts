/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResetPasswordResponseDto } from '../models/ResetPasswordResponseDto';
import type { SetPasswordRequestDto } from '../models/SetPasswordRequestDto';
import type { SetPasswordResponseDto } from '../models/SetPasswordResponseDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ResetPasswordService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Reset password
     * @param email
     * @returns ResetPasswordResponseDto
     * @throws ApiError
     */
    public request(
        email: string,
    ): CancelablePromise<ResetPasswordResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/reset-password',
            query: {
                'email': email,
            },
            errors: {
                404: `User not found`,
            },
        });
    }

    /**
     * Set new password
     * @param requestBody
     * @returns SetPasswordResponseDto
     * @throws ApiError
     */
    public setPassword(
        requestBody: SetPasswordRequestDto,
    ): CancelablePromise<SetPasswordResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/reset-password/set-password',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad reset password token`,
                404: `Reset password token not found`,
                410: `Reset password token expired`,
            },
        });
    }

}
