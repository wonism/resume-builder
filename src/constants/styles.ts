import { css } from '@emotion/core';

export const visuallyHidden = css`
  position: absolute;
  padding: 0;
  width: 1px;
  height: 1px;
  border: 0;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
  appearance: none;
`;
