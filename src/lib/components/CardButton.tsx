import { HStack, Image, Text, VStack } from "@chakra-ui/react";

type Props = {
  img: string;
  title: string;
  text: string;
  onClick?: any;
};

const CardButton = ({ img, title, text, onClick }: Props) => {
  return (
    <HStack
      cursor="pointer"
      border="1px solid"
      borderColor="gray.300"
      py='6'
      px="4"
      spacing="4"
      rounded="md"
      onClick={onClick}
    >
      <Image w="40px" src={img} alt={title} />
      <VStack align="start" spacing="1">
        <Text fontWeight="600" color="brand.100" fontSize="sm">
          {title}
        </Text>
        <Text fontWeight="100" fontSize="xs">
          {text}
        </Text>
      </VStack>
    </HStack>
  );
};

export default CardButton