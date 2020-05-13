import React, { useContext } from 'react';
import { css, cx } from 'emotion';

import Context from './Context';
import TextBlock from './TextBlock';

export default () => {
  const { showGrid, baseline, text } = useContext(Context);

  let container = css`
    margin: 0 500px 0 5vw;
    & > * + * {
      margin-top: ${baseline * 3}px;
    }
  `;

  let grid = css`
    padding: ${baseline * 10}px 0;
    min-height: 100vh;
    position: relative;
    background-repeat: repeat;
    background-size: 100% ${baseline * 2}px;
    background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 140, ${showGrid ? 0.08 : 0}) ${baseline}px,
      transparent ${baseline}px
    );
  `;

  return (
    <section className={grid}>
      <div className={container}>
        {text.map(({ text, size, leading }) => {
          return (
            <TextBlock key={text} text={text} size={size} leading={leading} />
          );
        })}
      </div>
    </section>
  );
};
