import type { DeepPartial, Theme } from '@chakra-ui/react';

const Button: DeepPartial<Theme['components']['Button']> = {
  baseStyle: {
    borderRadius: '5px',
  },
  variants: {
    outline: {
      backgroundColor: 'transparent',
      border: '1px solid #0042ff',
      color: '#0042ff',
      width: '11rem',
      height: '3.12rem',
      _hover: {
        backgroundColor: 'brand.100',
        color: 'white',
        transition: 'all .5s ease',
      },
      _focus: {
        boxShadow: '0',
      },
    },
    solid: {
      // backgroundColor: 'brand.100',
      backgroundColor: 'brand.300',
      color: 'white',
      width: '11rem',
      height: '3.12rem',
      _hover: {
        backgroundColor: 'transparent',
        transition: 'all .5s ease',
        border: '2px solid #0042FF',
        color: 'brand.300',
      },
      _focus: {
        boxShadow: '0',
      },
    },
  },
};

export default Button;
