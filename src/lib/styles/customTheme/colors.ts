import type { DeepPartial, Theme } from '@chakra-ui/react';

/** extend additional color here */
const extendedColors: DeepPartial<
  Record<string, Theme['colors']['blackAlpha']>
> = {
  brand: {
    50: '#DCE1E7',
    100: '#0042ff',
    200: 'white',
    300: '#0042FF',
    400: 'rgba(5, 156, 159, 0.36)',
    500: '#191919',
    600: '#FFC82C',
    700: '#EEFFF6',
    800: '#FF101F',
    900: '#252427',
  },
};

// green for the enquiries page completed state #2FDF84

/** override chakra colors here */
const overridenChakraColors: DeepPartial<Theme['colors']> = {};

const colors = {
  ...overridenChakraColors,
  ...extendedColors,
};

export default colors;
