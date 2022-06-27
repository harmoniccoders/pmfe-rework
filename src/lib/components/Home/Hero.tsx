import {
  Input,
  InputGroup,
  Text,
  VStack,
  InputRightElement,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { BsSearch } from 'react-icons/bs';

interface heroProps {
  searchTerm: string;
  setSearchTerm: any;
  setIsSearched: any;
}
const Hero = ({ setSearchTerm, searchTerm, setIsSearched }: heroProps) => {
  const router = useRouter();

  const getSearchedResult = () => {
    router.push({
      query: {
        search: searchTerm,
      },
    });
    setIsSearched(true);
  };
  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      getSearchedResult();
    }
  };
  return (
    <VStack
      minH="400px"
      backgroundImage='url("/assets/hero.jpg")'
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      spacing="5"
      justify="center"
    >
      <Text
        color="white"
        fontSize="2xl"
        fontWeight="800"
        textShadow="1px 2px 1px #000000"
      >
        Find property to rent or buy
      </Text>
      <InputGroup w={{ base: '90%', md: '70%', lg: '50%' }} shadow="md">
        <Input
          type="text"
          border="none"
          _placeholder={{ fontSize: 'md' }}
          placeholder="Enter an address, state, neighbourhood or area"
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <InputRightElement
          onClick={getSearchedResult}
          children={<BsSearch color="blue" />}
        />
      </InputGroup>
    </VStack>
  );
};
export default Hero;
