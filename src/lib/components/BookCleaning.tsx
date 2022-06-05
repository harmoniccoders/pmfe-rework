import {
  Box,
  Divider,
  Flex,
  Heading,
  Image,
  Text,
  Link,
  Button,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import ButtonComponent from 'lib/components/Button';
import React, { FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// import { Register } from 'types/api';
import { CleaningModel } from 'types/api';
import { useOperationMethod } from 'react-openapi-client';
import { PrimaryInput } from 'lib/Utils/PrimaryInput';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import cookies from 'js-cookie';

const schema = yup.object().shape({
  fileName: yup.string(),
  buildingType: yup.string(),
  buildingState: yup.string(),
  dateNeeded: yup.string().required(),
  numberOfBedrooms: yup.number().required(),
  numberOfBathrooms: yup.number().required(),
  numberOfFloors: yup.number().required(),
});

const BookCleaning = () => {
  const [CleanRequest, { loading, data, error }] =
    useOperationMethod('Cleanrequest');
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CleaningModel>({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const { addToast } = useToasts();
  const router = useRouter();

  const onSubmit = async (data: CleaningModel) => {
    try {
      const result = await (await CleanRequest(undefined, data)).data;
      console.log({ result });
      if (result.status) {
        addToast('Application created sucessfully', {
          appearance: 'success',
          autoDismiss: true,
        });
        return;
      }
      addToast(result.message, {
        appearance: 'error',
        autoDismiss: true,
      });
      return;
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box width="90%" mx="auto" mt={['1.875rem', '2.3rem']}>
      <Text fontWeight="600" color="brand.100" fontSize="sm">
        Book Cleaning Session
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <PrimaryInput<CleaningModel>
          label="When do you want the cleaning done?"
          name="dateNeeded"
          error={errors.dateNeeded}
          placeholder="06/04/2022"
          defaultValue=""
          type="date"
          register={register}
        />
        <ButtonComponent
          content="Get Qoute"
          isValid={isValid}
          loading={loading}
        /> */}
      </form>
      <Button variant="outline" w="full" color="gray" fontWeight="100">
        Cancel
      </Button>
    </Box>
  );
};

export default BookCleaning;
