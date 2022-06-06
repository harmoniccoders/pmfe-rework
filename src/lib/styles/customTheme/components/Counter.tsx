import { Box, Button, ButtonGroup, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';

type Props = {
  room: string;
};

const Counter = ({ room }: Props) => {
  const [count, setCount] = useState<number>(0);

  const addCount = (): any => {
    setCount(count + 1);
  };

  const subtractCount = (): any => {
    let reduceCount = count - 1 < 0 ? 0 : count - 1;
    setCount(reduceCount);
  };

  return (
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
          onClick={subtractCount}
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
          onClick={addCount}
        >
          +
        </Button>
      </Flex>
    </Box>
  );
};

export default Counter;
