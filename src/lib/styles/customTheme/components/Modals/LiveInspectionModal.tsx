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
  Box,
} from '@chakra-ui/react';
import Icons from 'lib/components/Icons';

import ScheduleTabs from 'lib/components/ScheduleTabs';
import React from 'react';
import { InspectionDateView, PropertyView } from 'types/api';

type Props = {
  open: boolean;
  close: any;
  date?: InspectionDateView;
  item?: PropertyView;
  setStep: any;
};

const LiveInspectionModal = ({ open, close, date, item, setStep }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Modal
      isOpen={open}
      onClose={close}
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
        pos="fixed"
        mt="1rem"
        mb="1rem"
      >
        <ModalHeader textAlign="center">
          <Flex justify="space-between" align="center">
            <Text fontSize="1.1rem" fontWeight="bold" color="brand.100">
              Schedule Live Inspection
            </Text>
            <Box onClick={close}>
              <Icons iconClass="fa-times" />
            </Box>
          </Flex>
        </ModalHeader>
        <ModalBody>
          <Box maxH="77vh" overflowY="auto">
            <VStack spacing={4} alignItems="flex-start">
              <Text fontWeight={600}>Select an inspection type</Text>
              <ScheduleTabs
                date={date}
                item={item}
                close={close}
                setStep={setStep}
              />
            </VStack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LiveInspectionModal;
