import { h } from 'preact';
import { useState, useContext } from 'preact/hooks';
import { css, cx } from 'emotion';
import { LoremIpsum } from 'lorem-ipsum';
import useLocalStorage from './useLocalStorage';

import Text from './Text';
import Span from './Span';
import BlackBox from './BlackBox';

const baseline = 8;

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
  const [showGrid, setGrid] = useLocalStorage('showGrid', true);

  let grid = css`
    padding: ${baseline * 5}px ${baseline * 6}px;
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
        <Text size={72} leading={2} flow={8} measure={16}>
          {lorem.generateWords(6)}
        </Text>
        <Text size={20} leading={2} flow={4} measure={50}>
          {lorem.generateWords(26)}
        </Text>
        <Text size={20} leading={2} flow={4} measure={50}>
          {lorem.generateWords(26)}
        </Text>
        <Text size={20} leading={2} flow={4} measure={50}>
          {lorem.generateWords(26)}
        </Text>
        <Text size={20} leading={2} flow={4} measure={50}>
          {lorem.generateWords(26)}
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
