import {
  Box,
  Button,
  Heading,
  HStack,
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
    <HStack spacing="5" boxShadow="0 2px 10px 0 rgba(0,0,0,0.16)" p="4" rounded="md">
      <Box>
        <Image src={img} alt={title} maxW="240px" />
      </Box>
      <VStack spacing="3" align="start">
        <Heading fontSize="xl">{title}</Heading>
        <Text fontSize="14">{text}</Text>
        <Button
          variant="outline"
          fontSize="14"
          w="full"
          colorScheme="blue"
          color="gray"
        >
          {button}
        </Button>
      </VStack>
    </HStack>
  );
};

export default Service;
