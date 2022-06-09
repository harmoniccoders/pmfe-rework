import {
  Box,
  Text,
  Stack,
  Button,
  Checkbox,
  Flex,
  HStack,
  Tooltip,
  Icon,
} from '@chakra-ui/react';
import { PrimaryInput } from 'lib/Utils/PrimaryInput';
import { PropertyModel, PropertyTitle, PropertyType } from 'types/api';
import ButtonComponent from 'lib/components/Button';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import { useOperationMethod } from 'react-openapi-client';
import { PrimarySelectKey } from 'lib/Utils/PrimarySelectKey';
import { PrimarySelectLabel } from 'lib/Utils/PrimarySelectLabel';
import { StateSelect } from 'lib/Utils/StateSelect';
import axios from 'axios';
import { RadioButton } from 'lib/Utils/CheckBox/RadioButton';
import RadioInput from 'lib/Utils/CheckBox/RadioInput';
import { FaInfoCircle } from 'react-icons/fa';
import NumberCounter from 'lib/Utils/NumberCounter';
import { VscDeviceCameraVideo } from 'react-icons/vsc';
import { Widget } from '@uploadcare/react-widget';
import { BiImage, BiVideo } from 'react-icons/bi';
import { incomeBracket } from 'lib/Utils/IncomeBracket';
import { rentFrequency } from 'lib/Utils/RentFrequency';
import { tenantTypes } from 'lib/Utils/TenantType';
import { PrimaryTextArea } from 'lib/Utils/PrimaryTextArea';

interface Props {
  propertyTitles: PropertyTitle[];
  propertyTypes: PropertyType[];
  getStates: any[];
  getBanks: any[];
  formStep: number;
  setFormStep: any;
  onClose: () => void;
  isClosed: () => void;
}

