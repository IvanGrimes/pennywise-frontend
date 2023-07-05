/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VerifyRequestDto } from '../models/VerifyRequestDto';
import type { VerifyResponseDto } from '../models/VerifyResponseDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class EmailVerificationService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Verify email
     * @param requestBody
     * @returns VerifyResponseDto
     * @throws ApiError
     */
    public verify(
        requestBody: VerifyRequestDto,
    ): CancelablePromise<VerifyResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/email-verification/verify',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Resend verification link
     * @returns void
     * @throws ApiError
     */
    public resend(): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/email-verification/resend',
        });
    }

}
