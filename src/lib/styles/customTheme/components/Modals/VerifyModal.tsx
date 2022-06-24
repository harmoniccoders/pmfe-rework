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
import { LandSearchView } from 'types/api/land-search-view';

interface VerifyProps {
  isOpen: boolean;
  onClose: () => void;
  item: LandSearchView;
}
const VerifyModal = ({ isOpen, onClose, item }: VerifyProps) => {
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
          <Flex justifyContent="space-between" alignItems="center">
            <Text
              onClick={onClose}
              display="flex"
              alignItems="center"
              fontSize="14px"
              cursor="pointer"
            >
              <span
                className="fal fa-angle-left"
                style={{ marginRight: '5px' }}
              ></span>
              Back
            </Text>

            
          </Flex>
        </ModalHeader>

        <ModalBody>
          <Box h={['100vh', 'auto']} py="3" overflowY="auto" px="5">
            <VStack align="flex-start" spacing="5" mt="5">
              <Box>
                <Text fontWeight="600" fontSize="17px">
                  Status
                </Text>
                <Text>{item.status}</Text>
              </Box>
              <Box>
                <Text fontWeight="600" fontSize="17px">
                  File Name
                </Text>
                <Text>{item.fileName}</Text>
              </Box>
              <Box>
                <Text fontWeight="600" fontSize="17px">
                  File Number
                </Text>
                <Text>{item.fileNumber}</Text>
              </Box>
            </VStack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default VerifyModal;
