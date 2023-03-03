import { Button } from '@chakra-ui/react';

interface Props {
  content: string;
  isValid?: boolean;
  loading?: boolean;
}

const ButtonComponent = ({ content, isValid, loading }: Props) => {
  // console.log({ isValid });
  return (
    <Button
      type="submit"
      w="100%"
      h="50px"
      my="25px"
      variant="solid"
      textTransform="capitalize"
      disabled={isValid ? false : true}
      isLoading={loading}
    >
      {content}
    </Button>
  );
};

export default ButtonComponent;
