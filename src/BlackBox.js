import React from 'react';
import { css } from 'emotion';

export default props => {
  return (
    <div
      className={css`
        height: 64px;
        min-width: 180px;
        background-color: black;
        color: white;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0 16px 0 16px;
      `}
      {...props}
    />
  );
};
