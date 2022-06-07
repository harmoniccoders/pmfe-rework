import {
  Box,
  Stack,
  FormControl,
  FormLabel,
  Button,
  Checkbox,
  HStack,
} from '@chakra-ui/react';

import { PrimaryInput } from 'lib/Utils/PrimaryInput';
//import { PrimarySelect } from 'lib/Uti;s/PrimarySelect'
import {
  Property,
  PropertyModel,
  PropertyTitle,
  PropertyType,
} from 'types/api';
import ButtonComponent from 'lib/components/Button';
import React, { FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import { useOperationMethod } from 'react-openapi-client';
import { PrimarySelectKey } from 'lib/Utils/PrimarySelectKey';
import { PrimarySelectLabel } from 'lib/Utils/PrimarySelectLabel';
import { StateSelect } from 'lib/Utils/StateSelect';

const schema = yup.object().shape({
  id: yup.string(),
  dateCreated: yup.string(),
  dateModified: yup.string(),
  name: yup.string().required(),
  address: yup.string().required(),
  description: yup.string().required(),
  title: yup.string().required(),
  numberOfBedrooms: yup.number().required(),
  numberOfBathrooms: yup.number().required(),
});

interface Props {
  propertyTitles: PropertyTitle[];
  propertyTypes: PropertyType[];
  getStates: any[];
}
const Form = ({
  propertyTitles,
  propertyTypes,
  getStates,
}: {
  propertyTitles: PropertyTitle[];
  propertyTypes: PropertyType[];
  getStates: any[];
}) => {
  const [formStep, setFormStep] = useState(0);
  console.log({ propertyTypes });

  const [PropertyUser, { loading, data, error }] =
    useOperationMethod('PropertyCreate');

  const completeFormStep = () => {
    setFormStep((cur) => cur + 1);
  };

  const RenderButton = () => {
    if (formStep > 1) {
      return null;
    } else if (formStep === 1) {
      return (
        <>
          <Box>
            <HStack spacing={3}>
              <Button>Save as Draft</Button>
              <Button>Submit</Button>
            </HStack>
            <Button>Cancel</Button>
          </Box>
        </>
      );
    } else
      <Button
        onClick={completeFormStep}
        color="white"
        bg="brand.100"
        w="100%"
        borderRadius="8px"
        cursor="pointer"
      >
        Next
      </Button>;
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<PropertyModel>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

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
                {/* <PrimarySelectLabel<PropertyModel>
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
                /> */}

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

                <Checkbox>I want to sell myself</Checkbox>
                <Checkbox>Help me sell </Checkbox>
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

            {RenderButton}
          </form>
        </Stack>
      </Box>
    </>
  );
};

export default Form;
