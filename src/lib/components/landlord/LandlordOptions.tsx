import {
  Flex,
  Box,
  Image,
  VStack,
  Stack,
  Button,
  Center,
  Divider,
  Text,
  Spacer,
  Grid,
  HStack,
  useDisclosure,
} from '@chakra-ui/react';
import Icons from '../Icons';
import {
  Tenancy,
  RentCollectionType,
  ComplaintsCategory,
  ComplaintsModel,
} from 'types/api';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToasts } from 'react-toast-notifications';
import { useOperationMethod } from 'react-openapi-client';
import { Parameters } from 'openapi-client-axios';
import axios from 'axios';
import LandlordModal from 'lib/styles/customTheme/components/Modals/LandlordModal';
import TenancyAgreement from './TenancyAgreement';

// interface Props {
//   formStep: number;
//   setFormStep: any;
//   Tenancylandlord: any;
//   getBanks: any[];
//   category: ComplaintsCategory[];
//   onClose: () => void;
//   singles: any;
// }

const LandlordOptions = ({ singles }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: opened, onOpen: onOpened, onClose: closed } = useDisclosure();

  // const [ViewTenancylandlord, { loading: isLoading, data, error }] =
  //   useOperationMethod('Tenancylandlord');

  // const [authorizeComplaints, { loading, data, error }] = useOperationMethod(
  //   'Complaintsauthorize{complaintsId}'
  // );

  // const AuthorizeComplaints = async () => {
  //   const params: Parameters = {
  //     complaintsId: item.id as number,
  //   };

  //   try {
  //     const result = await (await authorizeComplaints(params)).data;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const schema = yup.object().shape({
  //   name: yup.string().required(),
  //   bank: yup.string().when('name', {
  //     is: () => formStep === 3,
  //     then: yup.string(),
  //   }),
  //   accountNumber: yup.string().when('name', {
  //     is: () => formStep === 3,
  //     then: yup.string(),
  //   }),
  // });

  // const [formStep, setFormStep] = useState<number>(0);

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, isValid },
  // } = useForm<Tenancy>({
  //   resolver: yupResolver(schema),
  //   mode: 'all',
  // });

  const { addToast } = useToasts();

  return (
    <>
      <Box w="70%" mx="auto" py="2rem">
        <Box w="full" h="400px" pos="relative">
          <Image
            src="/assets/nb.webp"
            alt="property-image"
            w="100%"
            height="100%"
            objectFit="cover"
          />
          <Flex
            bg="brand.100"
            color="white"
            pos="absolute"
            w="fit-content"
            px="4rem"
            h="35px"
            top="18%"
            fontSize="14px"
            align="center"
            justify="center"
            borderRadius="4px 0 0 4px"
            right="0"
            textTransform="capitalize"
          >
            Lekki phase 1
          </Flex>
        </Box>

        <VStack my="3rem" alignItems="flex-start">
          <Text fontWeight="600" whiteSpace="nowrap" fontSize="2rem">
            4 Bedroom Duplex with BQ
          </Text>
          <HStack>
            <Icons iconClass="fa-calendar" />
            <Text fontWeight="400">Next rent is due in 365 days</Text>
          </HStack>
        </VStack>
        <Grid
          mt={['.5rem', '.75rem']}
          mb="4rem"
          alignItems="center !important"
          justifyContent="center !important"
          templateColumns={['repeat(1,1fr)', 'repeat(2,1fr)']}
          gap={4}
        >
          <Box
            w="full"
            border="1px solid gray"
            mt=".2rem"
            p=".75rem"
            borderRadius="4px"
            cursor="pointer"
          >
            <HStack onClick={onOpen}>
              <Icons iconClass="fa-house" />
              <Text fontSize="1rem" ml="4px" fontWeight="600">
                Complaints
              </Text>
            </HStack>
          </Box>
          <Box
            w="full"
            border="1px solid gray"
            mt=".2rem"
            p=".75rem"
            borderRadius="4px"
            cursor="pointer"
          >
            <HStack>
              <Icons iconClass="fa-money-bill-wave" />
              <Text
                fontSize="1rem"
                whiteSpace="nowrap"
                ml="4px"
                fontWeight="600"
              >
                Payments
              </Text>
            </HStack>
          </Box>
          <Box
            w="full"
            border="1px solid gray"
            mt=".2rem"
            p=".75rem"
            borderRadius="4px"
            cursor="pointer"
          >
            <HStack>
              <Icons iconClass="fa-scroll" />
              <Text
                fontSize="1rem"
                whiteSpace="nowrap"
                ml="4px"
                fontWeight="600"
              >
                Recipts
              </Text>
            </HStack>
          </Box>
          <Box
            w="full"
            border="1px solid gray"
            mt=".2rem"
            p=".75rem"
            borderRadius="4px"
            cursor="pointer"
          >
            <HStack onClick={onOpened}>
              <Icons iconClass="fa-copy" />
              <Text
                fontSize="1rem"
                whiteSpace="nowrap"
                ml="4px"
                fontWeight="600"
              >
                Tenancy Agreements
              </Text>
            </HStack>
          </Box>
          <Box
            w="full"
            border="1px solid gray"
            mt=".2rem"
            p=".75rem"
            borderRadius="4px"
            cursor="pointer"
          >
            <HStack>
              <Icons iconClass="fa-life-ring" />
              <Text
                fontSize="1rem"
                whiteSpace="nowrap"
                ml="4px"
                fontWeight="600"
              >
                Renew Tenancy
              </Text>
            </HStack>
          </Box>
        </Grid>
      </Box>

      <LandlordModal isOpen={isOpen} onClose={onClose} data={singles} />
      <TenancyAgreement isOpen={opened} onClose={closed} data={singles} />
    </>
  );
};

export default LandlordOptions;
// {formStep === 1 && (
//   <>
//     <Box w="full">
//       <Stack spacing={3} onClick={() => setFormStep(2)} cursor="pointer">
//         <Text fontWeight="600" fontSize={['1rem', '']}>
//           Structural Damage
//         </Text>
//         <Text>10/04/21</Text>
//         <Divider />
//       </Stack>
//     </Box>
//   </>
// )}
// {formStep === 2 && (
//   <>
// <Box w="full">
//   <Stack mt="1rem">
//     <Text fontWeight="500">Category</Text>
//     <Text fontWeight="700" fontSize={['1rem', '']}>
//       Structural Damage
//     </Text>
//     <Divider />
//   </Stack>
//   <Stack mt="1rem">
//     <Text fontWeight="500">Sub Category</Text>
//     <Text fontWeight="700" fontSize={['1rem', '']}>
//       Roof Leakage
//     </Text>
//     <Divider />
//   </Stack>
//   <Stack mt="1rem">
//     <Text fontWeight="500">Comments</Text>
//     <Text fontWeight="700" fontSize={['1rem', '']}>
//       Roof Leakage
//     </Text>
//     <Divider />
//   </Stack>
//   <Box mt="4rem">
//     <Button
//       type="button"
//       w="100%"
//       h="100%"
//       variant="solid"
//       textTransform="capitalize"
//       onClick={() => setFormStep(3)}
//     >
//       Authorize Inspection
//     </Button>
//     <Text color="gray" mt="1.25rem">
//       A propertyMattaaz Representative will go and inspect the
//       reported damage and we will revert to you with proof of damage
//       as well as repair costs.
//     </Text>
//   </Box>
// </Box>
//   </>
// )}
