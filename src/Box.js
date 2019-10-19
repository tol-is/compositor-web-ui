import { h } from 'preact';
import { useMemo } from 'preact/hooks';
import { css } from 'emotion';

function getRandomColor() {
  var letters = '0ABCD';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 5)];
  }
  return color;
}

export default ({ children }) => {
  const bg = useMemo(() => {
    return getRandomColor();
  });
  return (
    <div
      className={css`
        position: relative;
        display: inline-block;
        width: auto;
        &:after {
          top: 0;
          left: 0;
          content: '';
          width: 100%;
          height: 100%;
          position: absolute;
          z-index: 10;
          opacity: 0.45;
          background-color: ${bg};
        }
      `}
    >
      {children}
    </div>
  );
};
