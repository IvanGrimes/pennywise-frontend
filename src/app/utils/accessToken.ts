const key = 'ACCESS_TOKEN';

export const readAccessToken = () => localStorage.getItem(key);

export const writeAccessToken = (value: string) => localStorage.setItem(key, value);

export const removeAccessToken = () => localStorage.removeItem(key);
