import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Tag,
  Button,
  Text,
} from '@chakra-ui/react';
import Icons from 'lib/components/Icons';
import Counter from './Counter';

type Props = {};

const iconStyle = {
  fontSize: '35px',
};

const BuyFilter = (props: Props) => {
  return (
    <Box pr={[0, '20px']} w={['100%', '50%', '30%']}>
      <Box>
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

      <Flex w="100%" gap={3} mt="20px">
        <Button
          variant="outline"
          width="100px"
          height="30px"
          fontSize="14px"
          textTransform="capitalize"
          color="blackAlpha.500"
        >
          residential
        </Button>

        <Button
          variant="outline"
          width="110px"
          height="30px"
          fontSize="14px"
          textTransform="capitalize"
          color="blackAlpha.500"
        >
          commercial
        </Button>

        <Button
          variant="outline"
          width="100px"
          height="30px"
          fontSize="14px"
          textTransform="capitalize"
          color="blackAlpha.500"
        >
          mixed
        </Button>
      </Flex>

      <Flex w="100%" justifyContent="space-between" gap={[0, 0, 2]} mt="20px">
        <Box width="65px">
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
        </Box>

        <Box w="65px">
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
        </Box>

        <Box w="65px">
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
        </Box>

        <Box w="65px">
          <Tag
            variant="outline"
            width="65px"
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
        </Box>
      </Flex>

      <Counter room="bedroom" />
      <Counter room="bathroom" />

      <Flex w="100%" mt="20px" gap={3}>
        {/* <ButtonGroup> */}
        <Button
          variant="outline"
          textTransform="capitalize"
          width="150px"
          height="40px"
          color="#252427"
        >
          Clear filters
        </Button>
        <Button
          variant="solid"
          textTransform="capitalize"
          width="150px"
          height="40px"
        >
          apply filters
        </Button>
        {/* </ButtonGroup> */}
      </Flex>
    </Box>
  );
};

export default BuyFilter;
