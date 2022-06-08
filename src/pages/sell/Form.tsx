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
import { BiImage } from 'react-icons/bi';
import { PrimaryTextArea } from 'lib/Utils/PrimaryTextArea';
import { NumberCount } from 'lib/Utils/NumberCount';

interface Props {
  propertyTitles: PropertyTitle[];
  propertyTypes: PropertyType[];
  getStates: any[];
  formStep: number;
  setFormStep: any;
  onClose: () => void;
}
const Form = ({
  propertyTitles,
  propertyTypes,
  getStates,
  formStep,
  setFormStep,
  onClose,
}: Props) => {
  const [PropertyUser, { loading, data, error }] =
    useOperationMethod('Propertycreate');

  const schema = yup.object().shape({
    // numberOfBedrooms: yup.string().required(),
    address: yup.string().required(),
    description: yup.string().required(),
    title: yup.string().required(),
    area: yup.string().required(),
    lga: yup.string().required(),
    state: yup.string().required(),
    propertyTypeId: yup.number().required(),
    sellMyself: yup.string().required(),
    name: yup.string().required(),
    numberOfBathrooms: yup.number().when('name', {
      is: () => formStep === 1,
      then: yup.number().required('Please provide info'),
    }),
    price: yup.number().when('name', {
      is: () => formStep === 1,
      then: yup.number(),
    }),
    numberOfBedrooms: yup.number().when('name', {
      is: () => formStep === 1,
      then: yup.number(),
    }),
    // price: yup.number().when('sellMySelf', {
    //   is: () => formStep === 1,
    //   then: yup.number().required('Please provide info'),
    // }),
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
      isForSale: true,
    },
  });

  // (watch('sellMyself'));
  console.log(watch('numberOfBedrooms'));
  watch('numberOfBathrooms');

  const completeFormStep = () => {
    setFormStep((cur: number) => cur + 1);
  };

  // console.log(watch('isDraft'));

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
          {/* <Text cursor={isValid ? 'pointer' : 'no-drop'}>Next</Text> */}
        </Box>
      );
    } else if (formStep === 1) {
      return (
        <Box>
          <HStack spacing={3}>
            <Button
              w="50%"
              // type="submit"
              variant="outline"
              onClick={async () => {
                await setValue('isDraft', true);
                await setValue('isForSale', false);
              }}
              isLoading={loading}
            >
              Save as Draft
            </Button>
            <Box w="50%">
              <ButtonComponent
                content="Submit"
                isValid={isValid}
                loading={loading}
              />
            </Box>
          </HStack>
          <Button w="full" variant="outline" onClick={() => clearPreviewData()}>
            Cancel
          </Button>
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
    console.log({ data });
    try {
      const result = await (await PropertyUser(undefined, data)).data;
      console.log({ result });
      if (result.status) {
        addToast('Property Added', {
          appearance: 'success',
          autoDismiss: true,
        });
        onClose();
        setFormStep(0);
        router.reload();
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
              {formStep === 0 && (
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
                      placeholder="Which state in Nigeria is your property located"
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
                    minH="200px"
                    register={register}
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
                            label={'I want to sell myself'}
                            value={'true'}
                          />
                          <Flex align="center" gap="1" pos="relative">
                            <RadioInput
                              label={'Help me sell'}
                              value={'false'}
                            />
                            <Tooltip label="When we help you sell, your property is listed as verified.">
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
                  <PrimaryInput<PropertyModel>
                    label="Price"
                    name="price"
                    error={errors.price}
                    placeholder="N0"
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

export default Form;
