import {
  Box,
  Stack,
  FormControl,
  FormLabel,
  VStack,
  Button,
  Checkbox,
  HStack,
  Select,
  Flex,
  Tooltip,
  Icon,
  Text,
} from '@chakra-ui/react';

import { PrimaryInput } from 'lib/Utils/PrimaryInput';
import {
  PropertyModel,
  PropertyTitle,
  PropertyType,
  PropertyView,
} from 'types/api';
import ButtonComponent from 'lib/components/Button';
import React, { FormEvent, useEffect, useState } from 'react';
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
import { Widget } from '@uploadcare/react-widget';
import NumberCounter from 'lib/Utils/NumberCounter';
import { BiImage } from 'react-icons/bi';
import { VscDeviceCameraVideo } from 'react-icons/vsc';

interface Props {
  propertyTitles: PropertyTitle[];
  propertyTypes: PropertyType[];
  getStates: any[];
  formStep: number;
  setFormStep: any;
  onClose: () => void;
  item: PropertyModel;
}
const EditPropertyForm = ({
  propertyTitles,
  propertyTypes,
  getStates,
  formStep,
  setFormStep,
  onClose,
  item,
}: Props) => {
  const [PropertyUser, { loading, data, error }] =
    useOperationMethod('Propertyupdate');

  const schema = yup.object().shape({
    address: yup.string().required(),
    description: yup.string().required(),
    title: yup.string().required(),
    area: yup.string().required(),
    lga: yup.string().required(),
    state: yup.string().required(),
    propertyTypeId: yup.number().required(),
    sellMyself: yup.string().required(),
    name: yup.string().required(),
    // numberofBathrooms: yup.number().when('name', {
    //   is: () => formStep === 1,
    //   then: yup.number().required('Please provide info'),
    // }),
    // price: yup.number().when('name', {
    //   is: () => formStep === 1,
    //   then: yup.number().required('Please provide info'),
    // }),
    // numberofBedrooms: yup.number().when('name', {
    //   is: () => formStep === 1,
    //   then: yup.number().required('Please provide info'),
    // }),
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
      name: item.name,
      propertyTypeId: item.propertyTypeId,
      title: item.title,
      state: item.state,
      lga: item.lga,
      area: item.area,
      address: item.description,
      description: item.description,
      sellMyself: item.sellMyself,
      price: item.price,
      numberOfBathrooms: item.numberOfBathrooms,
      numberOfBedrooms: item.numberOfBedrooms,
    },
  });

  // (watch('sellMyself'));
  watch('numberOfBedrooms');
  watch('numberOfBathrooms');

  const completeFormStep = () => {
    setFormStep((cur: number) => cur + 1);
  };

  console.log(watch('state'));

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
    // reset({
    //   name: '',
    //   propertyTypeId: undefined,
    //   title: '',
    //   state: '',
    //   lga: '',
    //   area: '',
    //   address: '',
    //   description: '',
    //   sellMyself: undefined,
    //   price: undefined,
    //   numberOfBathrooms: undefined,
    //   numberOfBedrooms: undefined,
    // });
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
              variant="outline"
              onClick={() => setValue('isDraft', true)}
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

  const onChange = () => {
    console.log('yay!!');
  };

  const onSubmit = async (data: PropertyModel) => {
    data.sellMyself = data.sellMyself as boolean;
    console.log({ data });

    try {
      const result = await (await PropertyUser(undefined, data)).data;
      console.log({ result });
      if (result.status !== 400) {
        addToast('Property Successfully Updated', {
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
        <Stack p="2rem">
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <Box display={formStep === 0 ? 'block' : 'none'}>
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
              <PrimaryInput<PropertyModel>
                label="Description"
                name="description"
                error={errors.description}
                defaultValue=""
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
                        checked={item.sellMyself ? true : false}
                      />
                      <Flex align="center" gap="1" pos="relative">
                        <RadioInput
                          label={'Help me sell'}
                          value={'false'}
                          checked={!item.sellMyself ? true : false}
                        />
                        <Tooltip label="When we help you sell, your property is listed as verified.">
                          <FaInfoCircle />
                        </Tooltip>
                      </Flex>
                    </>
                  }
                />
              </Box>
            </Box>
            <Box display={formStep === 1 ? 'block' : 'none'}>
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
                  onChange={onChange}
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
                <Widget publicKey="fda3a71102659f95625f" onChange={onChange} />
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
            </Box>
            {RenderButton()}
            {/* <>
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
                    <PrimaryInput<PropertyModel>
                      label="Description"
                      name="description"
                      error={errors.description}
                      defaultValue=""
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
                    {/* <Checkbox>I want to sell myself</Checkbox>
                    <Checkbox>Help me sell </Checkbox> */}
            {/* </> */}
            {/* )} */}
            {/* {formStep === 1 && (
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
                        onChange={onChange}
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
                        onChange={onChange}
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
              </>  */}
          </form>
        </Stack>
      </Box>
    </>
  );
};

export default EditPropertyForm;
