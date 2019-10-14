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
  padding: 64px 16px 16px 56px;
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
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

export default () => {
  return (
    <section className={grid}>
      <div className={container}>
        <Text size={64} leading={3} measure={18} flow={8}>
          {lorem.generateSentences(1).toUpperCase()}
        </Text>

        <Text size={22} leading={3} flow={0} measure={60} flow={8}>
          {lorem.generateParagraphs(2)}
        </Text>

        <div>
          <div
            className={css`
              height: 64px;
              min-width: 180px;
              background-color: black;
              color: white;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              padding: 0 16px 0 16px;
            `}
          >
            <Text size={16}>{lorem.generateWords(1).toUpperCase()}</Text>
          </div>
        </div>
      </div>
    </section>
  );
};
