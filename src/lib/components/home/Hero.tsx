import {
  Box,
  Input,
  InputGroup,
  Text,
  VStack,
  InputRightElement,
} from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';
const Hero = () => {
  return (
    <VStack
      minH="400px"
      backgroundImage='url("/hero.jpg")'
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      spacing="5"
      justify="center"
    >
      <Text
        color="white"
        fontSize="20"
        // textShadow="0 2px 11px 0 rgba(0,0,0,0.65)"
        textShadow="xl"
      >
        FInd property to rent or buy
      </Text>
      <InputGroup w="70%">
        <Input
          type="text"
          border="none"
          placeholder="Enter an address, state, neighbourhood or area"
        />
        <InputRightElement children={<BsSearch color="blue" />} />
      </InputGroup>
    </VStack>
  );
};
export default Hero;
