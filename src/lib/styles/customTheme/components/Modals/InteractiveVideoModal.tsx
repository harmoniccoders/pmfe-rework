import React from 'react';
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

type Props = {
  open: boolean;
  close: any;
};

const InteractiveVideoModal = ({ open, close }: Props) => {
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
          <Text fontSize="1.1rem" fontWeight="bold">
            Watch 3D Interactive Video
          </Text>
          <ModalCloseButton />
        </ModalHeader>

        <ModalBody>
          <Text fontSize="1rem" textAlign="justify">
            Hi there! We advise you watch the interactive videos embeded on this
            property so as to be sure of what you want. All Videos are rightfull
            owned by <strong>PropertyMattaz</strong>
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button onClick={close} variant="outline" w="full">
            Got it!
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InteractiveVideoModal;
