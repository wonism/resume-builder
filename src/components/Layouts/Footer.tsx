import React from 'react';
import { Box, Text } from '@chakra-ui/core';

const Footer = () => (
  <Box as="footer" fontSize="sm" borderTopWidth="1px" color="black" bg="white">
    <Text opacity={0.6} textAlign="center" py={5} lineHeight="1.25rem">
      Copyright &copy; 2020 @wonism
    </Text>
  </Box>
);

export default Footer;