const RentForm = ({
  propertyTitles,
  propertyTypes,
  getStates,
  getBanks,
  formStep,
  setFormStep,
  onClose,
  isClosed,
}: Props) => {
  const [PropertyUser, { loading, data, error }] =
    useOperationMethod('Propertycreate');

  const schema = yup.object().shape({
    address: yup.string().required(),
    description: yup.string().required(),
    title: yup.string().required(),
    area: yup.string().required(),
    lga: yup.string().required(),
    state: yup.string().required(),
    propertyTypeId: yup.number().required(),
    rentCollectionTypeId: yup.number(),
    tenantTypeId: yup.number(),
    sellMyself: yup.string().required(),
    name: yup.string().required(),
    bank: yup.string(),
    accountNumber: yup.string(),
    budget: yup.number(),
    numberOfBathrooms: yup.number().when('name', {
      is: () => formStep === 1,
      then: yup.number(),
    }),
    price: yup.number().when('name', {
      is: () => formStep === 1,
      then: yup.number(),
    }),
    numberOfBedrooms: yup.number().when('name', {
      is: () => formStep === 1,
      then: yup.number(),
    }),
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm<PropertyModel>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      isForRent: true,
      isDraft: false,
      isForSale: false,
    },
  });

  watch('numberOfBedrooms');
  watch('numberOfBathrooms');

  const completeFormStep = () => {
    setFormStep((cur: number) => cur + 1);
  };

  console.log(watch('sellMyself'));

  const [lgas, setLgas] = useState([]);

  useEffect(() => {
    const getLga = async (state: string) => {
      const result = (
        await axios.get(
          `http://locationsng-api.herokuapp.com/api/v1/states/${state}/lgas`
        )
      ).data;

      if (Array.isArray(result) === true) {
        setLgas(
          result.map((value: string) => {
            return { name: value };
          })
        );
      }
    };
    getLga(getValues('state') as unknown as string);
  }, [watch('state')]);

  const clearPreviewData = () => {
    setFormStep(0);
    onClose();
  };
  const RenderButton = () => {
    if (formStep === 0) {
      return (
        <>
          {
            //@ts-ignore
            getValues('sellMyself') === 'true' ? (
              <ButtonComponent
                content="Submit"
                isValid={isValid}
                loading={loading}
              />
            ) : (
              <Box onClick={completeFormStep}>
                <Button
                  type="button"
                  w="100%"
                  h="100%"
                  variant="solid"
                  textTransform="capitalize"
                  disabled={isValid ? false : true}
                  isLoading={loading}
                >
                  Next
                </Button>
              </Box>
            )
          }
        </>
      );
    } else if (formStep === 1) {
      return (
        <Box>
          <HStack spacing={3} pt="5">
            <Box w="50%">
              <ButtonComponent
                content="Submit"
                isValid={isValid}
                loading={loading}
              />
            </Box>
            <Button
              w="50%"
              variant="outline"
              onClick={() => clearPreviewData()}
            >
              Cancel
            </Button>
          </HStack>
        </Box>
      );
    } else {
      return null;
    }
  };

  const { addToast } = useToasts();
  const router = useRouter();

  const onSubmit = async (data: PropertyModel) => {
    data.sellMyself = data.sellMyself as boolean;
    console.log('sellmyself', { data });
    try {
      const result = await (await PropertyUser(undefined, data)).data;
      console.log({ result });
      if (result.status !== 400) {
        addToast('Property Added', {
          appearance: 'success',
          autoDismiss: true,
        });
        isClosed();
        onClose();
        setFormStep(0);
        router.push('/rent');
        return;
      }
      addToast(result.message, {
        appearance: 'error',
        autoDismiss: true,
      });
      setFormStep(0);
      onClose();
      return;
    } catch (err) {}
  };
  return (
    <>
      <Box>
        <Stack>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <>
              {formStep == 0 && (
                <>
                  <PrimaryInput<PropertyModel>
                    label="Name"
                    name="name"
                    error={errors.name}
                    placeholder="Give your listing a name that makes it able to find"
                    defaultValue=""
                    register={register}
                  />
                  <PrimarySelectKey<PropertyModel>
                    label="Type"
                    name="propertyTypeId"
                    register={register}
                    error={errors.propertyTypeId}
                    control={control}
                    options={propertyTypes}
                    placeholder="Choose a Property"
                  />
                  <PrimarySelectLabel<PropertyModel>
                    label="Property Title"
                    name="title"
                    register={register}
                    error={errors.title}
                    control={control}
                    options={propertyTitles}
                    placeholder="Certificate of Occupancy, Governor's Consent ..."
                  />
                  <StateSelect<PropertyModel>
                    label="State"
                    name="state"
                    register={register}
                    error={errors.state}
                    control={control}
                    options={getStates}
                    placeholder="Which state in Nigeria is your property located"
                  />
                  {getValues('state') !== undefined ? (
                    <StateSelect<PropertyModel>
                      label="LGA"
                      name="lga"
                      register={register}
                      error={errors.lga}
                      control={control}
                      options={lgas}
                      placeholder="Choose a Local Government"
                    />
                  ) : null}

                  <PrimaryInput<PropertyModel>
                    label="Area"
                    name="area"
                    error={errors.area}
                    defaultValue=""
                    register={register}
                  />
                  <PrimaryInput<PropertyModel>
                    label="Address"
                    name="address"
                    error={errors.address}
                    defaultValue=""
                    register={register}
                  />
                  <PrimaryTextArea<PropertyModel>
                    label="Description"
                    name="description"
                    error={errors.description}
                    defaultValue=""
                    minH='200px'
                    register={register}
                  />
                  <PrimaryInput<PropertyModel>
                    label="Rent (Per year)"
                    name="price"
                    error={errors.price}
                    placeholder="₦00.00"
                    type="number"
                    defaultValue=""
                    register={register}
                  />
                  <Box pos="relative">
                    <Icon as={BiImage} pos="absolute" top="55%" left="6%" />
                    <Widget
                      publicKey="fda3a71102659f95625f"
                      //@ts-ignore
                      id="file"
                      // onChange={onChange}
                      imagesOnly
                    />
                  </Box>
                  <Box pos="relative">
                    <Icon
                      as={VscDeviceCameraVideo}
                      pos="absolute"
                      top="55%"
                      left="6%"
                    />
                    <Widget
                      publicKey="fda3a71102659f95625f"
                      // onChange={onChange}
                    />
                  </Box>
                  <NumberCounter
                    valueName="numberOfBedrooms"
                    setValue={setValue}
                    getValues={getValues}
                    label="Number of Bedrooms"
                    fontSize="sm"
                  />
                  <NumberCounter
                    valueName="numberOfBathrooms"
                    setValue={setValue}
                    getValues={getValues}
                    label="Number of Bathrooms"
                    fontSize="sm"
                  />
                  <Box my="1.3em">
                    <RadioButton<PropertyModel>
                      name="sellMyself"
                      register={register}
                      defaultValue=""
                      error={errors.sellMyself}
                      control={control}
                      radios={
                        <>
                          <RadioInput
                            label={'I want to manage the tenant myself'}
                            value={'true'}
                          />
                          <Flex align="center" gap="1" pos="relative">
                            <RadioInput
                              label={'Help me manage my tenant'}
                              value={'false'}
                            />
                            <Tooltip
                              label="We help you rent out your property."
                              aria-label="A tooltip"
                            >
                              <FaInfoCircle />
                            </Tooltip>
                          </Flex>
                        </>
                      }
                    />
                  </Box>
                </>
              )}
              {formStep === 1 && (
                <>
                  <Box>
                    <Text fontWeight="600" fontSize="sm">
                      What kind of tenants do you want?
                    </Text>
                    <PrimarySelectKey<PropertyModel>
                      label="Type"
                      name="tenantTypeId"
                      register={register}
                      error={errors.tenantTypeId}
                      control={control}
                      options={tenantTypes}
                      fontSize="sm"
                      placeholder="Choose an option"
                    />
                    <PrimarySelectKey<PropertyModel>
                      label="Annual Income Bracket"
                      name="budget"
                      register={register}
                      error={errors.budget}
                      control={control}
                      options={incomeBracket}
                      placeholder="Choose a property type"
                      fontSize="sm"
                    />
                  </Box>
                  <Box mt="8">
                    <Text fontWeight="600" fontSize="sm">
                      Rent Collection
                    </Text>
                    <PrimarySelectKey<PropertyModel>
                      label="How Frequently do you want to collect rent?"
                      name="rentCollectionTypeId"
                      register={register}
                      error={errors.rentCollectionTypeId}
                      control={control}
                      options={rentFrequency}
                      fontSize="sm"
                      placeholder="Choose option: weekly, monthly, yearly"
                    />
                    <PrimarySelectKey<PropertyModel>
                      label="Your Bank"
                      name="bank"
                      register={register}
                      error={errors.bank}
                      control={control}
                      options={getBanks}
                      placeholder="Choose your bank"
                      fontSize="sm"
                    />
                    <PrimaryInput<PropertyModel>
                      label="Your Account Number"
                      name="accountNumber"
                      placeholder="Enter your bank account number"
                      defaultValue=""
                      register={register}
                      error={errors.accountNumber}
                      fontSize="sm"
                    />
                  </Box>
                </>
              )}
              {RenderButton()}
            </>
          </form>
        </Stack>
      </Box>
    </>
  );
};

export default RentForm;
