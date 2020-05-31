import React, { useContext } from 'react';
import { css, cx } from 'emotion';

import Context from './Context';
import Text from './Text';

import TextMetrics from './TextMetrics';

export default () => {
  const {
    showGrid,
    screen,
    baseline,
    rhythm,
    text,
    lineHeight,
    fontSize,
  } = useContext(Context);

  let container = css`
    margin-right: 280px;
    max-width: 66rem;
    margin-left: 6vw;
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
    background-size: 100% ${baseline}px;
    background-image: linear-gradient(
      rgba(255, 107, 107, ${showBg ? 0.6 : 0}) 1px,
      transparent 0
    );
  `;

  return (
    <>
      <section className={grid}>
        <div className={container}>
          {screen === 'config' ? (
            <>
              <div
                style={{
                  paddingTop: `${fontSize * 0.12}px`,
                  paddingBottom: `${fontSize * 0.3}px`,
                }}
              >
                <TextMetrics fontSize={fontSize} lineHeight={lineHeight}>
                  Compositor
                </TextMetrics>
              </div>
              {/* <Text text={'X'} size={400} leading={0} /> */}

              <p>
                {/* A simple GUI to preview baseline typography inspired by{' '} */}
                {/* <a href="https://seek-oss.github.io/braid-design-system/">
                  Braid Design System
                </a>{' '}
                and{' '}
                <a href="https://github.com/michaeltaranto/basekick">
                  Basekick
                </a> */}
              </p>
              {/* <ul>
                <li>Upload your font</li>
                <li>Metrics will be computed automatically</li>
                <li>Use the preview tab to test your composition</li>
              </ul> */}
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
        <a target="_blank" href="https://github.com/a7sc11u">
          A7SC11U
        </a>
        <a target="_blank" href="https://github.com/a7sc11u/compositor-gui">
          GITHUB
        </a>
      </footer>
    </>
  );
};
