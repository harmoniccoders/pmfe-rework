import {
  Box,
  Text,
  Button,
  VStack,
  HStack,
  ModalBody,
  ModalHeader,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  Link,
  Image,
  SimpleGrid,
  Divider,
  Stack,
  StackDivider,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import ButtonComponent from 'lib/components/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ComplaintsModel, PropertyType, Register } from 'types/api';
import { useOperationMethod } from 'react-openapi-client';
import { PrimaryInput } from 'lib/Utils/PrimaryInput';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import cookies from 'js-cookie';
import { PrimarySelectKey } from 'lib/Utils/PrimarySelectKey';
import NumberCounter from 'lib/Utils/NumberCounter';
import { useState } from 'react';
import { buildingState } from 'lib/Utils/BuildingStates';
import { PrimarySelectLabel } from 'lib/Utils/PrimarySelectLabel';
import { PrimaryDate } from 'lib/Utils/PrimaryDate';
import { PrimaryTextArea } from 'lib/Utils/PrimaryTextArea';
import { FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { GrMail } from 'react-icons/gr';
import Icons from '../Icons';

const schema = yup.object().shape({
  budget: yup.string().required(),
  comment: yup.string().required(),
  lga: yup.string().required(),
  state: yup.string().required(),
  propertyTypeId: yup.number().required(),
  numberofBathrooms: yup.number(),
  numberOfBedRooms: yup.number(),

});

const RentHelpPage = ({ result }: { result: any }) => {
  const [GetHelp, { loading, data, error }] = useOperationMethod('');
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm<ComplaintsModel>({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const { addToast } = useToasts();
  const router = useRouter();

  const onSubmit = async (data: ComplaintsModel) => {
    try {
      const result = await (await GetHelp(undefined, data)).data;

      if (result.status) {
        addToast('Message sent sucessfully', {
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
    } catch (err) {}
  };
  return (
    <Stack minH="calc(100vh - 77px)" justify="center" w="90%" mx="auto">
      <Text
        fontWeight={600}
        textAlign="center"
        fontSize="1.1rem"
        color="brand.100"
        pt="5"
        pb="1"
      >
        Need help listing properties for rent? contact us
      </Text>
      <SimpleGrid columns={[1, 2]} alignItems="center" pb="10">
        <VStack spacing="10" shadow="lg" p="10" w="fit-content" mx="auto">
          <VStack spacing="2">
            <FaMapMarkerAlt fontSize="20" color="blue" />
            <Text fontWeight="600" fontSize="1.2rem" lineHeight="1">
              Address
            </Text>
            <Text textAlign="center">
              1st Floor, Providence House, <br /> 15 Admiralty Way, Lekki Phase
              I 106104, Lagos
            </Text>
          </VStack>
          <VStack spacing="2">
            <FaPhone fontSize="20" color="blue" />
            <Text fontWeight="600" fontSize="1.2rem" lineHeight="1">
              Phone
            </Text>
            <Text textAlign="center">0909 000 2394</Text>
          </VStack>
          <VStack spacing="2">
            <GrMail fontSize="20" color="blue" />
            <Text fontWeight="600" fontSize="1.2rem" lineHeight="1">
              Email
            </Text>
            <Text textAlign="center">PropertyMataaz@gmail.com</Text>
          </VStack>
        </VStack>

        <Box
          w={['100%', '80%', '100%']}
          border="2px hidden blue"
          pl={[0, 0, '2.5rem']}
          mt={[0, '20px', 0]}
          margin="auto"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <PrimaryInput<ComplaintsModel>
              label="Name"
              name="Name"
              error={errors.complaintsSubCategoryId}
              defaultValue=""
              register={register}
            />
            <PrimaryInput<ComplaintsModel>
              label="Email "
              name="email"
              error={errors.propertyId}
              defaultValue=""
              register={register}
            />
            <PrimaryTextArea<ComplaintsModel>
              label="Message"
              name="Message"
              error={errors.comment}
              defaultValue=""
              minH="200px"
              register={register}
            />

            <ButtonComponent
              content="Send"
              isValid={isValid}
              loading={loading}
            />
          </form>
        </Box>
      </SimpleGrid>
    </Stack>
  );
};

export default RentHelpPage;
