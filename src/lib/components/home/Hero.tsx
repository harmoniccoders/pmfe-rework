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
      <Text color="white" fontSize="2xl" textShadow="1px 2px 1px #000000">
        FInd property to rent or buy
      </Text>
      <InputGroup w={{ base: '90%',md: '70%', lg:'50%'}} shadow="md">
        <Input
          type="text"
          border="none"
          _placeholder={{ fontSize: "md" }}
          placeholder="Enter an address, state, neighbourhood or area"
        />
        <InputRightElement children={<BsSearch color="blue" />} />
      </InputGroup>
    </VStack>
  );
};
export default Hero;
