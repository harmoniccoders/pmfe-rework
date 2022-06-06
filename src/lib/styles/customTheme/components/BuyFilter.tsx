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
} from '@chakra-ui/react';
import Icons from 'lib/components/Icons';
import Counter from './Counter';

type Props = {};

const iconStyle = {
  fontSize: '35px',
};

const BuyFilter = (props: Props) => {
  return (
    // <Box w="full">
    //   <Box>
    //     <InputGroup alignItems="center">
    //       <Input
    //         type="text"
    //         placeholder="Search"
    //         height="40px"
    //         _placeholder={{
    //           fontSize: '14px',
    //           fontWeight: 600,
    //         }}
    //         _focus={{
    //           outline: 'none',
    //         }}
    //       />
    //       <InputLeftElement>
    //         <Icons iconClass="fa-search" />
    //       </InputLeftElement>
    //     </InputGroup>
    //   </Box>

    //   <Flex w="100%" mt="20px" justify="space-between">
    //     <Button
    //       variant="outline"
    //       px="1rem"
    //       height="30px"
    //       fontSize="14px"
    //       textTransform="capitalize"
    //       color="blackAlpha.500"
    //     >
    //       residential
    //     </Button>

    //     <Button
    //       variant="outline"
    //       px="1rem"
    //       height="30px"
    //       fontSize="14px"
    //       textTransform="capitalize"
    //       color="blackAlpha.500"
    //     >
    //       commercial
    //     </Button>

    //     <Button
    //       variant="outline"
    //       px="1rem"
    //       height="30px"
    //       fontSize="14px"
    //       textTransform="capitalize"
    //       color="blackAlpha.500"
    //     >
    //       mixed
    //     </Button>
    //   </Flex>

    //   <Flex w="100%" justifyContent="space-between" gap={[0, 0, 2]} mt="20px">
    //     <Box width="65px">
    //       <Tag
    //         variant="outline"
    //         width="100%"
    //         height="70px"
    //         display="flex"
    //         justifyContent="center"
    //       >
    //         <Icons iconClass="fa-building" style={iconStyle} />
    //       </Tag>

    //       <Text
    //         fontSize="12px"
    //         fontWeight={600}
    //         textTransform="capitalize"
    //         textAlign="center"
    //         pt="3px"
    //       >
    //         bungalow
    //       </Text>
    //     </Box>

    //     <Box w="65px">
    //       <Tag
    //         variant="outline"
    //         width="100%"
    //         height="70px"
    //         display="flex"
    //         justifyContent="center"
    //       >
    //         <Icons iconClass="fa-building" style={iconStyle} />
    //       </Tag>

    //       <Text
    //         fontSize="12px"
    //         fontWeight={600}
    //         textTransform="capitalize"
    //         textAlign="center"
    //         pt="3px"
    //       >
    //         flat
    //       </Text>
    //     </Box>

    //     <Box w="65px">
    //       <Tag
    //         variant="outline"
    //         width="100%"
    //         height="70px"
    //         display="flex"
    //         justifyContent="center"
    //       >
    //         <Icons iconClass="fa-building" style={iconStyle} />
    //       </Tag>

    //       <Text
    //         fontSize="12px"
    //         fontWeight={600}
    //         textTransform="capitalize"
    //         textAlign="center"
    //         pt="3px"
    //       >
    //         bungalow
    //       </Text>
    //     </Box>

    //     <Box w="65px">
    //       <Tag
    //         variant="outline"
    //         width="65px"
    //         height="70px"
    //         display="flex"
    //         justifyContent="center"
    //       >
    //         <Icons iconClass="fa-building" style={iconStyle} />
    //       </Tag>

    //       <Text
    //         fontSize="12px"
    //         fontWeight={600}
    //         textTransform="capitalize"
    //         textAlign="center"
    //         pt="3px"
    //       >
    //         terrace
    //       </Text>
    //     </Box>
    //   </Flex>

    //   <Counter room="bedroom" />
    //   <Counter room="bathroom" />

    //   <Flex w="100%" mt="20px" gap={3}>
    //     {/* <ButtonGroup> */}
    //     <Button
    //       variant="outline"
    //       textTransform="capitalize"
    //       width="150px"
    //       height="40px"
    //       color="#252427"
    //     >
    //       Clear filters
    //     </Button>
    //     <Button
    //       variant="solid"
    //       textTransform="capitalize"
    //       width="150px"
    //       height="40px"
    //     >
    //       apply filters
    //     </Button>
    //     {/* </ButtonGroup> */}
    //   </Flex>
    // </Box>
    <VStack w="full" py="1rem" align="flex-start" spacing={5}>
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
      <Flex w="100%" justify="space-between">
        <Button
          variant="outline"
          px="1rem"
          w="fit-content"
          height="30px"
          fontSize="14px"
          textTransform="capitalize"
          color="blackAlpha.500"
        >
          residential
        </Button>

        <Button
          variant="outline"
          px="1rem"
          w="fit-content"
          height="30px"
          fontSize="14px"
          textTransform="capitalize"
          color="blackAlpha.500"
        >
          commercial
        </Button>

        <Button
          variant="outline"
          px="1rem"
          height="30px"
          w="fit-content"
          fontSize="14px"
          textTransform="capitalize"
          color="blackAlpha.500"
        >
          mixed
        </Button>
      </Flex>
      <Grid
        templateColumns="repeat(4,1fr)"
        gap={5}
        w="full"
        mt="2rem !important"
        mb="1rem"
      >
        <GridItem width="full">
          <Tag
            variant="outline"
            width="100%"
            height="70px"
            display="flex"
            justifyContent="center"
          >
            <Icons iconClass="fa-building" style={iconStyle} />
          </Tag>

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
          <Tag
            variant="outline"
            width="100%"
            height="70px"
            display="flex"
            justifyContent="center"
          >
            <Icons iconClass="fa-building" style={iconStyle} />
          </Tag>

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
          <Tag
            variant="outline"
            width="100%"
            height="70px"
            display="flex"
            justifyContent="center"
          >
            <Icons iconClass="fa-building" style={iconStyle} />
          </Tag>

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
          <Tag
            variant="outline"
            width="100%"
            height="70px"
            display="flex"
            justifyContent="center"
          >
            <Icons iconClass="fa-building" style={iconStyle} />
          </Tag>

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
