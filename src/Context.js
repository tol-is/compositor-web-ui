import { h, createContext } from 'preact';

export const Context = createContext({
  showGrid: true,
  setGrid: () => null,
  debug: true,
  setDebug: () => null
});

export default Context;
