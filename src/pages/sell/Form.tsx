import {
  Box,
  Stack,
  FormControl,
  FormLabel,
  Button,
  Checkbox,
  HStack,
  Select,
} from '@chakra-ui/react';

import { PrimaryInput } from 'lib/Utils/PrimaryInput';
import {
  Property,
  PropertyModel,
  PropertyTitle,
  PropertyType,
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

interface Props {
  propertyTitles: PropertyTitle[];
  propertyTypes: PropertyType[];
  getStates: any[];
  formStep: number;
  setFormStep: any;
}
const Form = ({
  propertyTitles,
  propertyTypes,
  getStates,
  formStep,
  setFormStep,
}: Props) => {
  const [PropertyUser, { loading, data, error }] =
    useOperationMethod('PropertyCreate');

  const schema = yup.object().shape({
    // id: yup.string(),
    // dateCreated: yup.string(),
    // dateModified: yup.string(),
    // name: yup.string().required(),
    // address: yup.string().required(),
    // description: yup.string().required(),
    // title: yup.string().required(),
    // numberOfBedrooms: yup.number().required(),
    // numberOfBathrooms: yup.number().required(),
    address: yup.string().required(),
    description: yup.string().required(),
    title: yup.string().required(),
    area: yup.string().required(),
    lga: yup.string().required(),
    state: yup.string().required(),
    propertyTypeId: yup.number().required(),
    sellMyself: yup.string().required(),
    name: yup.string().required(),
    numberofBathrooms: yup.number().when('sellMySelf', {
      is: () => formStep === 1,
      then: yup.number().required('Please provide info'),
    }),
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    getValues,
    formState: { errors, isValid },
  } = useForm<PropertyModel>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  // (watch('sellMyself'));
  const completeFormStep = () => {
    setFormStep((cur: number) => cur + 1);
  };

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
        </Box>
      );
    } else if (formStep === 1) {
      return (
        <Box>
          <HStack spacing={3}>
            <Button>Save as Draft</Button>
            <ButtonComponent
              content="Submit"
              isValid={isValid}
              loading={loading}
            />
          </HStack>
          <Button>Cancel</Button>
        </Box>
      );
    } else {
      return null;
    }
  };

  const { addToast } = useToasts();
  const router = useRouter();

  const onSubmit = async (data: PropertyModel) => {
    console.log({ data });

    // try {
    //   const result = await (await PropertyUser(undefined, data)).data;
    //   console.log({ result });
    //   if (result.status) {
    //     addToast('Property Added', {
    //       appearance: 'success',
    //       autoDismiss: true,
    //     });
    //     router.push('/');
    //     return;
    //   }
    //   addToast(result.message, {
    //     appearance: 'error',
    //     autoDismiss: true,
    //   });
    //   return;
    // } catch (err) {}
  };

  return (
    <>
      <Box>
        <Stack p="2rem">
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
                          <RadioInput label={'Help me sell'} value={'false'} />
                        </>
                      }
                    />
                  </Box>
                  {/* <Checkbox>I want to sell myself</Checkbox>
                  <Checkbox>Help me sell </Checkbox> */}
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
