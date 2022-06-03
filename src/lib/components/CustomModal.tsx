import { Box, IconButton, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { FaTimes } from 'react-icons/fa';

type Props = {
  component: ReactNode;
  isOpen: boolean;
  onClose: any;
};

const CustomModal = ({ component, isOpen, onClose }: Props) => {
  return (
    <Box
      display={isOpen ? 'block' : 'none'}
      pos="fixed"
      zIndex={50}
      top="0"
      left="0"
      w="full"
      bg="blackAlpha.500"
      h="100vh"
    >
      <Box
        bg="white"
        w="550px"
        p="5"
        shadow="lg"
        overflowY="auto"
        maxW="full"
        mx="auto"
        h="full"
      >
        <Box textAlign="end">
          <IconButton
            onClick={onClose}
            variant="ghost"
            p="0"
            icon={<FaTimes />}
            aria-label="closeModal"
          />
        </Box>
        {component}
      </Box>
    </Box>
  );
};

export default CustomModal;
