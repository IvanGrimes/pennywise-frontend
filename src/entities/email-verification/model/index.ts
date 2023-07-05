import { createEffect, createStore } from 'effector';
import { api } from 'shared/api';
import { AxiosResponse } from 'axios';

export enum EmailVerificationStatusEnum {
  OK,
  GONE,
  BAD_REQUEST,
  CONFLICT,
  UNKNOWN,
}

const verifyFx = createEffect(api.emailVerification.verify);

const resendFx = createEffect(api.emailVerification.resendVerificationLink);

const isAxiosResponse = (value: unknown): value is AxiosResponse =>
  value !== null && typeof value === 'object' && 'status' in value;

export const $verifyResult = createStore<EmailVerificationStatusEnum | null>(
  null
)
  .on(verifyFx.done, () => EmailVerificationStatusEnum.OK)
  .on(verifyFx.failData, (_, payload) => {
    if (isAxiosResponse(payload)) {
      if (payload.status === 400)
        return EmailVerificationStatusEnum.BAD_REQUEST;
      if (payload.status === 409) return EmailVerificationStatusEnum.CONFLICT;
      if (payload.status === 410) return EmailVerificationStatusEnum.GONE;
    }

    return EmailVerificationStatusEnum.UNKNOWN;
  });

export const $resendResult = createStore<EmailVerificationStatusEnum | null>(
  null
)
  .on(resendFx.done, () => EmailVerificationStatusEnum.OK)
  .on(resendFx.failData, (_, payload) => {
    if (isAxiosResponse(payload)) {
      if (payload.status === 409) return EmailVerificationStatusEnum.CONFLICT;
    }

    return EmailVerificationStatusEnum.UNKNOWN;
  });

export const effects = { verifyFx, resendFx };
