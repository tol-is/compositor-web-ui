import React, { useContext } from 'react';
import { css, cx } from 'emotion';
import { LoremIpsum } from 'lorem-ipsum';
import { uuid, rand } from './utils';

import Context from './Context';
import Text from './TextEditable';

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

  console.log(data);

  return (
    <section className={grid}>
      <div className={container}>
        {data.map((d, i) => {
          const { uuid, size, leading, flow, measure, text } = d;
          return (
            <Text
              key={uuid}
              size={size}
              leading={leading}
              flow={flow}
              measure={measure}
              text={text}
            />
          );
        })}
      </div>
    </section>
  );
};

const data = [
  {
    id: uuid(),
    size: 120,
    leading: 0,
    flow: 2,
    text: 'MO'
  },
  {
    id: uuid(),
    size: 48,
    leading: 0,
    flow: 2,
    text: lorem.generateWords(1).toUpperCase()
  },
  {
    id: uuid(),
    size: 70,
    leading: 2,
    flow: 2,
    text: lorem.generateWords(22).toUpperCase()
  }
];
