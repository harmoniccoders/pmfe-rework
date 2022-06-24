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

interface VerifyProps {
  isOpen: boolean;
  onClose: () => void;
  
}
const VerifyModal = ({ isOpen, onClose }: VerifyProps) => {

  return (
    <Modal
      isOpen={isOpen}
      size="lg"
      onClose={onClose}
      motionPreset="slideInBottom"
      isCentered
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />

      <ModalContent
        py={5}
        borderRadius="0"
        w={['full', '80%']}
        overflow="hidden"
        maxH="100vh"
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
          <Box h={['100vh', 'auto']} py="3" overflowY="auto">
            <Text fontWeight="600" color="black" fontSize="14">
              Choose an option to continue
            </Text>
            <VStack spacing="5" mt="8">
              <Button
                
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
              </Button>
            </VStack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default VerifyModal;
