import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  HStack,
  Text,
  Box,
  Flex,
  Image,
} from '@chakra-ui/react';
import React from 'react';

type Props = {
  onClose: any;
  isOpen: boolean;
};
//  py={5}
//           borderRadius="0"
//           w={['88%', '80%']}
//           overflow="hidden"
//           maxH="100vh"
//           maxW="50%"
//           h="100%"
//           pos="fixed"
//           mt="0rem"
//           mb="0rem"

const SubmitApplicationModal = ({ onClose, isOpen }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />

      <ModalContent maxW="100%">
        <Flex
          w="50%"
          mx="auto"
          justifyContent="center"
          alignItems="center"
          border="2px solid green"
        >
          <ModalHeader>
            <HStack justifyContent="flex-start" border="1px solid red">
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
                <Image
                  src="/assets/PropertyMataaz.png"
                  alt="company-logo"
                  w="100%"
                  h="100%"
                  objectFit="contain"
                />
              </Box>
            </HStack>
          </ModalHeader>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default SubmitApplicationModal;
