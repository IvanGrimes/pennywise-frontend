const key = '@@pennywise/access-token';

export const writeAccessToken = (value: string) =>
  localStorage.setItem(key, value);

export const readAccessToken = () => localStorage.getItem(key);

export const removeAccessToken = () => localStorage.removeItem(key);
