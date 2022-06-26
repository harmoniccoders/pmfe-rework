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
import { useEffect, useState } from 'react';
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
      } catch (err) {}
    };
    getComplaints();
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      motionPreset="slideInBottom"
      isCentered
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />

      <ModalContent
        py={5}
        overflowY="auto"
        borderRadius="0"
        pos="fixed"
        maxH="100vh"
      >
        <ModalHeader>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            onClick={onClose}
          >
            <Text
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
          </Flex>
        </ModalHeader>

        <ModalBody>
          <Box px={5}>
            <VStack spacing={5}>
              {complains?.map((item: ComplaintsView) => {
                return (
                  <Box w="full" key={item.id}>
                    <Stack spacing={3} onClick={onOpened} cursor="pointer">
                      <Text fontWeight="600" fontSize={['1rem', '']}>
                        {item.complaintsCategory}
                      </Text>
                      <Text>10/04/21</Text>
                      <Divider />
                    </Stack>
                    <SingleComplainModal
                      isOpen={opened}
                      onClose={closed}
                      closeModal={onClose}
                      data={item}
                    />
                  </Box>
                );
              })}
            </VStack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default LandlordModal;
