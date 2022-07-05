import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Text,
  Box,
  HStack,
} from '@chakra-ui/react';
import { useOperationMethod } from 'react-openapi-client';
import { PropertyView } from 'types/api';
import { Parameters } from 'openapi-client-axios';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import { FaTrash } from 'react-icons/fa';
import Icons from '../Icons';

type Props = {
  isOpen?: any;
  onClose?: any;
  item: any;
};

const CancelEnquiryModal = ({ isOpen, onClose, item }: Props) => {
  const { addToast } = useToasts();
  const router = useRouter();
  const [cancel, { loading, data: isData, error }] = useOperationMethod(
    'Userenquirecancel{PropertyId}'
  );

  const CancelEnquiry = async () => {
    const params: Parameters = {
      PropertyId: item.id as number,
    };

    try {
      const result = await (await cancel(params)).data;

      if (result.status) {
        onClose();
        addToast(result.message, {
          appearance: 'success',
          autoDismiss: true,
        });
        router.pathname.startsWith('/rent')
          ? router.push('/rent/listed-property')
          : router.push('/buy');

        return;
      }
      onClose();
      addToast(result.message, {
        appearance: 'error',
        autoDismiss: true,
      });
      return;
    } catch (err) {}
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      isCentered
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />

      <ModalContent
        py={5}
        borderRadius="10px"
        w={['88%', '30%']}
        overflow="hidden"
        maxH="100vh"
        pos="fixed"
        mt="1rem"
        mb="1rem"
      >
        <ModalHeader textAlign="center">
          <>
            <Box textAlign="center" color="brand.800" fontSize="3rem" mb="1rem">
              <Icons iconClass="fa-trash-alt" />
            </Box>
            <Text
              fontSize="1.1rem"
              mb="1rem"
              px={['1.5rem', '3.3rem']}
              fontWeight="500"
            >
              Are you sure you want to cancel your enquiry? All progress on this
              transaction will be lost
            </Text>
          </>
        </ModalHeader>

        <ModalBody>
          <Box maxH="77vh" overflowY="auto" px={5}>
            <HStack px=".8rem" spacing={4} w="full">
              <Button
                variant="outline"
                height="3rem"
                width="full"
                // bgColor="black"
                // _hover={{
                //   bgColor: 'white',
                //   color: 'black',
                //   border: '1px solid',
                //   borderColor: 'black',
                // }}
                onClick={onClose}
              >
                No
              </Button>
              <Button
                variant="solid"
                height="3rem"
                width="full"
                // bgColor="brand.800"
                // _hover={{
                //   bgColor: 'white',
                //   color: 'brand.800',
                //   border: '1px solid',
                //   borderColor: 'brand.800',
                // }}
                disabled={item.status === 'INACTIVE' || item.status === 'SOLD'}
                isLoading={loading}
                onClick={() => CancelEnquiry()}
              >
                Yes
              </Button>
            </HStack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CancelEnquiryModal;
