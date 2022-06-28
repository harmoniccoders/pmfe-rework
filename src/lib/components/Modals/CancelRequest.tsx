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
import { PropertyRequestView } from 'types/api';
import { Parameters } from 'openapi-client-axios';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import Modals from 'lib/Utils/Modals';

type Props = {
  isOpen?: any;
  onClose?: any;
  item: PropertyRequestView;
};

const CancelRequest = ({ isOpen, onClose, item }: Props) => {
  const [deleteListings, { loading, data, error }] = useOperationMethod('');

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
    <Modals
      isOpen={isOpen}
      onClose={onClose}
      pmlogo={true}
      content={
        <>
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
              isLoading={loading}
              onClick={() => DeleteProperty()}
            >
              Yes
            </Button>
          </HStack>
        </>
      }
    />
  );
};

export default CancelRequest;
