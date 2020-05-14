import React, { useContext } from 'react';
import { css, cx } from 'emotion';

import Context from './Context';
import Text from './Text';

export default () => {
  const { showGrid, screen, baseline, rhythm, text } = useContext(Context);

  let container = css`
    margin-right: 280px;
    max-width: 66rem;
    margin-left: 4vw;
    ${screen === 'preview' &&
    `
    & > * + * {
      margin-top: ${baseline * rhythm}px;
    }
    `}
  `;

  const showBg = showGrid && screen === 'preview';

  let grid = css`
    padding: ${baseline * 8}px 0;
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
            <>
              <Text text={'X'} size={400} leading={0} />
              <p>
                A simple GUI to preview basekick metrics inspired by{' '}
                <a href="https://seek-oss.github.io/braid-design-system/">
                  Braid Design System
                </a>{' '}
                and{' '}
                <a href="https://github.com/michaeltaranto/basekick">
                  Basekick
                </a>
              </p>
              <ul>
                <li>Upload your font</li>
                <li>Use the config tab for any optical adjustments.</li>
                <li>Use the preview tab to create your composition</li>
              </ul>
            </>
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
