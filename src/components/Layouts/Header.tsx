import React from 'react';
import useResizeObserver from 'use-resize-observer';
import { Link as GatsbyLink } from 'gatsby';
import { Flex, Heading, Icon, Link as ChakraLink } from '@chakra-ui/core';

const Link = ChakraLink as any;

const observe = {
  onResize: () => {
    window?.scrollTo(0, 0);
  },
};

const Header = () => {
  const { ref } = useResizeObserver(observe);

  return (
    <Flex
      ref={ref}
      as="header"
      pos="fixed"
      bg="white"
      color="black"
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
      <Link href="https://github.com/wonism/resume-builder" rel="noopener noreferrer" target="_blank">
        <svg width="33px" height="33px" viewBox="0 0 33 33" version="1.1" role="img" xmlns="http://www.w3.org/2000/svg">
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g transform="translate(-136.000000, -331.000000)">
              <path fill="currentColor" d="M152.608,331.455 C143.614,331.455 136.32,338.748 136.32,347.745 C136.32,354.942 140.987,361.047 147.46,363.201 C148.275,363.351 148.572,362.848 148.572,362.416 C148.572,362.029 148.558,361.005 148.55,359.646 C144.019,360.63 143.063,357.462 143.063,357.462 C142.322,355.58 141.254,355.079 141.254,355.079 C139.775,354.069 141.366,354.089 141.366,354.089 C143.001,354.204 143.861,355.768 143.861,355.768 C145.314,358.257 147.674,357.538 148.602,357.121 C148.75,356.069 149.171,355.351 149.636,354.944 C146.019,354.533 142.216,353.135 142.216,346.893 C142.216,345.115 142.851,343.66 143.893,342.522 C143.725,342.11 143.166,340.453 144.053,338.211 C144.053,338.211 145.42,337.773 148.532,339.881 C149.831,339.519 151.225,339.339 152.61,339.332 C153.994,339.339 155.387,339.519 156.688,339.881 C159.798,337.773 161.163,338.211 161.163,338.211 C162.052,340.453 161.493,342.11 161.326,342.522 C162.37,343.66 163,345.115 163,346.893 C163,353.151 159.191,354.528 155.563,354.931 C156.147,355.434 156.668,356.428 156.668,357.947 C156.668,360.125 156.648,361.882 156.648,362.416 C156.648,362.852 156.942,363.359 157.768,363.2 C164.236,361.041 168.899,354.94 168.899,347.745 C168.899,338.748 161.605,331.455 152.608,331.455"></path>
            </g>
          </g>
        </svg>
      </Link>
    </Flex>
  );
};

export default Header;
