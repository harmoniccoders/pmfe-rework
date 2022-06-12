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
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Modal isOpen={open} onClose={close}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>
          <Flex width="100%" alignItems="center" justifyContent="space-between">
            <Text color="brand.100">Watch Interactive Video</Text>

            <ModalCloseButton
              _focus={{
                outline: 'none',
              }}
            />
          </Flex>
        </ModalHeader>

        <ModalBody>
          <Text lineHeight={1.5}>
            Please ensure that you have completed the video before proceeding to
            the next step.
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button onClick={close} variant="outline">
            Got it!
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InteractiveVideoModal;
