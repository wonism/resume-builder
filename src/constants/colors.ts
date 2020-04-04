import { theme } from '@chakra-ui/core';

const lightColors = {
  ...theme,
  colors: {
    ...theme.colors,
    black: '#2d2f34',
    white: '#fff',
  },
};

const darkColors = {
  ...theme,
  colors: {
    ...theme.colors,
    black: '#fff',
    white: '#2d2f34',
  },
};

export { lightColors, darkColors };
