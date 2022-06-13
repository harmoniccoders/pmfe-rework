import { PrimaryInput } from 'lib/Utils/PrimaryInput';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useOperationMethod } from 'react-openapi-client';
import { ApplicationModel, Register } from 'types/api';
import { Button, Text } from '@chakra-ui/react';

type Props = {};
const mobile = /^([0]{1})[0-9]{10}$/;
const schema = yup.object().shape({
  firstName: yup.string().required(),
  middleName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  phoneNumber: yup.string().matches(mobile, 'Invalid phone number'),
  address: yup.string().required(),
  dateOfBirth: yup.string().required(),
  occupation: yup.string().required(),
  companyName: yup.string().required(),
  workAddress: yup.string().required(),
  relationship: yup.string().required(),
});

const ApplicationForm = (props: Props) => {
  const [SubmitApplication, { loading, data, error }] =
    useOperationMethod('Applicationnew');

  const [formStep, setFormStep] = useState<number>(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ApplicationModel>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const onSubmit = async (data: ApplicationModel) => {
    console.log('worked');
  };

  return (
    <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
      {formStep === 0 ? (
        <>
          <PrimaryInput<ApplicationModel>
            label="first name"
            name="register.firstName"
            error={errors.register?.firstName}
            placeholder="Type in your first name"
            defaultValue=""
            register={register}
          />

          <PrimaryInput<ApplicationModel>
            label="middle name"
            name="register.middleName"
            error={errors.register?.middleName}
            placeholder="Type in your middle name"
            defaultValue=""
            register={register}
          />

          <PrimaryInput<ApplicationModel>
            label="last name"
            name="register.lastName"
            error={errors.register?.lastName}
            placeholder="Type in your middle name"
            defaultValue=""
            register={register}
          />

          <PrimaryInput<ApplicationModel>
            label="mobile number"
            name="register.phoneNumber"
            error={errors.register?.phoneNumber}
            placeholder="Enter your mobile number"
            defaultValue=""
            register={register}
          />

          <PrimaryInput<ApplicationModel>
            label="email"
            name="register.email"
            error={errors.register?.email}
            placeholder="Enter your email"
            defaultValue=""
            type="email"
            register={register}
          />
          <PrimaryInput<ApplicationModel>
            label="Residential Address"
            name="register.address"
            error={errors.register?.address}
            placeholder="Enter your address"
            defaultValue=""
            register={register}
          />

          <PrimaryInput<ApplicationModel>
            label="date of birth"
            name="register.dateOfBirth"
            error={errors.register?.dateOfBirth}
            placeholder="date of birth"
            defaultValue=""
            type="date"
            register={register}
          />

          <Button
            onClick={() => setFormStep(formStep + 1)}
            variant="solid"
            type="button"
            width="100%"
            mt="1.5rem"
          >
            Next
          </Button>
        </>
      ) : (
        <>
          <PrimaryInput<ApplicationModel>
            label="occupation"
            name="register.occupation"
            error={errors.register?.occupation}
            placeholder="Type in your occupation"
            defaultValue=""
            register={register}
          />

          <PrimaryInput<ApplicationModel>
            label="employer"
            name="register.companyName"
            error={errors.register?.companyName}
            placeholder="Type in your companyName"
            defaultValue=""
            register={register}
          />

          <PrimaryInput<ApplicationModel>
            label="work address"
            name="register.workAddress"
            error={errors.register?.workAddress}
            placeholder="Type in your work address"
            defaultValue=""
            register={register}
          />

          <Text fontSize="14px" fontWeight={600} lineHeight={1.5} my="1rem">
            Next of kin
          </Text>

          <PrimaryInput<ApplicationModel>
            label="first name"
            name="nextOfKin.firstName"
            error={errors.nextOfKin?.firstName}
            placeholder="Type in your first name"
            defaultValue=""
            register={register}
          />

          <PrimaryInput<ApplicationModel>
            label="last name"
            name="nextOfKin.lastName"
            error={errors.nextOfKin?.lastName}
            placeholder="Type in your middle name"
            defaultValue=""
            register={register}
          />

          <PrimaryInput<ApplicationModel>
            label="mobile number"
            name="nextOfKin.phoneNumber"
            error={errors.nextOfKin?.phoneNumber}
            placeholder="Enter your mobile number"
            defaultValue=""
            register={register}
          />

          <PrimaryInput<ApplicationModel>
            label="email"
            name="nextOfKin.email"
            error={errors.nextOfKin?.email}
            placeholder="Enter your email"
            defaultValue=""
            type="email"
            register={register}
          />

          <PrimaryInput<ApplicationModel>
            label="work address"
            name="nextOfKin.address"
            error={errors.nextOfKin?.address}
            placeholder="Type in your work address"
            defaultValue=""
            register={register}
          />

          <PrimaryInput<ApplicationModel>
            label="relationship"
            name="nextOfKin.relationship"
            error={errors.nextOfKin?.relationship}
            placeholder="Type in your relationship"
            defaultValue=""
            register={register}
          />

          <Button variant="solid" type="submit" width="100%" mt="1.5rem">
            Submit
          </Button>
        </>
      )}
    </form>
  );
};

export default ApplicationForm;
