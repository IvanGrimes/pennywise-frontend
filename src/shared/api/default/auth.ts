import { SignUpRequestDto, SignInRequestDto } from './models';
import { api } from './api';

export const signUp = (params: SignUpRequestDto) => api.auth.signUp(params);

export const signIn = (params: SignInRequestDto) => api.auth.signIn(params);

export const refresh = () => api.auth.refresh();

export const signOut = () => api.auth.signOut();
