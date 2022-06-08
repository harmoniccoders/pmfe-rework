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
import { FaTimes } from 'react-icons/fa';

interface RentoutProps {
  isOpen: boolean;
  onClose: () => void;
  openModal: () => void;
}
const RentoutModal = ({ isOpen, onClose, openModal }: RentoutProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      isCentered
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />

      <ModalContent
        py={5}
        borderRadius="0"
        w={['88%', '80%']}
        overflow="hidden"
        maxH="100vh"
        maxW="40%"
        pos="fixed"
        mt="1rem"
        mb="1rem"
      >
        <ModalHeader>
          <Flex
            justifyContent="flex-end"
            alignItems="center"
            cursor="pointer"
            fontSize="sm"
            onClick={onClose}
          >
            <FaTimes />
          </Flex>
        </ModalHeader>

        <ModalBody>
          <Box h="100vh" overflowY="auto">
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
              >
                Get help listing property
              </Button>
            </VStack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default RentoutModal;
