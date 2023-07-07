/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AllResponseDto = {
    id: number;
    browserName: string | null;
    browserVersion: string | null;
    deviceType: string | null;
    deviceBrand: string | null;
    deviceOs: string | null;
    location: string | null;
    ip: string;
    isRevoked: boolean;
    isCurrent: boolean;
    updatedAt: string;
};

