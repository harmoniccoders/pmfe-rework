import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Text,
  Grid,
  GridItem,
  VStack,
  Image,
  InputRightElement,
} from '@chakra-ui/react';
import Icons from 'lib/components/Icons';
import Counter from '../styles/customTheme/components/Counter';

type Props = {
  search: (e: any) => void;
  term: any;
  clear: () => void;
  word: string;
};

const iconStyle = {
  fontSize: '35px',
};

const BuyFilter = ({ search, term, clear, word }: Props) => {
  return (
    <VStack w="full" pb="1rem" align="flex-start" spacing={5}>
      <Box w="full">
        <InputGroup alignItems="center">
          <InputLeftElement>
            <Icons iconClass="fa-search" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search"
            height="40px"
            onChange={(e: { target: { value: any } }) => term(e.target.value)}
            // onChange={(e) => term(e.target.value)}
            onKeyDown={search}
            value={word}
            _placeholder={{
              fontSize: '14px',
              fontWeight: 600,
            }}
            _focus={{
              outline: 'none',
            }}
          />
          {word !== '' && (
            <InputRightElement onClick={clear}>
              <Icons iconClass="fa-times" />
            </InputRightElement>
          )}
        </InputGroup>
      </Box>

      <Grid
        templateColumns="repeat(4,1fr)"
        gap={5}
        w="full"
        mt="2rem !important"
        mb="1rem"
      >
        <GridItem width="full">
          <Flex
            border="2px solid #DCE1E7"
            width="100%"
            height="57px"
            alignItems="flex-end"
            justifyContent="center"
            borderRadius="5px"
          >
            <Image
              width="40px"
              height="40px"
              mx="auto"
              src="/assets/Bungalow.png"
              alt="apartment-image"
              objectFit="contain"
            />
          </Flex>

          <Text
            fontSize="12px"
            fontWeight={600}
            textTransform="capitalize"
            textAlign="center"
            pt="3px"
          >
            bungalow
          </Text>
        </GridItem>

        <GridItem w="full">
          <Flex
            border="2px solid #DCE1E7"
            width="100%"
            height="57px"
            alignItems="center"
            justifyContent="center"
            borderRadius="5px"
          >
            <Image
              width="40px"
              height="40px"
              mx="auto"
              src="/assets/Apartment.png"
              alt="apartment-image"
              objectFit="contain"
            />
          </Flex>

          <Text
            fontSize="12px"
            fontWeight={600}
            textTransform="capitalize"
            textAlign="center"
            pt="3px"
          >
            flat
          </Text>
        </GridItem>

        <GridItem w="full">
          <Flex
            border="2px solid #DCE1E7"
            width="100%"
            height="57px"
            alignItems="center"
            justifyContent="center"
            borderRadius="5px"
          >
            <Image
              width="40px"
              height="40px"
              mx="auto"
              src="/assets/Duplex.png"
              alt="apartment-image"
              objectFit="contain"
            />
          </Flex>

          <Text
            fontSize="12px"
            fontWeight={600}
            textTransform="capitalize"
            textAlign="center"
            pt="3px"
          >
            Duplex
          </Text>
        </GridItem>

        <GridItem w="full">
          <Flex
            border="2px solid #DCE1E7"
            width="100%"
            height="57px"
            alignItems="center"
            justifyContent="center"
            borderRadius="5px"
          >
            <Image
              width="40px"
              height="40px"
              mx="auto"
              src="/assets/Terrace.png"
              alt="apartment-image"
              objectFit="contain"
            />
          </Flex>

          <Text
            fontSize="12px"
            fontWeight={600}
            textTransform="capitalize"
            textAlign="center"
            pt="3px"
          >
            terrace
          </Text>
        </GridItem>
      </Grid>

      <Counter room="bedroom" />
      <Counter room="bathroom" />

      <Flex w="100%" justifyContent="space-between" mt="2rem !important">
        <Button
          variant="outline"
          textTransform="capitalize"
          width="fit-content"
          height="40px"
          px="1.7rem"
          color="#252427"
        >
          Clear filters
        </Button>
        <Button
          variant="solid"
          textTransform="capitalize"
          width="fit-content"
          height="40px"
          px="1.7rem"
        >
          apply filters
        </Button>
      </Flex>
    </VStack>
  );
};

export default BuyFilter;
