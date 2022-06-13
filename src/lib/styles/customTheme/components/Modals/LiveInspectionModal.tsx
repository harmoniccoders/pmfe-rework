import {
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  ModalHeader,
  useDisclosure,
  ModalCloseButton,
  Flex,
  ModalBody,
  VStack,
  HStack,
} from '@chakra-ui/react';

import ScheduleTabs from 'lib/components/ScheduleTabs';
import React from 'react';
import { InspectionDateView } from 'types/api';

type Props = {
  open: boolean;
  close: any;
  date?: InspectionDateView;
};

const LiveInspectionModal = ({ open, close, date }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Modal isOpen={open} onClose={close}>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />
      <ModalContent borderRadius="0px">
        <ModalHeader>
          <Flex width="100%" alignItems="center" justifyContent="space-between">
            <Text color="brand.100">Schedule Inspection</Text>

            <ModalCloseButton
              _focus={{
                outline: 'none',
              }}
            />
          </Flex>
        </ModalHeader>

        <ModalBody>
          <VStack spacing={4} alignItems="flex-start">
            <Text fontWeight={600}>Select an inspection type</Text>
            <ScheduleTabs date={date} />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LiveInspectionModal;
