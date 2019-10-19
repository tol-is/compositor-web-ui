import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { css, cx } from 'emotion';
import { LoremIpsum } from 'lorem-ipsum';
import useLocalStorage from './useLocalStorage';

import Context from './Context';
import Text from './Text';
import Span from './Span';

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
  margin: 0 2em;
`;

export default () => {
  const { showGrid, baseline } = useContext(Context);

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
        <Text size={57} leading={-15} flow={4} measure={16}>
          POTATO
          <br />
          TOMATO
        </Text>
        <Text size={400} leading={0} flow={4} measure={50}>
          MORE
        </Text>
        <Text size={57} leading={1} flow={4} measure={50}>
          {lorem.generateWords(26).toUpperCase()}
        </Text>
        <Text size={20} leading={1} flow={4} measure={50}>
          {lorem.generateWords(26)}
        </Text>
        <Text size={28} leading={1} flow={4} measure={50}>
          {lorem.generateWords(26)}
        </Text>
        <Text size={38} leading={1} flow={4} measure={50}>
          {lorem.generateWords(26)}
        </Text>
      </div>
    </section>
  );
};
