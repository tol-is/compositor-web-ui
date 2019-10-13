import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { css, cx } from 'emotion';
import { LoremIpsum } from 'lorem-ipsum';

import Text from './Text';

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
  padding: 32px 16px 16px 32px;
  min-height: 100vh;
  position: relative;
  background-repeat: repeat;
  background-size: 100% 16px;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 140, 0.1) 8px,
    transparent 8px
  );
`;

let container = css`
  margin: 0 auto;
  max-width: 120vmin;
`;

export default () => {
  return (
    <section className={grid}>
      <div className={container}>
        <div
          className={css`
            margin-bottom: 32px;
          `}
        >
          <Text size={1} lineGap={1.4}>
            {lorem.generateParagraphs(1)}
          </Text>
        </div>
        <div
          className={css`
            margin-bottom: 32px;
          `}
        >
          <Text size={2} lineGap={1.5}>
            {lorem.generateParagraphs(2)}
          </Text>
        </div>

        <div
          className={css`
            height: 48px;
            min-width: 120px;
            background-color: black;
            color: white;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0 16px 0 16px;
          `}
        >
          <Text size={3} lineGap={1}>
            P{lorem.generateWords(1)}
          </Text>
        </div>
      </div>
    </section>
  );
};
