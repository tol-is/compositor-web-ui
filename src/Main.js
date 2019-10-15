import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { css, cx } from 'emotion';
import { LoremIpsum } from 'lorem-ipsum';

import Text from './Text';
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
    rgba(0, 0, 140, 0.09) 8px,
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
        <div
          className={css`
            background-color: rgba(0, 0, 0, 0.2);
          `}
        >
          <Text size={70} leading={1} measure={90} flow={0}>
            {lorem.generateWords(98)}
          </Text>
        </div>
        <div
          className={css`
            background-color: rgba(0, 120, 0, 0.2);
          `}
        >
          <Text size={16} leading={4} flow={8} measure={70}>
            {lorem.generateWords(98)}
          </Text>
        </div>
        <div
          className={css`
            background-color: rgba(120, 0, 0, 0.2);
          `}
        >
          <Text size={48} leading={12} measure={70}>
            {lorem.generateWords(12)}
          </Text>
        </div>
        <div>
          <BlackBox>
            <Text size={16} leading={0} measure={70}>
              {lorem.generateWords(2)}
            </Text>
          </BlackBox>
        </div>
      </div>
    </section>
  );
};
