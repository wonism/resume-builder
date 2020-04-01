import React from 'react';
import { PageRendererProps } from 'gatsby';
import { ThemeProvider, CSSReset, Box } from '@chakra-ui/core';
import { Global, css } from '@emotion/core';

import Header from './Header';
import Footer from './Footer';

const globalStyle = css`
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
    overflow-y: hidden;
  }
`;

interface Props {
  element: React.ReactNode;
  props: PageRendererProps;
}

const Layouts = ({ element, props }: Props) => (
  <React.StrictMode>
    <ThemeProvider>
      <CSSReset />
      <Global styles={globalStyle} />
      <Header />
      <Box as="main" mt="4rem" pt="1rem" pb="1rem" minH="calc(100vh - 7.75rem)" d="flex" alignItems="center" justifyContent="center">
        {element}
      </Box>
      <Footer />
    </ThemeProvider>
  </React.StrictMode>
);

export default Layouts;
