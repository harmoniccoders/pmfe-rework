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
import { PrimaryInput } from 'lib/Utils/PrimaryInput';
import { PrimarySelect } from 'lib/Utils/PrimarySelect';
import { Tenancy, RentCollectionType } from 'types/api';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToasts } from 'react-toast-notifications';
import { useOperationMethod } from 'react-openapi-client';
import axios from 'axios';

interface Props {
  formStep: number;
  setFormStep: any;
  Tenancylandlord: any;
  onClose: () => void;
}

const LandlordOptions = ({ onClose }: Props) => {
  const [Tenancylandlord, { loading: isLoading, data, error }] =
    useOperationMethod('Tenancylandlord');

  const schema = yup.object().shape({
    name: yup.string().required(),
    accountNumber: yup.string().required(),
  });

  const [formStep, setFormStep] = useState<number>(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Tenancylandlord>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const completeFormStep = () => {
    setFormStep((cur: number) => cur + 1);
  };
  const clearPreviewData = () => {
    setFormStep(0);
    onClose();
  };

  const { addToast } = useToasts();

  const onSubmit = async (data: Tenancylandlord) => {
    try {
      const result = await (await Tenancylandlord(undefined, data)).data;
      //console to be removed, take note
      console.log({ result });
      //remove the line above
      if (result.status != 400) {
        addToast(result.message, {
          appearance: 'success',
          autoDismiss: true,
        });
        onClose();
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
    <>
      {formStep === 0 && (
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
              onClick={() => setFormStep(1)}
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
              onClick={() => setFormStep(4)}
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
      )}
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
      {formStep === 2 && (
        <>
          <Box w="full">
            <Stack mt="1rem">
              <Text fontWeight="500">Category</Text>
              <Text fontWeight="700" fontSize={['1rem', '']}>
                Structural Damage
              </Text>
              <Divider />
            </Stack>
            <Stack mt="1rem">
              <Text fontWeight="500">Sub Category</Text>
              <Text fontWeight="700" fontSize={['1rem', '']}>
                Roof Leakage
              </Text>
              <Divider />
            </Stack>
            <Stack mt="1rem">
              <Text fontWeight="500">Comments</Text>
              <Text fontWeight="700" fontSize={['1rem', '']}>
                Roof Leakage
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
                onClick={() => setFormStep(3)}
              >
                Authorize Inspection
              </Button>
              <Text  color="gray" mt="1.25rem">
                A propertyMattaaz Representative will go and inspect the
                reported damage and we will revert to you with proof of damage
                as well as repair costs.
              </Text>
            </Box>
          </Box>
        </>
      )}
      {formStep === 3 && (
        <>
          <Box w="full">
            <Center>
              <Text mt="1rem" color="#545454">
                Total Rent Remitted
              </Text>
            </Center>
            <Center>
              <Text mb="1rem" fontWeight="700" fontSize="2rem">
                #0.00
              </Text>
            </Center>

            <Stack mt="1rem">
              <Text fontWeight="700" fontSize={['1rem', '']}>
                Upcoming Remitance
              </Text>
              <Flex
                w="full"
                h="3rem"
                borderRadius="8px"
                bgColor="rgba(154,167,179,0.06)"
                align="center"
                p=".55rem"
                mb="1rem"
              >
                <Text textAlign="left">#2,500,000</Text>
                <Spacer />
                <Text textAlign="right">30 Jun 2021</Text>
              </Flex>
              <Button
                type="button"
                w="100%"
                h="100%"
                mt="2rem"
                variant="solid"
                textTransform="capitalize"
              >
                Request Payment
              </Button>
            </Stack>
            <Stack mt="2rem !important">
              <Text fontWeight="700" fontSize={['1rem', '']}>
                Rent Collection
              </Text>
              <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                <PrimarySelect<RentCollectionType>
                  label="How frequently do you want to collect rent?"
                  name="name"
                  error={errors.name}
                  placeholder="How frequently do you want to collect rent?"
                  defaultValue=""
                  register={register}
                  options={['Anually', 'Monthly', 'Daily']}
                />
                <PrimarySelect<RentCollectionType>
                  label="Your Bank"
                  name="name"
                  error={errors.name}
                  placeholder="Your Bank"
                  defaultValue=""
                  register={register}
                  options={['GTB', 'Union bank', 'FCMB']}
                />
                <PrimaryInput<RentCollectionType>
                  label="Your account number"
                  name="name"
                  error={errors.name}
                  placeholder="Your account number"
                  defaultValue=""
                  register={register}
                />
                <Button
                  type="button"
                  w="100%"
                  h="100%"
                  mt="1rem"
                  variant="solid"
                  textTransform="capitalize"
                >
                  Update
                </Button>
              </form>
              <Stack>
                <Text
                  mt="1.5rem !important"
                  fontWeight="700"
                  fontSize={['1rem', '']}
                >
                  Payment History
                </Text>
                <Flex w="full" p=".55rem" mb="1rem">
                  <Box textAlign="left">
                    <Text color="#3F931D">Rent Remittance</Text>
                    <Text color="#545454">
                      <small>23 April 2021</small>
                    </Text>
                  </Box>
                  <Spacer />
                  <Box textAlign="right">
                    <Text fontWeight="700">#2,500,000</Text>
                    <Text color="#545454">
                      <small>GTBank Account</small>
                    </Text>
                  </Box>
                </Flex>
              </Stack>
            </Stack>
          </Box>
        </>
      )}
      {formStep === 4 && (
        <>
          <Box>
            <Text fontWeight="700" fontSize="1.25em">
              Tenancy Agreement
            </Text>
            <Text fontSize="1.25em">Between</Text>
            <Text fontWeight="700" fontSize="1.25em">
              Gideon Oluwasegun Emokpae
            </Text>
            <Text fontSize="1.35em">And</Text>
            <Text fontWeight="700" fontSize="1.35em">
              PropertyMataaz Limited
            </Text>
            <Stack fontSize=".95em" mt="1rem">
              <Text fontWeight="600">
                In respect of the 4 Bedroom Duplex at No. 16 Admiralty Way,
                lekki Phase 1, lekki, Lagos, Nigeria
              </Text><br/>
              <Text>
                <span style={{ textTransform: 'uppercase' }}>
                  THIS TENANCY IS MADE THIS 10TH DAY OF APRIL 2021 BETWEEN
                </span>
                <br />
                <span style={{ textTransform: 'uppercase', fontWeight: '600' }}>
                  GIDEON OLUWASEGUN EMOKPAE
                </span>{' '}
                of 10 Adebayo Titilope Street, Omole Phase 4, Ikeja, Lagos,
                Nigeria (hereinafter to referred to as The Tenant which
                expression shall where the context so admit include his
                successors in title and assigns) of the one part
                <br />
                <br />
                <span style={{ textTransform: 'uppercase' }}> and</span>
                <br />
                <br />
                <span style={{ textTransform: 'uppercase', fontWeight: '600' }}>
                  PROPERTYMATAAZ LIMITED
                </span>
                , a company incorporated in nigeria having its registered office
                at Km 24 Lekki Epe Expressway, oko Ado, Lagos, Nigeria
                <br />
                <br />
                <span style={{ textTransform: 'uppercase', fontWeight: '600' }}>
                  WHEREAS
                </span>
                :
              </Text>
            </Stack>
          </Box>
        </>
      )}
    </>
  );
};

export default LandlordOptions;
