import {
  Box,
  Button,
  Heading,
  Stack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';

interface Props {
  title: string;
  img: string;
  button: string;
  text: string;
}

const Service = ({ title, img, button, text }: Props) => {
  return (
    <Stack direction={['column', 'row']}
      spacing="5"
      maxW="550px"
      w="full"
      boxShadow="0 2px 10px 0 rgba(0,0,0,0.16)"
      p="4"
      rounded="md"
    >
      <Box alignSelf="center">
        <Image src={img} alt={title} maxW="240px" w="full" />
      </Box>
      <VStack spacing="3" align="start">
        <Heading fontSize={["xl", '2xl' ]}>{title}</Heading>
        <Text fontSize="sm">{text}</Text>
        <Button
          variant="outline"
          fontSize="14"
          w="full"
          colorScheme="gray"
          color="gray"
        >
          {button}
        </Button>
      </VStack>
    </Stack>
  );
};

export default Service;
