import React, { useContext } from 'react';
import { css, cx } from 'emotion';

import Context from './Context';
import Text from './Text';

export default () => {
  const { showGrid, screen, baseline, rhythm, text } = useContext(Context);

  let container = css`
    margin: 0 500px 0 5vw;
    & > * + * {
      margin-top: ${baseline * rhythm}px;
    }
  `;

  const showBg = showGrid && screen === 'preview';

  let grid = css`
    padding: ${baseline * 10}px 0;
    min-height: 100vh;
    position: relative;
    background-repeat: repeat;
    background-size: 100% ${baseline * 2}px;
    background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 140, ${showBg ? 0.08 : 0}) ${baseline}px,
      transparent ${baseline}px
    );
  `;

  return (
    <>
      <section className={grid}>
        <div className={container}>
          {screen === 'config' ? (
            <Text text={'XO'} size={400} leading={0} />
          ) : (
            text.map(({ text, size, leading }) => {
              return (
                <Text key={text} text={text} size={size} leading={leading} />
              );
            })
          )}
        </div>
      </section>
      <footer
        className={css`
          position: fixed;
          bottom: 10px;
          right: 0px;
          font-size: 14px;
          & > * {
            margin-right: 20px;
          }
        `}
      >
        <a href="https://a7sc11u.dev">A7SC11U</a>
        <a href="https://github.com/a7sc11u/basekick-gui">GITHUB</a>
      </footer>
    </>
  );
};
