import React from 'react';
import { Box, Text } from '@chakra-ui/core';

const Footer = () => (
  <Box as="footer" opacity={0.6} fontSize="sm" borderTopWidth="1px">
    <Text textAlign="center" mt={5} mb={5} lineHeight="1.25rem">
      Copyright &copy; 2020 @wonism
    </Text>
  </Box>
);

export default Footer;
