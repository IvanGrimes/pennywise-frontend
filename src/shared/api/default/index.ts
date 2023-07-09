import { api } from './api';

const bindMethods = <T extends Record<string, any>>(target: T) => {
  Object.getOwnPropertyNames(Object.getPrototypeOf(target))
    .filter((name) => name !== 'constructor')
    .forEach((method: keyof T) => {
      if (typeof target[method] === 'function') {
        target[method] = target[method].bind(target);
      }
    });

  return target;
};

export const auth = bindMethods(api.auth);
export const user = bindMethods(api.user);
export const emailVerification = bindMethods(api.emailVerification);
export const session = bindMethods(api.session);
export const resetPassword = bindMethods(api.resetPassword);

export * from './setToken';
export * from './setUnauthorizedHandler';
