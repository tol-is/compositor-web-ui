import React, { useContext } from 'react';
import { css, cx } from 'emotion';

import Context from './Context';
import Text from './Text';
import TextBaseline from './TextBaseline';
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
    fontFamily,
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
                style={
                  {
                    // paddingTop: `${fontSize * 0.12}px`,
                    // paddingBottom: `${fontSize * 0.3}px`,
                  }
                }
              >
                <TextMetrics fontSize={fontSize} lineHeight={lineHeight}>
                  Compositor
                </TextMetrics>
              </div>

              <div style={{ fontFamily: fontFamily }}></div>
            </>
          ) : (
            text.map(({ text, size, leading, measure }) => {
              return (
                <Text
                  key={text}
                  text={text}
                  size={size}
                  leading={leading}
                  measure={measure}
                />
              );
            })
          )}
        </div>
      </section>
      {screen === 'config' ? (
        <footer
          className={css`
            position: fixed;
            display: flex;
            height: auto;
            bottom: 0;
            padding: 0.5em 1em;
            right: 0px;
            background-color: #1a1a1a;
            color: white;
            & > * + * {
              display: inline-block;
              margin-left: 20px;
            }
          `}
        >
          <TextBaseline>
            <a target="_blank" href="https://github.com/a7sc11u">
              A7SC11U
            </a>
          </TextBaseline>
        </footer>
      ) : null}
    </>
  );
};
