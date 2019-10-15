import { h } from 'preact';
import { useContext } from 'preact/hooks';
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

let grid = css`
  padding: 64px 16px 16px 56px;
  min-height: 100vh;
  position: relative;
  background-repeat: repeat;
  background-size: 100% 16px;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 140, 0.01) 8px,
    transparent 8px
  );
`;

let container = css`
  // display: flex;
  // flex-direction: column;
  margin: 0 auto;
`;

export default () => {
  return (
    <section className={grid}>
      <div className={container}>:)</div>
    </section>
  );
};
<Text>{lorem.generateWords(42)}</Text>;
