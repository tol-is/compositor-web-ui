import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { css } from 'emotion';

import RandoBox from './RandoBox';

export default ({ fontSize, lineHeight, measure = 999, ...props }) => {
  const badStyle = css`
    display: inline-block;
    max-width: ${measure}ch;
    font-family: 'MarkOT';
    font-size: ${fontSize}px;
    line-height: ${lineHeight};
  `;

  const { debug } = useContext(Context);

  return debug ? (
    <RandoBox>
      <span className={badStyle} {...props} />
    </RandoBox>
  ) : (
    <span className={badStyle} {...props} />
  );
};
