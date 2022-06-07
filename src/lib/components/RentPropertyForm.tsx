import {
  Box,
  Text,
  Button,
  VStack,
  HStack,
  Checkbox,
  Textarea,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import ButtonComponent from 'lib/components/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PropertyModel, PropertyType } from 'types/api';
import { useOperationMethod } from 'react-openapi-client';
import { PrimaryInput } from 'lib/Utils/PrimaryInput';
import { PrimaryTextArea } from 'lib/Utils/PrimaryTextArea';
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
import { StateSelect } from 'lib/Utils/StateSelect';
import ManageTenant from './ManageTenant';
import CustomModal from 'lib/styles/customTheme/components/Modals/CustomModal';

const schema = yup.object().shape({
  name: yup.string(),
  title: yup.string(),
  propertyTitle: yup.string(),
  state: yup.string(),
  lga: yup.string(),
  area: yup.string(),
  address: yup.string(),
  description: yup.string(),
  rent: yup.string(),
  price: yup.number(),
  budget: yup.number(),
  propertyTypeId: yup.number().required(),
  rentCollectionTypeId: yup.number(),
  numberOfBedrooms: yup.number(),
  numberOfBathrooms: yup.number(),
  bank: yup.string(),
  accountNumber: yup.string(),
  sellMyself: yup.boolean(),
});

const RentPropertyForm = ({
  propertyTypesData,
  propertyTitleData,
  statesData,
  closeModal,
}: {
  propertyTypesData: PropertyType[];
  propertyTitleData: PropertyType[];
  statesData: any[];
  closeModal: any;
}) => {
  const [Rent, { loading, data, error }] = useOperationMethod('');
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm<PropertyModel>({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const { addToast } = useToasts();
  const router = useRouter();
  const [manageMyself, setManageMyself] = useState<boolean>(true);
  const [manageForMe, setManageForMe] = useState<boolean>(false);
  const [isOpen, setIsopen] = useState<boolean>(false);

  const closeSecondModal = () => {
    setIsopen(false);
  };
  const openSecondModal = () => {
    setIsopen(true);
  };

  const checkManage = () => {
    if (manageForMe) {
      setManageForMe(false);
      setManageMyself(true);
    } else {
      setManageForMe(true);
      setManageMyself(false);
    }
  };

  const clearFieldsOnClose = () => {
    reset({
      name: '',
      title: '',
      state: '',
      area: '',
      address: '',
      description: '',
      numberOfBathrooms: 0,
      numberOfBedrooms: 0,
    });
    closeModal();
  };

  console.log(watch('numberOfBedrooms'));
  console.log(watch('numberOfBathrooms'));

  const onSubmit = async (data: PropertyModel) => {
    try {
      const result = await (await Rent(undefined, data)).data;
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
    <Box width="90%" mx="auto" mt={['.3rem', '0.5rem']}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PrimaryInput<PropertyModel>
          label="Name"
          name="name"
          placeholder="Give us your listing a name that makes it easy to find"
          defaultValue=""
          register={register}
          error={errors.name}
          fontSize="sm"
        />
        <PrimarySelectKey<PropertyModel>
          label="Type"
          name="propertyTypeId"
          register={register}
          error={errors.propertyTypeId}
          control={control}
          options={propertyTypesData}
          placeholder="Choose a property type"
          fontSize="sm"
        />
        <PrimarySelectKey<PropertyModel>
          label="Property Title"
          name="title"
          register={register}
          error={errors.title}
          control={control}
          options={propertyTitleData}
          placeholder="Choose a property title"
          fontSize="sm"
        />
        <StateSelect<PropertyModel>
          label="State"
          name="state"
          register={register}
          error={errors.state}
          control={control}
          options={statesData}
          placeholder="What state in Nigeria do you want the property"
          fontSize="sm"
        />
        <PrimaryInput<PropertyModel>
          label="Area"
          name="area"
          placeholder=""
          defaultValue=""
          register={register}
          error={errors.area}
          fontSize="sm"
        />
        <PrimaryInput<PropertyModel>
          label="Address"
          name="address"
          placeholder="House No, Street, Estate"
          defaultValue=""
          register={register}
          error={errors.address}
          fontSize="sm"
        />

        <PrimaryTextArea<PropertyModel>
          label="Description"
          name="description"
          placeholder=""
          defaultValue=""
          register={register}
          error={errors.description}
          fontSize="sm"
        />
        <PrimaryInput<PropertyModel>
          label="Rent(Per year)"
          name="price"
          type="number"
          placeholder="₦0.00"
          defaultValue=""
          register={register}
          error={errors.price}
          fontSize="sm"
        />
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
        <VStack spacing={2} align="start" mt="2">
          <Checkbox onChange={checkManage} isChecked={manageMyself}>
            <Text fontSize="sm" fontWeight={500}>
              I want to manage the tenant myself
            </Text>
          </Checkbox>
          <Checkbox onChange={checkManage} isChecked={manageForMe}>
            <HStack fontSize="sm" fontWeight={500}>
              <Text>Help me manage my tenant </Text>
              <Text color="white" p="1" rounded="full" bg="gray.600">
                <FaInfo size={10} />
              </Text>
            </HStack>
          </Checkbox>
        </VStack>
        {manageMyself && (
          <ButtonComponent
            content="Submit"
            isValid={isValid}
            loading={loading}
          />
        )}
        {manageForMe && (
          <Button onClick={openSecondModal} w="full" mt="25px" mb="25px">
            Next
          </Button>
        )}
        <CustomModal
          component={
            <ManageTenant
              register={register}
              control={control}
              errors={errors}
            />
          }
          isOpen={isOpen}
          back={true}
          closeModal={closeSecondModal}
        />
      </form>
    </Box>
  );
};

export default RentPropertyForm;
