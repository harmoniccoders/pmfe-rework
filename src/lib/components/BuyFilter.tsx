import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Tag,
  Button,
  Text,
  Grid,
  GridItem,
  VStack,
  Image,
} from '@chakra-ui/react';
import Icons from 'lib/components/Icons';
import NumberCounter from 'lib/Utils/NumberCounter';
import Counter from '../styles/customTheme/components/Counter';

type Props = {};

const iconStyle = {
  fontSize: '35px',
};

const BuyFilter = (props: Props) => {
  return (
    <VStack w="full" pb="1rem" align="flex-start" spacing={5}>
      <Box w="full">
        <InputGroup alignItems="center">
          <Input
            type="text"
            placeholder="Search"
            height="40px"
            _placeholder={{
              fontSize: '14px',
              fontWeight: 600,
            }}
            _focus={{
              outline: 'none',
            }}
          />
          <InputLeftElement>
            <Icons iconClass="fa-search" />
          </InputLeftElement>
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

      {/* <NumberCounter
        valueName="numberOfBedrooms"
        setValue={setValue}
        getValues={getValues}
        label="Number of Bedrooms"
      />
      <NumberCounter
        valueName="numberOfBathrooms"
        setValue={setValue}
        getValues={getValues}
        label="Number of Bathrooms"
      /> */}
      <Flex w="100%" justify="space-between" mt="2rem !important">
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
