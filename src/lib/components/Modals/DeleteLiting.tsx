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

type Props = {
  isOpen?: any;
  onClose?: any;
  item: PropertyView;
};

const DeleteListings = ({ isOpen, onClose, item }: Props) => {
  const [deleteListings, { loading, data, error }] =
    useOperationMethod('Propertydelete{id}');

  const { addToast } = useToasts();
  const router = useRouter();

  const DeleteProperty = async () => {
    const params: Parameters = {
      id: item.id as number,
    };

    try {
      const result = await (await deleteListings(params)).data;
      if (result.status) {
        addToast('Listing Deleted', {
          appearance: 'success',
          autoDismiss: true,
        });
        onClose();
        router.reload();
        return;
      }
      addToast(result.message, {
        appearance: 'error',
        autoDismiss: true,
      });
      onClose();
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
        borderRadius="0"
        w={['88%', '80%']}
        overflow="hidden"
        maxH="100vh"
        pos="fixed"
        mt="1rem"
        mb="1rem"
      >
        <ModalHeader textAlign="center">
          {item.status === 'INACTIVE' || item.status === 'SOLD' ? (
            <Text fontSize="1.1rem" fontWeight="bold">
              {`You cannot delete a property that has been  ${
                item.isForRent ? 'rented out' : 'sold'
              }`}
            </Text>
          ) : (
            <>
              <Text fontSize="1.1rem" fontWeight="bold">
                Are you sure you want to delete this listing?
              </Text>
              <Text color="red" fontSize=".8rem">
                Please note, action cannot be reversed
              </Text>
            </>
          )}
        </ModalHeader>

        <ModalBody>
          <Box maxH="77vh" overflowY="auto" px={5}>
            <HStack px=".8rem" spacing={4} w="full">
              <Button
                variant="solid"
                height="40px"
                width="full"
                bgColor="brand.800"
                onClick={onClose}
              >
                No
              </Button>
              <Button
                variant="solid"
                height="40px"
                width="full"
                bgColor="brand.900"
                isDisabled={
                  item.status === 'INACTIVE' || item.status === 'SOLD'
                }
                isLoading={loading}
                onClick={() => DeleteProperty()}
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

export default DeleteListings;
