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
  width?: any;
  h?: any;
  pb?: any;
  showBack?: boolean;
}
export default function Modals({
  isOpen,
  onClose,
  pmlogo,
  content,
  formStep,
  setFormStep,
  width = '40%',
  h = '77vh',
  pb = '4rem',
  showBack = true,
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
        maxW="100%"
        w={width}
      >
        <ModalHeader>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            pt={['2rem', '0']}
            display={showBack ? 'flex' : 'none'}
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

            {pmlogo ? (
              <Box w="150px" h="40px">
                <Image
                  src="/assets/PropertyMataaz.png"
                  alt="company-logo"
                  w="100%"
                  h="100%"
                  objectFit="contain"
                />
              </Box>
            ) : null}
          </Flex>
        </ModalHeader>

        <ModalBody>
          <Box maxH={h} overflowY="auto" px={5} pb={pb}>
            {content}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
