/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MeResponseDto } from '../models/MeResponseDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class UserService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns MeResponseDto
     * @throws ApiError
     */
    public me(): CancelablePromise<MeResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/user/me',
        });
    }

}
