import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import Modals from 'lib/Utils/Modals';
import { useRouter } from 'next/router';
import { FaTimes } from 'react-icons/fa';

interface RentoutProps {
  isOpen: boolean;
  onClose: () => void;
  openModal: () => void;
}
const RentoutModal = ({ isOpen, onClose, openModal }: RentoutProps) => {
  const router = useRouter();
  const getHelp = () => {
    router.push('/contact');
  };
  return (
    <Modals
      isOpen={isOpen}
      onClose={onClose}
      pmlogo={true}
      content={
        <>
          <Box h={['100vh', 'auto']} py="3" overflowY="auto">
            <Text fontWeight="600" color="black" fontSize="14">
              Choose an option to continue
            </Text>
            <VStack spacing="5" mt="8">
              <Button
                onClick={openModal}
                variant="outline"
                w="full"
                color="gray.600"
                fontWeight="500"
                fontSize=".9rem"
              >
                List property yourself
              </Button>
              <Button
                variant="outline"
                w="full"
                color="gray.600"
                fontWeight="500"
                fontSize=".9rem"
                onClick={getHelp}
              >
                Get help listing property
              </Button>
            </VStack>
          </Box>
        </>
      }
    />
  );
};
export default RentoutModal;
