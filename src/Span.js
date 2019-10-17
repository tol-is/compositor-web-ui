import { h } from 'preact';
import Box from './Box';
import { css } from 'emotion';

const debug = true;

export default ({ fontSize, lineHeight, measure = 999, ...props }) => {
  const badStyle = css`
    display: inline-block;
    max-width: ${measure}ch;
    font-family: 'MarkOT';
    font-size: ${fontSize}px;
    line-height: ${lineHeight};
  `;

  return debug ? (
    <Box>
      <span className={badStyle} {...props} />
    </Box>
  ) : (
    <span className={badStyle} {...props} />
  );
};
