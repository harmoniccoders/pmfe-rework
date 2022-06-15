import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  HStack,
  Flex,
  Image,
  ModalBody,
  VStack,
  Box,
  Button,
  Text,
} from '@chakra-ui/react';
import ApplicationForm from 'lib/components/ApplicationForm';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { PropertyModel } from 'types/api';
import { PrimaryInput } from 'lib/Utils/PrimaryInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useOperationMethod } from 'react-openapi-client';
import { ApplicationModel } from 'types/api';
import { PrimarySelect } from 'lib/Utils/PrimarySelect';
import { useToasts } from 'react-toast-notifications';
import Cookies from 'js-cookie';
import ButtonComponent from 'lib/components/Button';
import { PrimaryDate } from 'lib/Utils/PrimaryDate';

type Props = {
  onClose: any;
  isOpen: boolean;
  data: any;
  setStep: Dispatch<SetStateAction<number>>;
};

const SubmitApplicationModal = ({ onClose, isOpen, data, setStep }: Props) => {
  const [SubmitApplication, { loading, data: isData, error }] =
    useOperationMethod('Applicationnew');
  // console.log({ data });

  const [formStep, setFormStep] = useState<number>(0);

  // const [getResult, setGetResult] = useState([]);

  const mobile = /^([0]{1})[0-9]{10}$/;
  const schema = yup.object().shape({
    register: yup.object({
      firstName: yup.string().required(),
      middleName: yup.string().required(),
      lastName: yup.string().required(),
      email: yup.string().email().required(),
      phoneNumber: yup.string().matches(mobile, 'Invalid phone number'),
      dateOfBirth: yup.string().required(),
      occupation: yup.string().when('firstName', {
        is: () => formStep === 1,
        then: yup.string().required(),
      }),
      companyName: yup.string().when('firstName', {
        is: () => formStep === 1,
        then: yup.string().required(),
      }),
      workAddress: yup.string().when('firstName', {
        is: () => formStep === 1,
        then: yup.string().required(),
      }),
      nationality: yup.string().required(),
      maritalStatus: yup.string().required(),
    }),

    // nextOfKin: yup.object({
    //   firstName: yup.string().required(),
    //   lastName: yup.string().required(),
    //   email: yup.string().email().required(),
    //   phoneNumber: yup.string().matches(mobile, 'Invalid phone number'),
    //   address: yup.string().required(),
    //   relationship: yup.string().required(),
    // }),
  });

  const users = Cookies.get('user') as unknown as string;
  let user;
  if (users !== undefined) {
    user = JSON.parse(users);
  }

  let propertyId = data.id;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm<ApplicationModel>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const { addToast } = useToasts();
  const completeFormStep = () => {
    setFormStep((cur: number) => cur + 1);
  };
  const RenderButton = () => {
    if (formStep === 0) {
      return (
        <Box onClick={completeFormStep}>
          <Button
            type="button"
            w="100%"
            h="100%"
            mt="1.5rem"
            variant="solid"
            textTransform="capitalize"
            disabled={isValid ? false : true}
          >
            Next
          </Button>
        </Box>
      );
    } else if (formStep === 1) {
      return (
        <Box>
          <ButtonComponent
            content="Submit"
            isValid={isValid}
            loading={loading}
          />
        </Box>
      );
    } else {
      return null;
    }
  };

  const onSubmit = async (data: ApplicationModel) => {
    data.register
      ? (data.register.dateOfBirth = new Date(
          data.register?.dateOfBirth as unknown as Date
        ).toLocaleDateString())
      : null;
    data.propertyId = propertyId;
    data.applicationTypeId = 1;
    console.log({ data });
    try {
      const result = await (await SubmitApplication(undefined, data)).data;
      console.log({ result });

      if (result.status) {
        setStep(2);
        // setGetResult(result.data);
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
    } catch (error) {
      console.log(error);
    }
  };

  const CountryList = require('country-list').getNames();

  const maritalStatus = [
    {
      id: 1,
      name: 'Single',
    },
    {
      id: 2,
      name: 'Married',
    },
    {
      id: 3,
      name: 'Divorced',
    },
    {
      id: 4,
      name: 'Widowed',
    },
    {
      id: 5,
      name: 'Others',
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />

      <ModalContent
        py={5}
        borderRadius="0"
        w={['88%', '80%']}
        overflowY="scroll"
        maxH="100vh"
        pos="fixed"
        mt="0rem"
        mb="1rem"
      >
        <ModalHeader>
          <HStack
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Text
              onClick={formStep < 1 ? onClose : () => setFormStep(formStep - 1)}
              display="flex"
              alignItems="center"
              fontSize="14px"
              cursor="pointer"
              fontWeight={600}
            >
              <span
                className="fal fa-angle-left"
                style={{ marginRight: '5px', fontWeight: 600 }}
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
          </HStack>
        </ModalHeader>

        <ModalBody>
          <VStack alignItems="flex-start" spacing={3} width="100%">
            <Text fontWeight={600} fontSize="16px">
              {data.name}
            </Text>

            <Text fontWeight={600} color="brand.100" textTransform="capitalize">
              Application form
            </Text>

            {/* <ApplicationForm
              formStep={formStep}
              setFormStep={setFormStep}
              setStep={setStep}
              onClose={onClose}
            /> */}

            <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
              <>
                {formStep === 0 && (
                  <>
                    <PrimaryInput<ApplicationModel>
                      label="first name"
                      name="register.firstName"
                      error={errors.register?.firstName}
                      placeholder="Type in your first name"
                      defaultValue={user?.firstName || ''}
                      register={register}
                    />

                    <PrimaryInput<ApplicationModel>
                      label="middle name"
                      name="register.middleName"
                      error={errors.register?.middleName}
                      placeholder="Type in your middle name"
                      defaultValue={user?.middleName || ''}
                      register={register}
                    />

                    <PrimaryInput<ApplicationModel>
                      label="last name"
                      name="register.lastName"
                      error={errors.register?.lastName}
                      placeholder="Type in your middle name"
                      defaultValue={user?.lastName || ''}
                      register={register}
                    />

                    <PrimaryInput<ApplicationModel>
                      label="mobile number"
                      name="register.phoneNumber"
                      error={errors.register?.phoneNumber}
                      placeholder="Enter your mobile number"
                      defaultValue={user?.phoneNumber || ''}
                      register={register}
                    />

                    <PrimaryInput<ApplicationModel>
                      label="email"
                      name="register.email"
                      error={errors.register?.email}
                      placeholder="Enter your email"
                      defaultValue={user?.email || ''}
                      type="email"
                      register={register}
                    />
                    <PrimaryInput<ApplicationModel>
                      label="Residential Address"
                      name="register.address"
                      error={errors.register?.address}
                      placeholder="Enter your address"
                      defaultValue={user?.address || ''}
                      register={register}
                    />

                    <PrimaryDate<ApplicationModel>
                      label="Date of Birth"
                      name="register.dateOfBirth"
                      error={errors.register?.dateOfBirth}
                      register={register}
                      control={control}
                      fontSize="sm"
                      maxDate={new Date()}
                      defaultValue={user?.dateOfBirth || ''}
                    />

                    <PrimarySelect<ApplicationModel>
                      label="nationality"
                      name="register.nationality"
                      error={errors.register?.nationality}
                      placeholder="Select your nationality"
                      register={register}
                      defaultValue={user?.nationality || ''}
                      options={
                        <>
                          {CountryList.map((country: any, i: number) => {
                            return (
                              <option value={country} key={i}>
                                {country}
                              </option>
                            );
                          })}
                        </>
                      }
                    />

                    <PrimarySelect<ApplicationModel>
                      label="marital status"
                      name="register.maritalStatus"
                      error={errors.register?.maritalStatus}
                      placeholder="Select your Status"
                      register={register}
                      defaultValue={user?.maritalStatus}
                      options={
                        <>
                          {maritalStatus.map((x: any) => {
                            return <option value={x.name}>{x.name}</option>;
                          })}
                        </>
                      }
                    />
                  </>
                )}
                {formStep === 1 && (
                  <>
                    <PrimaryInput<ApplicationModel>
                      label="occupation"
                      name="register.occupation"
                      error={errors.register?.occupation}
                      placeholder="Type in your occupation"
                      defaultValue=""
                      register={register}
                    />

                    <PrimaryInput<ApplicationModel>
                      label="employer"
                      name="register.companyName"
                      error={errors.register?.companyName}
                      placeholder="Type in your companyName"
                      defaultValue=""
                      register={register}
                    />

                    <PrimaryInput<ApplicationModel>
                      label="work address"
                      name="register.workAddress"
                      error={errors.register?.workAddress}
                      placeholder="Type in your work address"
                      defaultValue=""
                      register={register}
                    />

                    <Text
                      fontSize="14px"
                      fontWeight={600}
                      lineHeight={1.5}
                      my="1rem"
                    >
                      Next of kin
                    </Text>

                    <PrimaryInput<ApplicationModel>
                      label="first name"
                      name="nextOfKin.firstName"
                      error={errors.nextOfKin?.firstName}
                      placeholder="Type in your first name"
                      defaultValue=""
                      register={register}
                    />

                    <PrimaryInput<ApplicationModel>
                      label="last name"
                      name="nextOfKin.lastName"
                      error={errors.nextOfKin?.lastName}
                      placeholder="Type in your middle name"
                      defaultValue=""
                      register={register}
                    />

                    <PrimaryInput<ApplicationModel>
                      label="mobile number"
                      name="nextOfKin.phoneNumber"
                      error={errors.nextOfKin?.phoneNumber}
                      placeholder="Enter your mobile number"
                      defaultValue=""
                      register={register}
                    />

                    <PrimaryInput<ApplicationModel>
                      label="email"
                      name="nextOfKin.email"
                      error={errors.nextOfKin?.email}
                      placeholder="Enter your email"
                      defaultValue=""
                      type="email"
                      register={register}
                    />

                    <PrimaryInput<ApplicationModel>
                      label="work address"
                      name="nextOfKin.address"
                      error={errors.nextOfKin?.address}
                      placeholder="Type in your work address"
                      defaultValue=""
                      register={register}
                    />

                    <PrimaryInput<ApplicationModel>
                      label="relationship"
                      name="nextOfKin.relationship"
                      error={errors.nextOfKin?.relationship}
                      placeholder="Type in your relationship"
                      defaultValue=""
                      register={register}
                    />
                  </>
                )}
                {RenderButton()}
              </>
            </form>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SubmitApplicationModal;
