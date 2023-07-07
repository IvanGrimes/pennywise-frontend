/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AllResponseDto } from '../models/AllResponseDto';
import type { TerminateRequestDto } from '../models/TerminateRequestDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class SessionService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns AllResponseDto
     * @throws ApiError
     */
    public all(): CancelablePromise<AllResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/session/all',
        });
    }

    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public terminate(
        requestBody: TerminateRequestDto,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/session/terminate',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns any
     * @throws ApiError
     */
    public terminateAll(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/session/terminate-all',
        });
    }

}
