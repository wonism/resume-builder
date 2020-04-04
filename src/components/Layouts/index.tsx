import React from 'react';
import { PageRendererProps } from 'gatsby';
import { Box } from '@chakra-ui/core';

import Theme from './Theme';
import Header from './Header';
import Footer from './Footer';

interface Props {
  element: React.ReactNode;
  props: PageRendererProps;
}

const Layouts = ({ element, props }: Props) => (
  <React.StrictMode>
    <Theme>
      <Header />
      <Box
        as="main"
        bg="white"
        mt="4rem"
        pt="1rem"
        pb="1rem"
        minH={['auto', 'calc(100vh - 7.75rem)']}
        d="flex"
        alignItems="center"
        justifyContent="center"
      >
        {element}
      </Box>
      <Footer />
    </Theme>
  </React.StrictMode>
);

export default Layouts;
