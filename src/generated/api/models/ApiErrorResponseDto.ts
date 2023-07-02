/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ApiErrorResponseDto = {
    statusCode: number;
    message: string;
    error: string;
    correlationId: string;
    /**
     * Optional list of sub-errors
     */
    subErrors?: Array<string> | null;
};

