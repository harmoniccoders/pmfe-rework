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
  ModalBody,
  VStack,
} from '@chakra-ui/react';
import ApplicationForm from 'lib/components/ApplicationForm';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { PropertyModel } from 'types/api';

type Props = {
  onClose: any;
  isOpen: boolean;
  data: PropertyModel;
  setStep: Dispatch<SetStateAction<number>>;
};

const SubmitApplicationModal = ({ onClose, isOpen, data, setStep }: Props) => {
  const [formStep, setFormStep] = useState<number>(0);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />

      <ModalContent
        py={5}
        borderRadius="0"
        w={['88%', '80%']}
        overflowY="scroll"
        maxH="100vh"
        pos="fixed"
        mt="0rem"
        mb="1rem"
      >
        <ModalHeader>
          <HStack
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Text
              onClick={formStep < 1 ? onClose : () => setFormStep(formStep - 1)}
              display="flex"
              alignItems="center"
              fontSize="14px"
              cursor="pointer"
              fontWeight={600}
            >
              <span
                className="fal fa-angle-left"
                style={{ marginRight: '5px', fontWeight: 600 }}
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

        <ModalBody>
          <VStack alignItems="flex-start" spacing={3} width="100%">
            <Text fontWeight={600} fontSize="16px">
              {data.name}
            </Text>

            <Text fontWeight={600} color="brand.100" textTransform="capitalize">
              Application form
            </Text>

            <ApplicationForm
              formStep={formStep}
              setFormStep={setFormStep}
              setStep={setStep}
              close={onClose}
            />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SubmitApplicationModal;
