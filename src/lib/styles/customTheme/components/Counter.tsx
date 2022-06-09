import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  room: string;
  bed: Dispatch<SetStateAction<number>>;
  count: number;
  bath: Dispatch<SetStateAction<number>>;
  bathCount: number;
};

const Counter = ({ room, bed, count, bath, bathCount }: Props) => {


  return (
    <>
      {room === 'bedroom' ? (
        <Box
          w="100%"
          bg="#FCFCFC"
          margin="30px 0 10px"
          py="20px"
          borderRadius="5px"
        >
          <Text textAlign="center" textTransform="capitalize">
            {room}
          </Text>

          <Flex
            w={['80%', '90%']}
            mx="auto"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button
              width="40px"
              height="40px"
              variant="solid"
              borderRadius="50%"
              fontSize="20px"
              disabled={count === 0}
              onClick={() => bed((count) => Math.max(count - 1, 0))}
            >
              -
            </Button>

            <Text
              border="1px solid black"
              w="120px"
              mx="auto"
              h="40px"
              borderRadius="8px"
              fontSize="20px"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {count}
            </Text>

            <Button
              width="40px"
              height="40px"
              variant="solid"
              borderRadius="50%"
              fontSize="20px"
              onClick={() => bed(count + 1)}
            >
              +
            </Button>
          </Flex>
        </Box>
      ) : (
        <Box
          w="100%"
          bg="#FCFCFC"
          margin="30px 0 10px"
          py="20px"
          borderRadius="5px"
        >
          <Text textAlign="center" textTransform="capitalize">
            {room}
          </Text>

          <Flex
            w={['80%', '90%']}
            mx="auto"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button
              width="40px"
              height="40px"
              variant="solid"
              borderRadius="50%"
              fontSize="20px"
              disabled={bathCount === 0 }
              onClick={() => bath((bathCount) => Math.max(bathCount - 1, 0))}
            >
              -
            </Button>

            <Text
              border="1px solid black"
              w="120px"
              mx="auto"
              h="40px"
              borderRadius="8px"
              fontSize="20px"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {bathCount}
            </Text>

            <Button
              width="40px"
              height="40px"
              variant="solid"
              borderRadius="50%"
              fontSize="20px"
              onClick={() => bath(bathCount + 1)}
            >
              +
            </Button>
          </Flex>
        </Box>
      )}
    </>
  );
};

export default Counter;
