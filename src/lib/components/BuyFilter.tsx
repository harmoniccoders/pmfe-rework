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
  HStack,
} from '@chakra-ui/react';
import Icons from 'lib/components/Icons';
import { Dispatch, SetStateAction } from 'react';
import Counter from '../styles/customTheme/components/Counter';

type Props = {
  search: (e: any) => void;
  term: any;
  clear: () => void;
  word: string;
  bed: Dispatch<SetStateAction<number>>;
  bath: Dispatch<SetStateAction<number>>;
  bedCount: number;
  bathCount: number;
};

const iconStyle = {
  fontSize: '35px',
};

const BuyFilter = ({
  search,
  term,
  clear,
  word,
  bed,
  bath,
  bedCount,
  bathCount,
}: Props) => {
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

      <Counter
        room="bedroom"
        bed={bed}
        bath={bath}
        count={bedCount}
        bathCount={bathCount}
      />
      <Counter
        room="bathroom"
        bed={bed}
        bath={bath}
        count={bedCount}
        bathCount={bathCount}
      />
      <HStack spacing={4} w="full">
        <Button
          variant="outline"
          height="40px"
          width="full"
          color="rgb(37,36,39)"
        >
          Clear Filters
        </Button>
        <Button variant="solid" height="40px" width="full">
          Apply Filters
        </Button>
      </HStack>
    </VStack>
  );
};

export default BuyFilter;
