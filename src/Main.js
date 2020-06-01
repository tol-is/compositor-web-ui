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

  let config_container = css`
    margin-left: 6vw;
    margin-right: 6vw;
    min-height: 100vh;
    display: flex;
    align-items: center;
  `;

  let preview_container = css`
    margin-right: 280px;
    margin-left: 6vw;
    & > * + * {
      margin-top: ${baseline * rhythm}px;
    }
  `;

  const showBg = showGrid && screen === 'preview';

  let grid = css`
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
        {screen === 'config' && (
          <div className={config_container}>
            <TextMetrics fontSize={fontSize} lineHeight={lineHeight}>
              Compositor
            </TextMetrics>
          </div>
        )}

        {screen === 'preview' && (
          <div className={preview_container}>
            {text.map((p, i) => {
              return <Text key={i} {...p} />;
            })}
          </div>
        )}
      </section>
      {screen === 'config' ? (
        <footer
          className={css`
            position: fixed;
            display: flex;
            height: auto;
            bottom: 0;
            padding: 0.2em 0.6em 0.4em 0.6em;
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
