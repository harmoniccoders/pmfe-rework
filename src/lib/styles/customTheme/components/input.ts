import type { DeepPartial, Theme } from '@chakra-ui/react';

const Input: DeepPartial<Theme['components']['Input']> = {
  variants: {
    outline: {
      field: {
        borderRadius: '4px',
        background: 'white',
        boxSizing: 'border-box',
        height: '3rem',
        borderColor: 'brand.50',
        border: '1px solid',
        // boxShadow: '0px 0px 9px rgba(0, 127, 130, 0.37)',
        _focus: {
          borderColor: 'brand.200',
          border: '1px solid',
        },
        _placeholder: {
          fontSize: '.8rem',
        },
        _valid: {
          backgroundColor: 'red',
        },
      },
    },
    filled: {
      field: {
        borderRadius: '5px',
        background: 'rgba(0, 127, 130, 0.2)',
        boxSizing: 'border-box',
        height: '4rem',
        border: 'none',
        _focus: {
          borderColor: 'brand.200',
          border: '1px solid',
          background: 'rgba(0, 127, 130, 0.2)',
        },
        _placeholder: {
          fontSize: '.8rem',
        },
      },
    },
  },
};

export default Input;
