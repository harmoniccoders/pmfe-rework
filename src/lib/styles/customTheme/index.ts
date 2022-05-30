import { extendTheme } from '@chakra-ui/react';

import colors from './colors';
import Button from './components/button';
import fonts from './fonts';
import Input from './components/input';
import Textarea from './components/textarea';

const customTheme = extendTheme({
  fonts,
  colors,
  components: {
    Button,
    Input,
    Textarea,
  },
});

export default customTheme;
