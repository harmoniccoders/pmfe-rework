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
  Icon,
  SimpleGrid,
  Heading,
} from '@chakra-ui/react';
import ApplicationForm from 'lib/components/ApplicationForm';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { MediaModel, PropertyModel } from 'types/api';
import { useRouter } from 'next/router';
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
import { Widget } from '@uploadcare/react-widget';
import { BiImage } from 'react-icons/bi';
import { SRLWrapper } from 'simple-react-lightbox';
import { CurrencyField } from 'lib/Utils/CurrencyInput';
// import loanDetails from 'lib/Utils/loanDetails';
import moment from 'moment';

type Props = {
  onClose: any;
  isOpen: boolean;
};
type LoanDetails = {
  reliefAmount: number;
  payBackDate: any;
  startDate: any;
};
const RentReliefModal = ({ onClose, isOpen }: Props) => {
  const [RentRelief, { loading, data: isData, error }] =
    useOperationMethod('Applicationnew');
  // console.log({ data });
  const router = useRouter();
  const [formStep, setFormStep] = useState<number>(0);
  const [uploadedId, setUploadedId] = useState<MediaModel[]>([]);
  const [uploadedPassport, setUploadedPassport] = useState<MediaModel[]>([]);

  const widgetApiss = useRef();
  const widgetApis = useRef();

  const mobile = /^([0]{1})[0-9]{10}$/;
  const schema = yup.object().shape({
    // register: yup.object({
    //   firstName: yup.string().required(),
    //   middleName: yup.string(),
    //   lastName: yup.string().required(),
    //   email: yup.string().email().required(),
    //   phoneNumber: yup.string().matches(mobile, 'Invalid phone number'),
    //   dateOfBirth: yup.string().required(),
    //   passportPhotograph: yup.string().required(),
    //   workId: yup.string().required(),
    //   occupation: yup.string().when('firstName', {
    //     is: () => formStep === 1,
    //     then: yup.string().required(),
    //   }),
    //   companyName: yup.string().when('firstName', {
    //     is: () => formStep === 1,
    //     then: yup.string().required(),
    //   }),
    //   annualIncome: yup.string().when('firstName', {
    //     is: () => formStep === 1,
    //     then: yup.string().required(),
    //   }),
    //   workAddress: yup.string().when('firstName', {
    //     is: () => formStep === 1,
    //     then: yup.string().required(),
    //   }),
    //   nationality: yup.string().required(),
    //   maritalStatus: yup.string().required(),
    // }),
    // reliefAmount: yup.number().when('firstName', {
    //   is: () => formStep === 2,
    //   then: yup.number().required(),
    // }),
    // payBackDate: yup.string().when('firstName', {
    //   is: () => formStep === 2,
    //   then: yup.string().required(),
    // }),
    // repaymentFrequency: yup.string().when('firstName', {
    //   is: () => formStep === 2,
    //   then: yup.string().required(),
    // }),
  });

  const users = Cookies.get('user') as unknown as string;
  let user: any;
  if (users !== undefined) {
    user = JSON.parse(users);
  }

  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors, isValid },
  } = useForm<ApplicationModel>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  let reliefAmount = getValues('reliefAmount') || 0;
  let payBackDate = getValues('payBackDate') || moment().format('YYYY-MM-DD');
  let repaymentFrequencyValue = getValues('repaymentFrequency') || 'monthly';
  const startDate = moment().format('YYYY-MM-DD');
  const interestRate = 15;
  const interest = (interestRate / 100) * reliefAmount;
  const totalPayment = interest + reliefAmount;
  // const payments = payBackDate
  //   .format('YYYY-MM-DD')
  //   .diff(startDate, repaymentFrequencyValue);
  // const installments = totalPayment / payments;

  let uploadPassport;
  let uploadId;
  const onChangePassport = async (info: any) => {
    uploadPassport = await groupInfo(info.uuid);
    let medias: MediaModel[] = [];

    uploadPassport.files.forEach((file: any) => {
      let newMedia: MediaModel = {
        url: file.original_file_url,
        isImage: true,
        isVideo: false,
        name: '',
        extention: '',
        base64String: '',
      };
      medias.push(newMedia);
    });
    setUploadedPassport([...uploadedPassport, ...medias]);
  };
  const onChangeId = async (info: any) => {
    uploadId = await groupInfo(info.uuid);
    let medias: MediaModel[] = [];
    uploadId.files.forEach((file: any) => {
      let newMedia: MediaModel = {
        url: file.original_file_url,
        isImage: true,
        isVideo: false,
        name: '',
        extention: '',
        base64String: '',
      };
      medias.push(newMedia);
    });
    setUploadedId([...uploadedId, ...medias]);
  };

  const groupInfo = async (uuid: string) => {
    const result = await fetch(`https://api.uploadcare.com/groups/${uuid}/`, {
      headers: {
        Accept: 'application/vnd.uploadcare-v0.5+json',
        authorization:
          'Uploadcare.Simple fda3a71102659f95625f:dcdc4ba3595b6be5fc0d',
      },
    });

    let res = await result.json();
    return res;
  };

  const { addToast } = useToasts();

  const completeFormStep = () => {
    setFormStep((cur: number) => cur + 1);
  };

  const RenderButton = () => {
    if (formStep === 0 || formStep === 1) {
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
    } else {
      return (
        <Box>
          <ButtonComponent
            content="Apply for Rent Relief"
            isValid={isValid}
            loading={loading}
          />
        </Box>
      );
      // } else {
      //   return null;
    }
  };

  const onSubmit = async (data: ApplicationModel) => {
    data.register
      ? (data.register.dateOfBirth = new Date(
          data.register?.dateOfBirth as unknown as Date
        ).toLocaleDateString())
      : null;
    data.payBackDate = new Date(
      data.payBackDate as unknown as Date
    ).toLocaleDateString();

    data.applicationTypeId = 5;
    // data.register!.passportPhotograph= uploadedPassport;
    // data.register!.workId = uploadedId;

    console.log({ data });
    try {
      const result = await (await RentRelief(undefined, data)).data;
      console.log({ result });

      if (result.status != 400) {
        addToast(
          'Your application has been submitted. You will be notified when your rent Relief is disbursed',
          {
            appearance: 'success',
            autoDismiss: true,
          }
        );
        onClose();
        router.push('/my-rent/rent-relief');
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

  const repaymentFrequency = [
    {
      id: 1,
      name: 'Weekly',
    },
    {
      id: 2,
      name: 'Monthly',
    },
    {
      id: 3,
      name: 'One-off',
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      closeOnOverlayClick={false}
      onClose={onClose}
      size="lg"
      isCentered
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent
        py={5}
        borderRadius="0"
        overflowY="auto"
        h="100vh"
        pos="fixed"
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
          </HStack>
        </ModalHeader>
        <ModalBody>
          <VStack alignItems="flex-start" spacing={3} width="100%">
            <Text fontWeight={600} color="brand.100" textTransform="capitalize">
              Rent Relief form
            </Text>

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
                    <CurrencyField<ApplicationModel>
                      label="what is your annual income"
                      defaultValue=""
                      register={register}
                      error={errors.register?.annualIncome}
                      name="register.annualIncome"
                      control={control}
                      placeholder="This can be your annual salary of an estimated income "
                    />
                    <Box>
                      <Flex
                        w="full"
                        border="1px solid grey"
                        height="3rem"
                        px="1rem"
                        align="center"
                        my="1.5rem"
                        cursor="pointer"
                        borderRadius="6px" //@ts-ignore
                        onClick={() => widgetApiss.current.openDialog()}
                      >
                        <Icon as={BiImage} />
                        <Text fontWeight="500" pl="1rem">
                          Upload Passport Photograph
                        </Text>
                      </Flex>
                      <Widget
                        publicKey="fda3a71102659f95625f"
                        //@ts-ignore
                        id="file"
                        multiple
                        imageShrink="640x480"
                        multipleMax={1}
                        imagePreviewMaxSize={9}
                        imagesOnly
                        onChange={(info) => onChangePassport(info)}
                        //@ts-ignore
                        ref={widgetApiss}
                      />
                      {uploadedPassport.length > 0 && (
                        <>
                          <HStack w="full" spacing="1rem" overflow="auto">
                            {uploadedPassport
                              .filter((m) => m.isImage)
                              .map((item: any) => {
                                return (
                                  <SRLWrapper>
                                    <Box
                                      w="90px"
                                      h="90px"
                                      borderRadius="5px"
                                      bgColor="brand.50"
                                      flexShrink={0}
                                      overflow="hidden"
                                    >
                                      <Image
                                        src={item.url}
                                        alt="propery-image"
                                        w="100%"
                                        height="100%"
                                        objectFit="cover"
                                      />
                                    </Box>
                                  </SRLWrapper>
                                );
                              })}
                          </HStack>
                        </>
                      )}
                    </Box>
                    <Box>
                      <Flex
                        w="full"
                        border="1px solid grey"
                        height="3rem"
                        px="1rem"
                        align="center"
                        my="1.5rem"
                        cursor="pointer"
                        borderRadius="6px" //@ts-ignore
                        onClick={() => widgetApis.current.openDialog()}
                      >
                        <Icon as={BiImage} />
                        <Text fontWeight="500" pl="1rem">
                          Upload a Work ID
                        </Text>
                      </Flex>
                      <Widget
                        publicKey="fda3a71102659f95625f"
                        //@ts-ignore
                        id="file"
                        imageShrink="640x480"
                        imagePreviewMaxSize={9}
                        imagesOnly
                        multiple
                        multipleMax={1}
                        onChange={(info) => onChangeId(info)}
                        //@ts-ignore
                        ref={widgetApis}
                      />
                      {uploadedId.length > 0 && (
                        <>
                          <HStack w="full" spacing="1rem" overflow="auto">
                            {uploadedId
                              .filter((m) => m.isImage)
                              .map((item: any) => {
                                return (
                                  <SRLWrapper>
                                    <Box
                                      w="90px"
                                      h="90px"
                                      borderRadius="5px"
                                      bgColor="brand.50"
                                      flexShrink={0}
                                      overflow="hidden"
                                    >
                                      <Image
                                        src={item.url}
                                        alt="propery-image"
                                        w="100%"
                                        height="100%"
                                        objectFit="cover"
                                      />
                                    </Box>
                                  </SRLWrapper>
                                );
                              })}
                          </HStack>
                        </>
                      )}
                    </Box>

                    <Text
                      fontSize="14px"
                      fontWeight={600}
                      lineHeight={1.5}
                      mt="1.5rem"
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
                {formStep === 2 && (
                  <>
                    <CurrencyField<ApplicationModel>
                      placeholder="How much Rent Relief do you need?"
                      defaultValue=""
                      register={register}
                      error={errors.reliefAmount}
                      name={'reliefAmount'}
                      control={control}
                      label="Relief Amount"
                    />
                    <PrimaryDate<ApplicationModel>
                      label="Choose a pay back date"
                      name="payBackDate"
                      error={errors.payBackDate}
                      register={register}
                      control={control}
                      minDate={new Date()}
                      maxDate={new Date(2023, 10, 1)}
                    />
                    <PrimarySelect<ApplicationModel>
                      label="How do you want to pay back?"
                      name="repaymentFrequency"
                      error={errors.repaymentFrequency}
                      placeholder="Weekly, Monthly, One-off"
                      register={register}
                      defaultValue=""
                      options={
                        <>
                          {repaymentFrequency.map((x: any) => {
                            return (
                              <option value={x.name} key={x.id}>
                                {x.name}
                              </option>
                            );
                          })}
                        </>
                      }
                    />
                    <Box my="10">
                      <Heading fontSize="18px" pb="5">
                        Preview
                      </Heading>
                      <SimpleGrid columns={2} spacing="3">
                        <Box>
                          <Text>Loan Amount</Text>
                          <Text fontWeight="600">
                            ₦{getValues('reliefAmount')}
                          </Text>
                        </Box>
                        <Box>
                          <Text>Interest </Text>
                          <Text fontWeight="600">
                            15% {getValues('repaymentFrequency')}
                          </Text>
                        </Box>
                        <Box>
                          <Text>Total Repayment</Text>
                          <Text fontWeight="600">₦{totalPayment}</Text>
                        </Box>
                        <Box>
                          <Text>Installments</Text>
                          <Text fontWeight="600">
                            ₦ 30,555
                            {/* {installments}/{getValues('repaymentFrequency')} */}
                          </Text>
                        </Box>
                      </SimpleGrid>
                    </Box>
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

export default RentReliefModal;
