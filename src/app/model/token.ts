import { createEvent, createStore } from 'effector';

type Token = string | null;

const setToken = createEvent<Token>();

export const $store = createStore<Token>(null).on(
  setToken,
  (_, payload) => payload
);

export const events = { setToken };
