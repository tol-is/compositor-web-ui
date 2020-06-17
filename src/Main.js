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
    setScreen,
  } = useContext(Context);

  let config_container = css`
    min-height: 100vh;
    display: flex;
    align-items: center;
  `;

  let wtf_container = css`
    padding-top: 8vw;
    margin-left: 6vw;
    margin-right: 6vw;
  `;

  let preview_container = css`
    margin-right: 280px;
    margin-left: 6vw;
    padding-top: ${baseline * 6}px;
    padding-bottom: ${baseline * 6}px;
    & > * + * {
      margin-top: ${baseline * rhythm}px;
    }
  `;

  let preview_button = css`
    display: block;
    background: transparent;
    padding: ${baseline * 1}px 0;
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
          <>
            <div className={wtf_container}>
              <p
                className={css`
                  margin-top: 0;
                  margin-bottom: ${baseline * 4}px;
                `}
              >
                <TextBaseline fontSize={20} leading={2} measure={55}>
                  Compositor is a typographic system for the web. Using vertical
                  metrics, compositor trims the line-gap above and below text
                  elements, realigns the glyphs to the baseline and implements
                  space and size constraints that adhere to a baseline-grid
                  rhythm.
                </TextBaseline>
              </p>
              <ul
                className={css`
                  margin-top: 0;
                  margin-bottom: ${baseline * 4}px;
                  padding: 0;
                  list-style-position: outside;
                `}
              >
                <li>
                  <div
                    className={css`
                      margin-bottom: ${baseline * 2}px;
                      transform: translateY(-10px);
                    `}
                  >
                    <TextBaseline fontSize={20} leading={2} measure={55}>
                      Font Size: Any font-size is allowed. The text's bounding
                      box is rounded to the nearest grid row, above the
                      cap-height.
                    </TextBaseline>
                  </div>
                </li>
                <li>
                  <div
                    className={css`
                      margin-bottom: ${baseline * 2}px;
                      transform: translateY(-10px);
                    `}
                  >
                    <TextBaseline fontSize={20} leading={2} measure={55}>
                      Leading: In compositor, leading specifies the space
                      between lines of text, unlike baseline-to-baseline in
                      traditional typography.
                    </TextBaseline>
                  </div>
                </li>
                <li>
                  <div
                    className={css`
                      margin-bottom: ${baseline * 2}px;
                      transform: translateY(-10px);
                    `}
                  >
                    <TextBaseline fontSize={20} leading={2} measure={55}>
                      Measure: The line-width in `ch` units.
                    </TextBaseline>
                  </div>
                </li>
              </ul>

              <p>
                <button
                  onClick={() => setScreen('preview')}
                  className={preview_button}
                >
                  <TextBaseline fontSize={20} leading={2} measure={55}>
                    Go to the compose screen
                  </TextBaseline>
                </button>
              </p>

              <div className={config_container}>
                <TextMetrics fontSize={fontSize} lineHeight={lineHeight}>
                  Compositor
                </TextMetrics>
              </div>

              <p
                className={css`
                  margin-top: 0;
                  margin-bottom: ${baseline * 8}px;
                `}
              >
                <TextBaseline fontSize={20} leading={2} measure={55}>
                  The compositor algorithm is also available as an experimental
                  implementation in{' '}
                  <a href="https://github.com/a7sc11u/tailwind-compositor">
                    tailwind-compositor
                  </a>
                  . ReactJS version coming soon in raster-ui.
                </TextBaseline>
              </p>
            </div>
          </>
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
