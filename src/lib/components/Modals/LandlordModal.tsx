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
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { DataAccess } from 'lib/Utils/Api';
import Modals from 'lib/Utils/Modals';
import { useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { ComplaintsView } from 'types/api';
import SingleComplainModal from './SingleComplaintModal';

interface LandlordProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

function LandlordModal({ isOpen, onClose, data }: LandlordProps) {
  const { isOpen: opened, onClose: closed, onOpen: onOpened } = useDisclosure();
  const [complains, setComplains] = useState<any>();
  const [singleComplaint, setSingleComplaint] = useState<any>();
  const { addToast } = useToasts();

  const getSingleComplaint = (item: any) => {
    setSingleComplaint(item);
    onOpened();
  };

  useEffect(() => {
    const getComplaints = async () => {
      const bearer = `Bearer ${Cookies.get('token')}`;
      const _dataAccess = new DataAccess(bearer);

      try {
        const datas = (
          await _dataAccess.get(
            `/api/Complaints/property/${data.property?.id}/list`
          )
        ).data;
        setComplains(datas.value);
      } catch (err: any) {
        addToast(err.message || err.body.message, {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    };
    getComplaints();
  }, []);

  // console.log({ complains });

  return (
    <>
      <Modals
        isOpen={isOpen}
        onClose={onClose}
        pmlogo={true}
        content={
          <>
            {complains?.length <= 0 ? (
              'No Complaints yet'
            ) : (
              <VStack spacing={5}>
                {complains?.map((item: ComplaintsView) => {
                  return (
                    <Box w="full" key={item.id}>
                      <Stack
                        spacing={3}
                        onClick={() => getSingleComplaint(item)}
                        cursor="pointer"
                      >
                        <Text fontWeight="600" fontSize={['1rem', '']}>
                          {item.complaintsCategory}
                        </Text>
                        <Text>10/04/21</Text>
                        <Divider />
                      </Stack>
                    </Box>
                  );
                })}
              </VStack>
            )}
          </>
        }
      />
      {singleComplaint !== undefined && (
        <SingleComplainModal
          isOpen={opened}
          onClose={closed}
          closeModal={onClose}
          data={singleComplaint}
        />
      )}
    </>
  );
}

export default LandlordModal;
