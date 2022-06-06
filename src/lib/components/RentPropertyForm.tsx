import { Box, Text, Button, VStack, HStack, Checkbox } from '@chakra-ui/react';
import NextLink from 'next/link';
import ButtonComponent from 'lib/components/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CleaningModel, PropertyType } from 'types/api';
import { useOperationMethod } from 'react-openapi-client';
import { PrimaryInput } from 'lib/Utils/PrimaryInput';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import cookies from 'js-cookie';
import { PrimarySelectKey } from 'lib/Utils/PrimarySelectKey';
import NumberCounter from 'lib/Utils/NumberCounter';
import { useState } from 'react';
import { buildingState } from 'lib/Utils/BuildingStates';
import { PrimarySelectLabel } from 'lib/Utils/PrimarySelectLabel';
import { PrimaryDate } from 'lib/Utils/PrimaryDate';
import { FaInfo } from 'react-icons/fa';

const schema = yup.object().shape({
  buildingType: yup.string(),
  buildingState: yup.string(),
  propertyTypeId: yup.number().required(),
  dateNeeded: yup.string().required(),
  numberOfBedrooms: yup.number(),
  numberOfBathrooms: yup.number(),
  numberOfFloors: yup.number(),
});

const RentPropertyForm = ({
  result,
  closeModal,
}: {
  result: PropertyType[];
  closeModal: any;
}) => {
  const [RequestCleaning, { loading, data, error }] =
    useOperationMethod('Cleanrequest');
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm<CleaningModel>({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const { addToast } = useToasts();
  const router = useRouter();
  const [buildingType, setBuildingType] = useState('');

  setValue('buildingType', buildingType);

  const clearFieldsOnClose = () => {
    reset({
      buildingType: '',
      dateNeeded: '',
      numberOfBathrooms: 0,
      numberOfFloors: 0,
      numberOfBedrooms: 0,
    });
    closeModal();
  };

  console.log(watch('numberOfBedrooms'));
  console.log(watch('numberOfBathrooms'));
  console.log(watch('numberOfFloors'));

  const onSubmit = async (data: CleaningModel) => {
    data.dateNeeded = new Date(
      data.dateNeeded as unknown as Date
    ).toLocaleDateString();

    try {
      const result = await (await RequestCleaning(undefined, data)).data;
      console.log({ result });
      if (result.status) {
        addToast('Application created sucessfully', {
          appearance: 'success',
          autoDismiss: true,
        });
        closeModal();
        router.push('/clean');
        return;
      }
      addToast(result.message, {
        appearance: 'error',
        autoDismiss: true,
      });
      closeModal();
      return;
    } catch (err) {
      console.log(err);
      console.log('errr');
    }
  };
  return (
    <Box width="90%" mx="auto" mt={['1.875rem', '2.3rem']}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PrimaryInput<CleaningModel>
          label="Name"
          name="password"
          placeholder="Give us your listing a name that makes it easy to find"
          defaultValue=""
          register={register}
          error={errors.password}
        />
        <PrimarySelectKey<CleaningModel>
          label="What type of building is it?"
          name="propertyTypeId"
          register={register}
          error={errors.propertyTypeId}
          control={control}
          options={result}
          placeholder="Choose a property type"
        />
        <PrimarySelectLabel<CleaningModel>
          label=" What is the state of the building?"
          name="buildingState"
          register={register}
          error={errors.buildingState}
          control={control}
          options={buildingState}
          placeholder="Please select"
        />
        <PrimaryDate<CleaningModel>
          label="When do you want the cleaning done?"
          name="dateNeeded"
          error={errors.dateNeeded}
          register={register}
          control={control}
          minDate={new Date()}
        />

        <NumberCounter
          valueName="numberOfBedrooms"
          setValue={setValue}
          getValues={getValues}
          label="Number of Bedrooms"
        />
        <NumberCounter
          valueName="numberOfBathrooms"
          setValue={setValue}
          getValues={getValues}
          label="Number of Bathrooms"
        />
        <VStack spacing={5}>
          <Checkbox>I want to manage the tenant myself</Checkbox>
          <Checkbox>Help me manage my tenant <FaInfo color='gray.700'/></Checkbox>
        </VStack>
        <ButtonComponent
          content="Get Qoute"
          isValid={isValid}
          loading={loading}
        />
      </form>
    </Box>
  );
};

export default RentPropertyForm;
