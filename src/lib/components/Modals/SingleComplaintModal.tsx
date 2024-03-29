import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Flex,
  Text,
  Box,
  Stack,
  Divider,
  Button,
} from '@chakra-ui/react';
import Modals from 'lib/Utils/Modals';
import { Parameters } from 'openapi-client-axios';
import { useOperationMethod } from 'react-openapi-client';
import { useToasts } from 'react-toast-notifications';
import { ComplaintsView } from 'types/api';

interface LandlordProps {
  isOpen: boolean;
  onClose: () => void;
  closeModal: () => void;
  data: ComplaintsView;
}

export default function SingleComplainModal({
  isOpen,
  onClose,
  closeModal,
  data,
}: LandlordProps) {
  const [authorize, { loading, data: aData, error }] = useOperationMethod(
    'Complaintsauthorize{complaintsId}'
  );

  const { addToast } = useToasts();
  const AuthorizeComplaints = async () => {
    const params: Parameters = {
      complaintsId: data.id as unknown as number,
    };

    try {
      const result = await (await authorize(params)).data;

      closeModal();
      onClose();
      if (result.status) {
        addToast('Successful', {
          appearance: 'success',
          autoDismiss: true,
        });
        return;
      }
      addToast(result.message, {
        appearance: 'error',
        autoDismiss: true,
      });
      return;
    } catch (err: any) {
      addToast(err.message || err.body.message, {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };
  return (
    <Modals
      isOpen={isOpen}
      onClose={onClose}
      pmlogo={true}
      content={
        <>
          <Box w="full">
            <Stack mt="1rem">
              <Text fontWeight="500">Category</Text>
              <Text fontWeight="700" fontSize={['1rem', '']}>
                {data.complaintsCategory}
              </Text>
              <Divider />
            </Stack>
            <Stack mt="1rem">
              <Text fontWeight="500">Sub Category</Text>
              <Text fontWeight="700" fontSize={['1rem', '']}>
                {data.complaintsSubCategory}
              </Text>
              <Divider />
            </Stack>
            <Stack mt="1rem">
              <Text fontWeight="500">Comments</Text>
              <Text fontWeight="700" fontSize={['1rem', '']}>
                {data.comment}
              </Text>
              <Divider />
            </Stack>
            <Box mt="4rem">
              <Button
                type="button"
                w="100%"
                h="100%"
                variant="solid"
                textTransform="capitalize"
                onClick={() => AuthorizeComplaints()}
              >
                Authorize Inspection
              </Button>
              <Text color="gray" mt="1.25rem">
                A propertyMattaaz Representative will go and inspect the
                reported damage and we will revert to you with proof of damage
                as well as repair costs.
              </Text>
            </Box>
          </Box>
        </>
      }
    />
  );
}
