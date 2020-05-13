import React, { createContext } from 'react';

export const Context = createContext({
  showGrid: true,
  setGrid: () => null,
  debug: true,
  setDebug: () => null,
  font: null,
  setFont: () => 1,
});

export default Context;
