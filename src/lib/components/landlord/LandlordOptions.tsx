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
} from '@chakra-ui/react';
import Icons from '../Icons';
import { Tenancy, RentCollectionType, ComplaintsCategory, ComplaintsModel } from 'types/api';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToasts } from 'react-toast-notifications';
import { useOperationMethod } from 'react-openapi-client';
import { Parameters } from 'openapi-client-axios';
import axios from 'axios';

interface Props {
  formStep: number;
  setFormStep: any;
  Tenancylandlord: any;
  getBanks: any[];
  category: ComplaintsCategory[];
  onClose: () => void;
}

const LandlordOptions = ({ onClose ,getBanks}: Props) => {
  // const [ViewTenancylandlord, { loading: isLoading, data, error }] =
  //   useOperationMethod('Tenancylandlord');

    const [ authorizeComplaints, { loading, data, error }] =
    useOperationMethod('Complaintsauthorize{complaintsId}');

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
  
  

  const schema = yup.object().shape({
    name: yup.string().required(),
    bank: yup.string().when('name', {
      is: () => formStep === 3,
      then: yup.string(),
    }),
    accountNumber: yup.string().when('name', {
      is: () => formStep === 3,
      then: yup.string(),
    }),
  });

  const [formStep, setFormStep] = useState<number>(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Tenancy>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  
  const { addToast } = useToasts();

  
  return (
    <>
        <Box w="100%" borderRadius="8px !important">
          <Box w="full" h="150px" pos="relative">
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
              px="1.5rem"
              h="24px"
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

          <VStack my="1.5rem" alignItems="flex-start">
            <Text fontWeight="600" whiteSpace="nowrap" fontSize="1.2rem">
              4 Bedroom Duplex with BQ
            </Text>
            <HStack>
              <Icons iconClass="fa-calendar" />
              <Text fontWeight="400">Next rent is due in 365 days</Text>
            </HStack>
          </VStack>
          <Grid
            mt={['.5rem', '.75rem']}
            alignItems="center !important"
            justifyContent="center !important"
            templateColumns={['repeat(1,1fr)', 'repeat(1,1fr)']}
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
              <HStack>
                <Icons iconClass="fa-house" />
                <Text fontSize="1rem" ml="4px">
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
                <Text fontSize="1rem" whiteSpace="nowrap" ml="4px">
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
                <Text fontSize="1rem" whiteSpace="nowrap" ml="4px">
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
              <HStack>
                <Icons iconClass="fa-copy" />
                <Text fontSize="1rem" whiteSpace="nowrap" ml="4px">
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
                <Text fontSize="1rem" whiteSpace="nowrap" ml="4px">
                  Renew Tenancy
                </Text>
              </HStack>
            </Box>
          </Grid>
        </Box>
        
      {formStep === 1 && (
        <>
          <Box w="full">
            <Stack spacing={3} onClick={() => setFormStep(2)} cursor="pointer">
              <Text fontWeight="600" fontSize={['1rem', '']}>
                Structural Damage
              </Text>
              <Text>10/04/21</Text>
              <Divider />
            </Stack>
          </Box>
        </>
      )}
    </>
  );
};

export default LandlordOptions;
