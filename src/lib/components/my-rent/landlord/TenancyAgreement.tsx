import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Flex,
  Text,
  Box,
  Image,
  Button,
  Checkbox,
  Divider,
  Heading,
  VStack,
} from '@chakra-ui/react';
import LandlordOptions from 'lib/components/my-rent/landlord/LandlordOptions';
import moment from 'moment';
import { useOperationMethod } from 'react-openapi-client';
import { TenancyView } from 'types/api';
import { Parameters } from 'openapi-client-axios';
import { useToasts } from 'react-toast-notifications';

interface LandlordProps {
  isOpen: boolean;
  onClose: () => void;
  data: TenancyView;
}

export default function TenancyAgreement({
  isOpen,
  onClose,
  data,
}: LandlordProps) {
  const [agreeTenancy, { loading }] = useOperationMethod(
    'Tenancyagreementupdate{id}'
  );

  const { addToast } = useToasts();

  const submitAgreement = async () => {
    const params: Parameters = {
      id: data.id as number,
    };
    try {
      const result = (await agreeTenancy(params)).data;
      console.log({ result });
      if (result.status) {
        addToast('Agreement Submitted', {
          appearance: 'success',
        });
        onClose();
        return;
      }
    } catch (err: any) {
      console.log({ err });
    }
  };


  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      motionPreset="slideInBottom"
      trapFocus={false}
      isCentered
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />

      <ModalContent
        py={5}
        borderRadius="0"
        overflowY="auto"
        h="100vh"
        pos="fixed"
        w="50%"
        maxW="100%"
      >
        <ModalHeader>
          <Flex justifyContent="space-between" alignItems="center">
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
          </Flex>
        </ModalHeader>

        <ModalBody>
          <Box px="5">
            <VStack align="flex-start" fontSize="1.2rem">
              <Heading fontSize="1.2rem">Tenancy Agreement</Heading>
              <Text>Between</Text>
              <Heading fontSize="1.2rem" textTransform="capitalize">{`${
                data.owner?.firstName
              } ${data.owner?.middleName || ''} ${
                data.owner?.lastName
              }`}</Heading>
              <Text>And</Text>
              <Heading fontSize="1.2rem">{`${data.tenant?.firstName} ${
                data.tenant?.middleName || ''
              } ${data.tenant?.lastName}`}</Heading>
            </VStack>
            <Text my="5">
              {`${data.property?.address} ${data.property?.lga}  ${data.property?.state}`}
            </Text>
            <VStack align="flex-start" spacing="2">
              <Text textTransform="uppercase">
                THIS TENANCY IS MADE ON{' '}
                {moment(data.tenant?.dateCreated).format('Do of MMMM YYYY')}{' '}
                BETWEEN
              </Text>
              <Heading fontSize="1rem" textTransform="capitalize">{`${
                data.tenant?.firstName
              } ${data.tenant?.middleName || ''} ${
                data.tenant?.lastName
              }`}</Heading>
              <Text>
                of 10 {data.tenant?.address} (hereinafter to referred to as The
                Tenant which expression shall where the context so admit include
                his successors in title and assigns) of the one part
              </Text>
            </VStack>

            <Text my="5">AND</Text>

            <Text>
              <Heading fontSize="1rem" textTransform="capitalize">
                {`${data.owner?.firstName} ${data.owner?.middleName || ''} ${
                  data.owner?.lastName
                }`}
                ,
              </Heading>
              {data.owner?.address}
            </Text>
            <Heading my="5" fontSize="1rem">
              WHEREAS:
            </Heading>
            <VStack spacing="5" align="flex-start">
              <Divider />
              <Checkbox colorScheme="blue" alignItems="flex-start">
                I agree that checking this box and tapping the agree button
                constitutes an appending of my electronic signature to the
                Tenancy Agreement herein.
              </Checkbox>
              <Button
                fontSize="1rem"
                w="full"
                mt="1rem"
                isLoading={loading}
                onClick={submitAgreement}
              >
                Agree and Submit
              </Button>
            </VStack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
