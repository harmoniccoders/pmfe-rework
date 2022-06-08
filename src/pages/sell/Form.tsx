import {
  Box,
<<<<<<< HEAD
  Text,
  Grid,
  Stack,
  FormLabel,
  Image,
  Input,
  Button,
  CheckBox,
  InputGroup,
  Flex,
  Divider,
} from '@chakra-ui/react';
import { PrimaryInput } from 'lib/Utils/PrimaryInput';
import { Property } from 'types/api';
=======
  Stack,
  FormControl,
  FormLabel,
  InputLeftElement,
  Input,
  InputGroup,
  VStack,
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
>>>>>>> 0bc8ab9c186d0f28d6a2ed0ec6b861e61fa4bff9
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
import { PrimaryTextbox } from './../../lib/Utils/PrimaryTextbox';
import { Widget } from '@uploadcare/react-widget'
import { BiImage, BiVideo } from 'react-icons/bi'

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

  const renderButton = () => {
    if (formStep === 2) {
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


  const onSubmit = async (data: Property) => {
    try {
      const result = await (await PropertyUser(undefined, data)).data;
      console.log({ result });
      if (result.status) {
        addToast('Property Added', {
          appearance: 'success',
          autoDismiss: true,
        });
        router.push('/');
        return;
      }
      addToast(result.message, {
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

        <Stack>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <PrimaryInput
              label="id"
              name="id"
              error={errors.id}
              defaultValue=""
              style={{ display: 'none' }}
            />
            <PrimaryInput
              label="id"
              name="dateCreated"
              error={errors.dateCreated}
              defaultValue=""
              register={register}
              style={{ display: 'none' }}
            />
            <PrimaryInput
              label="id"
              name="dateModified"
              error={errors.dateModified}
              defaultValue=""
              register={register}
              style={{ display: 'none' }}
            />

            <PrimaryInput
              label="Name"
              name="name"
              error={errors.name}
              defaultValue=""
              register={register}
            />
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
                <PrimaryTextbox<PropertyModel>
                  label="Description"
                  name="description"
                  error={errors.description}
                  defaultValue=""
                  type=''
                  register={register}
                />
                <VStack spacing={2} mt='1rem' mb='1rem' textAlign='left' float='left'>
                  <Checkbox>I want to sell myself</Checkbox>
                  <Checkbox>Help me sell </Checkbox>
                </VStack>
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
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<BiImage color='gray.300' />}
                  />
                  <Input type='tel' placeholder='Upload Picture' disabled/>
                </InputGroup>

                <Widget publicKey='fda3a71102659f95625f' onChange={onChange}/>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<BiVideo color='gray.300' />}
                  />
                  <Input type='tel' placeholder='Upload Video' disabled />

                  <Widget publicKey='fda3a71102659f95625f' onChange={onChange}/>
                </InputGroup>
              </>
            )}

    <Button
        onClick={completeFormStep}
        color="white"
        bg="brand.100"
        w="100%"
        borderRadius="8px"
        cursor="pointer"
      >
        Next
      </Button>

          </form>
        </Stack>
      </Box>
    </>
  );
};

export default Form;
