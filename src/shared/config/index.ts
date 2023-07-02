const getEnvVar = (key: string) => {
  if (import.meta.env[key] === undefined) {
    throw new Error(`Env variable ${key} is required`);
  }

  return (import.meta.env[key] || '') as string;
};

/** API entrypoint */
export const API_URL = getEnvVar('VITE_API_URL');

export const MODE = getEnvVar('MODE');

export const isDevelopment = MODE === 'development';

export const isProduction = MODE === 'production';
