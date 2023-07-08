/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AllResponseDto } from '../models/AllResponseDto';
import type { TerminateRequestDto } from '../models/TerminateRequestDto';
import type { TerminateResponseDto } from '../models/TerminateResponseDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class SessionService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns AllResponseDto
     * @throws ApiError
     */
    public all(): CancelablePromise<Array<AllResponseDto>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/session/all',
        });
    }

    /**
     * @param requestBody
     * @returns TerminateResponseDto
     * @throws ApiError
     */
    public terminate(
        requestBody: TerminateRequestDto,
    ): CancelablePromise<TerminateResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/session/terminate',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns TerminateResponseDto
     * @throws ApiError
     */
    public terminateAll(): CancelablePromise<TerminateResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/session/terminate-all',
        });
    }

}
