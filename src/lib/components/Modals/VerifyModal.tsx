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

import { LandSearchView } from 'types/api/land-search-view';

interface VerifyProps {
  isOpen: boolean;
  onClose: () => void;
  item: LandSearchView;
}
const VerifyModal = ({ isOpen, onClose, item }: VerifyProps) => {
  return (
    <Modals
      isOpen={isOpen}
      onClose={onClose}
      pmlogo={true}
      content={
        <>
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
        </>
      }
    />
  );
};
export default VerifyModal;
