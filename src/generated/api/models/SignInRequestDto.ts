/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type SignInRequestDto = {
    /**
     * The email of a user
     */
    email: string;
    /**
     * The password of a user
     */
    password: string;
    /**
     * Whether should create a refresh token
     */
    remember: boolean;
};

