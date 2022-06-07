import { Box, Button, HStack, Text } from '@chakra-ui/react';
import { incomeBracket } from 'lib/Utils/IncomeBracket';
import { PrimaryInput } from 'lib/Utils/PrimaryInput';
import { PrimarySelectKey } from 'lib/Utils/PrimarySelectKey';
import { rentFrequency } from 'lib/Utils/RentFrequency';
import { tenantTypes } from 'lib/Utils/TenantType';
import { useEffect, useState } from 'react';
import { Control, UseFormRegister } from 'react-hook-form';
import { PropertyModel } from 'types/api';
import ButtonComponent from './Button';

interface Props {
  register: UseFormRegister<PropertyModel>;
  errors: any;
  control: Control<PropertyModel>;
  closeModals: any;
}

const ManageTenant = ({ register, control, errors, closeModals }: Props) => {
  const closeAllModal = () => {
    closeModals.closeSecondModal();
    closeModals.closeModal();
  };


  return (
    <Box width="90%" mx="auto" mt={['1.875rem', '2.3rem']} color="black">
      <Box>
        <Text fontWeight="600" fontSize="sm">
          What kind of tenants do you want?
        </Text>
        <PrimarySelectKey<PropertyModel>
          label="Type"
          name="propertyTypeId"
          register={register}
          error={errors.propertyTypeId}
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
          options={[]}
          placeholder="Choose your bank"
          fontSize="sm"
        />
        <PrimaryInput<PropertyModel>
          label="Your Account Number"
          name="propertyTypeId"
          placeholder="Enter your bank account number"
          defaultValue=""
          register={register}
          error={errors.name}
          fontSize="sm"
        />
      </Box>
      <HStack spacing={['2', '5']}>
        <Box w="50%">
          <ButtonComponent content="Submit" isValid={false} loading={false} />
        </Box>

        <Button w="50%" variant="outline" type="button" onClick={closeAllModal}>
          Cancel
        </Button>
      </HStack>
    </Box>
  );
};

export default ManageTenant;
