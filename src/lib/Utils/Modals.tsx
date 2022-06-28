import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Box,
  Flex,
  Text,
  Image,
} from '@chakra-ui/react';

interface modalProps {
  isOpen: any;
  onClose: any;
  pmlogo: boolean;
  content: any;
  formStep?: 0 | number;
  setFormStep?: any;
}
export default function Modals({
  isOpen,
  onClose,
  pmlogo,
  content,
  formStep,
  setFormStep,
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
            {formStep === 0 || formStep == undefined ? (
              <Text
                display="flex"
                alignItems="center"
                fontSize="14px"
                cursor="pointer"
                onClick={onClose}
              >
                <span
                  className="fal fa-angle-left"
                  style={{ marginRight: '5px' }}
                ></span>
                Back
              </Text>
            ) : (
              <Text
                display="flex"
                alignItems="center"
                fontSize="14px"
                cursor="pointer"
                //@ts-ignore
                onClick={() => setFormStep(formStep - 1)}
              >
                <span
                  className="fal fa-angle-left"
                  style={{ marginRight: '5px' }}
                ></span>
                Back
              </Text>
            )}

            <Box w="150px" h="40px">
              {pmlogo ? (
                <Image
                  src="/assets/PropertyMataaz.png"
                  alt="company-logo"
                  w="100%"
                  h="100%"
                  objectFit="contain"
                />
              ) : null}
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
