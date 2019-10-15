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
    rgba(0, 0, 140, 0.05) 8px,
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
      <div className={container}>
        <Text size={20} leading="4">
          {lorem.generateWords(2)}
        </Text>
        <Text size={20}>{lorem.generateWords(2)}</Text>
      </div>
    </section>
  );
};

// import { h } from 'preact';
// import Box from './Box';

// const debug = true;

// import useBraidStyle from './useBraidStyle.v1';

// export default props => {
//   const braidStyle = useBraidStyle({
//     fontSize: props.size,
//     leading: props.leading,
//     flow: props.flow,
//     measure: props.measure
//   });
//   return debug ? (
//     <Box>
//       <span className={braidStyle} {...props} />
//     </Box>
//   ) : (
//     <span className={braidStyle} {...props} />
//   );
// };
