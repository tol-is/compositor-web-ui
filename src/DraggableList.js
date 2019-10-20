import React, {
  Fragment,
  useContext,
  useEffect,
  useState,
  useRef
} from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { css, cx } from 'emotion';
import { findIndex } from './find-index';
import move from 'array-move';

import { LoremIpsum } from 'lorem-ipsum';

import Context from './Context';
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

const Item = ({ setPosition, moveItem, i, children }) => {
  const [isDragging, setDragging] = useState(false);

  // We'll use a `ref` to access the DOM element that the `motion.li` produces.
  // This will allow us to measure its height and position, which will be useful to
  // decide when a dragging element should switch places with its siblings.
  const ref = useRef(null);

  // By manually creating a reference to `dragOriginY` we can manipulate this value
  // if the user is dragging this DOM element while the drag gesture is active to
  // compensate for any movement as the items are re-positioned.
  const dragOriginY = useMotionValue(0);

  // Update the measured position of the item so we can calculate when we should rearrange.
  useEffect(() => {
    setPosition(i, {
      height: ref.current.offsetHeight,
      top: ref.current.offsetTop
    });
  });

  return (
    <Fragment>
      <motion.li
        ref={ref}
        initial={false}
        animate={isDragging ? onTop : flat}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 1.03 }}
        drag="y"
        dragOriginY={dragOriginY}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={1}
        onDragStart={() => setDragging(true)}
        onDragEnd={() => setDragging(false)}
        onDrag={(e, { point }) => moveItem(i, point.y)}
        positionTransition={({ delta }) => {
          if (isDragging) {
            // If we're dragging, we want to "undo" the items movement within the list
            // by manipulating its dragOriginY. This will keep the item under the cursor,
            // even though it's jumping around the DOM.
            dragOriginY.set(dragOriginY.get() + delta.y);
          }

          // If `positionTransition` is a function and returns `false`, it's telling
          // Motion not to animate from its old position into its new one. If we're
          // dragging, we don't want any animation to occur.
          return !isDragging;
        }}
      >
        {children}
      </motion.li>
    </Fragment>
  );
};

export const DraggableList = ({ initialData, children }) => {
  const [data, setData] = useState(initialData);

  let list = css`
    margin: 0;
    padding: 0;
    text-indent: 0;
    list-style: none;
  `;

  // We need to collect an array of height and position data for all of this component's
  // `Item` children, so we can later us that in calculations to decide when a dragging
  // `Item` should swap places with its siblings.
  const positions = useRef([]).current;
  const setPosition = (i, offset) => (positions[i] = offset);

  // Find the ideal index for a dragging item based on its position in the array, and its
  // current drag offset. If it's different to its current index, we swap this item with that
  // sibling.
  const moveItem = (i, dragOffset) => {
    const targetIndex = findIndex(i, dragOffset, positions);
    if (targetIndex !== i) setData(move(data, i, targetIndex));
  };

  return (
    <section className={grid}>
      <div className={container}>
        <ul className={list}>
          {data.map((d, i) => {
            const { size, leading, flow, measure, text } = d;
            return (
              <Item
                key={d.text}
                i={i}
                {...data}
                setPosition={setPosition}
                moveItem={moveItem}
              >
                yay
              </Item>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

// Spring configs
const onTop = { zIndex: 1 };
const flat = {
  zIndex: 0,
  transition: { delay: 0.3 }
};

export default Main;

const initialData = [
  {
    size: 57,
    leading: -15,
    flow: 4,
    measure: 16,
    text: lorem.generateWords(12).toUpperCase()
  },
  {
    size: 57,
    leading: -15,
    flow: 4,
    measure: 16,
    text: 'MORE'
  },
  {
    size: 20,
    leading: 1,
    flow: 4,
    measure: 50,
    text: lorem.generateWords(26).toUpperCase()
  }
];
