import { h } from 'preact';
import { useState, useContext } from 'preact/hooks';
import { css, cx } from 'emotion';
import { LoremIpsum } from 'lorem-ipsum';

import Text from './Text';
import Span from './Span';
import BlackBox from './BlackBox';

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 5,
    min: 4
  },
  wordsPerSentence: {
    max: 8,
    min: 4
  }
});

let container = css`
  // display: flex;
  // flex-direction: column;
  margin: 0 auto;
`;

export default () => {
  const [showGrid, setGrid] = useState(true);

  let grid = css`
    padding: 64px 16px 16px 56px;
    min-height: 100vh;
    position: relative;
    background-repeat: repeat;
    background-size: 100% 16px;
    background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 140, ${showGrid ? 0.08 : 0}) 8px,
      transparent 8px
    );
  `;

  return (
    <section className={grid}>
      <div className={container}>
        <Text size={72} leading={2} measure={18} flow={4}>
          {lorem.generateWords(6).toUpperCase()}
        </Text>
        <Text size={23} leading={2} measure={50}>
          {lorem.generateWords(52)}
        </Text>
      </div>
      <button
        onClick={() => setGrid(!showGrid)}
        className={css`
          appearance: none;
          width: 1em;
          height: 1em;
          overflow: hidden;
          display: block;
          font-size: 20px;
          line-height: 6px;
          position: fixed;
          top: 1em;
          right: 1em;
          background-color: transparent;
        `}
      >
        /
      </button>
    </section>
  );
};
