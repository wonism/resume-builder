import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { Flex, Heading, Icon, Link as ChakraLink } from '@chakra-ui/core';

const Link = ChakraLink as any;

const Header = () => (
  <Flex
    as="header"
    pos="fixed"
    bg="blue"
    top={0}
    right={0}
    left={0}
    px={5}
    py={4}
    zIndex={5}
    w="full"
    h="4rem"
    justifyContent="space-between"
    alignItems="center"
    borderBottomWidth="1px"
  >
    <Link as={GatsbyLink} to="/">
      <Heading fontSize="lg" as="h1">
        <Icon name="edit" mr={1} />
        Resume Builder
      </Heading>
    </Link>
  </Flex>
);

export default Header;
