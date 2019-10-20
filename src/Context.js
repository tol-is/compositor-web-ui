import React, { createContext } from 'react';

export const Context = createContext({
  showGrid: true,
  setGrid: () => null,
  debug: true,
  setDebug: () => null
});

export default Context;
