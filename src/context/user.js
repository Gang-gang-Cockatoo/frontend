import { createContext } from 'react';

export const UserContext = createContext({
  token: '',
  user: {},
  logIn: () => {},
  logOut: () => {},
});
