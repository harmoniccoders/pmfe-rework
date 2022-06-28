import {
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  ModalHeader,
  useDisclosure,
  Flex,
  ModalBody,
  VStack,
  Image,
  Box,
} from '@chakra-ui/react';
import ButtonComponent from 'lib/components/Button';
import Modals from 'lib/Utils/Modals';
import { PaymentRatesView, PropertyView } from 'types/api';
import naira from '../Generics/Naira';
import InstructionModal from './InstructionModals';

type Props = {
  open: boolean;
  close: any;
  item?: PropertyView;

  paymentRates: PaymentRatesView;
};
const PaySecurelyModal = ({
  open,
  close,
  item,

  paymentRates,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const closeModal = () => {
    onOpen();
    close();
  };
  return (
    <>
      <Modals
        isOpen={open}
        onClose={close}
        pmlogo={true}
        content={
          <>
            <Box borderBottom="1px dashed black" py="1rem" mb="1rem">
              <Text fontWeight={600} fontSize="1.1rem">
                {item?.name}
              </Text>
            </Box>

            <VStack spacing={4} w="full">
              <Flex justify="space-between" fontSize=".8rem" w="full">
                <Text>Cost of unit</Text>
                <Text>{naira(paymentRates?.price as number)}</Text>
              </Flex>
              <Flex justify="space-between" fontSize=".8rem" w="full">
                <Text>Fees</Text>
                <Text>{naira(paymentRates?.rates as number)}</Text>
              </Flex>
              <Flex justify="space-between" fontSize=".8rem" w="full">
                <Text>Taxes</Text>
                <Text>{naira(paymentRates?.tax as number)}</Text>
              </Flex>
              <Flex
                justify="space-between"
                fontSize=".9rem"
                fontWeight={600}
                w="full"
              >
                <Text>Total</Text>
                <Text>{naira(paymentRates?.total as number)}</Text>
              </Flex>
            </VStack>
            <Box onClick={closeModal}>
              <ButtonComponent
                content="Pay Securely"
                isValid={true}
                loading={false}
              />
            </Box>
          </>
        }
      />

      <InstructionModal
        open={isOpen}
        close={onClose}
        paymentRates={paymentRates}
        item={item}
      />
    </>
  );
};

export default PaySecurelyModal;
