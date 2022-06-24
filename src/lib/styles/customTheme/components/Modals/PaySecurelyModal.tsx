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
  console.log({ paymentRates });

  return (
    <Modal
      isOpen={open}
      onClose={close}
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
        <ModalHeader>
          <Flex justifyContent="space-between" alignItems="center">
            <Text
              onClick={close}
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
          </Flex>
        </ModalHeader>
        <ModalBody>
          <Box maxH="80vh" overflowY="hidden" px="2rem">
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
            <Box
              onClick={() => {
                close();
                onOpen();
              }}
            >
              <ButtonComponent
                content="Pay Securely"
                isValid={true}
                loading={false}
              />
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
      <InstructionModal
        open={isOpen}
        close={onClose}
        paymentRates={paymentRates}
        item={item}
      />
    </Modal>
  );
};

export default PaySecurelyModal;
