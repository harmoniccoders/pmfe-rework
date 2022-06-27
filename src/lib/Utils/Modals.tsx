import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Box,
  Flex,
  Text,
} from '@chakra-ui/react';

interface modalProps {
  isOpen: any;
  onClose: any;
  pmlogo?: any;
  content: any;
}
export default function Modals({
  isOpen,
  onClose,
  pmlogo,
  content,
}: modalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      isCentered
      size="lg"
      trapFocus={false}
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />

      <ModalContent
        py={5}
        borderRadius="0"
        overflow="hidden"
        maxH="100vh"
        pos="fixed"
        mt="0rem"
        mb="0rem"
      >
        <ModalHeader>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            pt={['4rem', '0']}
          >
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

            <Box w="150px" h="40px">
              {pmlogo}
            </Box>
          </Flex>
        </ModalHeader>

        <ModalBody>
          <Box maxH="77vh" overflowY="auto" px={5} pb="5rem">
            {content}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
