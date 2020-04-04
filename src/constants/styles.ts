import { css } from '@emotion/core';

import { lightColors, darkColors } from './colors';

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

export const buttonIcon = css`
  svg {
    margin: auto;
    font-size: 0.875rem;
  }
`;

export const lightBody = css`
  body {
    background-color: ${lightColors.colors.white};
  }
`;

export const darkBody = css`
  body {
    background-color: ${darkColors.colors.white};
  }
`;

export const globalStyle = css`
  &[disabled] {
    cursor: not-allowed;
  }

  select[disabled] {
    opacity: 0.4;

    & + div {
      opacity: 0.4;
    }
  }

  .sr-only {
    position: absolute;
    margin: -1px;
    padding: 0;
    width: 1px;
    height: 1px;
    clip: rect(0, 0, 0, 0);
    border: 0;
    overflow: hidden;
  }

  .scroll-lock {
    @media screen and (min-width: 30em) {
      overflow-y: hidden;
    }
  }

  ${lightBody}
  ${darkBody}
`;
