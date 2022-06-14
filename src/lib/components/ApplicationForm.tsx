import { PrimaryInput } from 'lib/Utils/PrimaryInput';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useOperationMethod } from 'react-openapi-client';
import { ApplicationModel, Register } from 'types/api';
import { Box, Button, HStack, Text } from '@chakra-ui/react';
import { PrimarySelect } from 'lib/Utils/PrimarySelect';
import ButtonComponent from './Button';
import { PrimaryDate } from 'lib/Utils/PrimaryDate';
import { useToasts } from 'react-toast-notifications';
import Cookies from 'js-cookie';

type Props = {
  formStep: number;
  setStep: Dispatch<SetStateAction<number>>;
  setFormStep: Dispatch<SetStateAction<number>>;
  close: any;
};

const ApplicationForm = ({ formStep, setFormStep, setStep, close }: Props) => {
  const [SubmitApplication, { loading, data, error }] =
    useOperationMethod('Applicationnew');

  const mobile = /^([0]{1})[0-9]{10}$/;
  const schema = yup.object().shape({
    register: yup.object({
      firstName: yup.string().required(),
      middleName: yup.string().required(),
      lastName: yup.string().required(),
      email: yup.string().email().required(),
      phoneNumber: yup.string().matches(mobile, 'Invalid phone number'),
      dateOfBirth: yup.string().required(),
      occupation: yup.string().when('firstName', {
        is: () => formStep === 1,
        then: yup.string().required(),
      }),
      companyName: yup.string().when('firstName', {
        is: () => formStep === 1,
        then: yup.string().required(),
      }),
      workAddress: yup.string().when('firstName', {
        is: () => formStep === 1,
        then: yup.string().required(),
      }),
      nationality: yup.string().required(),
      maritalStatus: yup.string().required(),
    }),

    // nextOfKin: yup.object({
    //   firstName: yup.string().required(),
    //   lastName: yup.string().required(),
    //   email: yup.string().email().required(),
    //   phoneNumber: yup.string().matches(mobile, 'Invalid phone number'),
    //   address: yup.string().required(),
    //   relationship: yup.string().required(),
    // }),
  });

  const users = Cookies.get('user') as unknown as string;
  let user;
  if (users !== undefined) {
    user = JSON.parse(users);
  }

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm<ApplicationModel>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const { addToast } = useToasts();
  const completeFormStep = () => {
    setFormStep((cur: number) => cur + 1);
  };
  const RenderButton = () => {
    if (formStep === 0) {
      return (
        <Box onClick={completeFormStep}>
          <Button
            type="button"
            w="100%"
            h="100%"
            mt="1.5rem"
            variant="solid"
            textTransform="capitalize"
            disabled={isValid ? false : true}
          >
            Next
          </Button>
        </Box>
      );
    } else if (formStep === 1) {
      return (
        <Box>
          <ButtonComponent
            content="Submit"
            isValid={isValid}
            loading={loading}
          />
        </Box>
      );
    } else {
      return null;
    }
  };

  const onSubmit = async (data: ApplicationModel) => {
    data.register
      ? (data.register.dateOfBirth = new Date(
          data.register?.dateOfBirth as unknown as Date
        ).toLocaleDateString())
      : null;
    console.log({ data });
    try {
      const result = await (await SubmitApplication(undefined, data)).data;
      console.log({ result });

      if (result.status !== 400) {
        setStep(2);
        addToast(result.message, {
          appearance: 'success',
          autoDismiss: true,
        });
        close();
        return;
      }
      addToast(result.message, {
        appearance: 'error',
        autoDismiss: true,
      });
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const CountryList = require('country-list').getNames();
  const maritalStatus = [
    {
      id: 1,
      name: 'Single',
    },
    {
      id: 2,
      name: 'Married',
    },
    {
      id: 3,
      name: 'Status',
    },
    {
      id: 4,
      name: 'Widowed',
    },
    {
      id: 5,
      name: "Can't say",
    },
  ];

  return (
    <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
      <>
        {formStep === 0 && (
          <>
            <PrimaryInput<ApplicationModel>
              label="first name"
              name="register.firstName"
              error={errors.register?.firstName}
              placeholder="Type in your first name"
              defaultValue={user?.firstName || ''}
              register={register}
            />

            <PrimaryInput<ApplicationModel>
              label="middle name"
              name="register.middleName"
              error={errors.register?.middleName}
              placeholder="Type in your middle name"
              defaultValue={user?.middleName || ''}
              register={register}
            />

            <PrimaryInput<ApplicationModel>
              label="last name"
              name="register.lastName"
              error={errors.register?.lastName}
              placeholder="Type in your middle name"
              defaultValue={user?.lastName || ''}
              register={register}
            />

            <PrimaryInput<ApplicationModel>
              label="mobile number"
              name="register.phoneNumber"
              error={errors.register?.phoneNumber}
              placeholder="Enter your mobile number"
              defaultValue={user?.phoneNumber || ''}
              register={register}
            />

            <PrimaryInput<ApplicationModel>
              label="email"
              name="register.email"
              error={errors.register?.email}
              placeholder="Enter your email"
              defaultValue={user?.email || ''}
              type="email"
              register={register}
            />
            <PrimaryInput<ApplicationModel>
              label="Residential Address"
              name="register.address"
              error={errors.register?.address}
              placeholder="Enter your address"
              defaultValue={user?.address || ''}
              register={register}
            />

            <PrimaryDate<ApplicationModel>
              label="Date of Birth"
              name="register.dateOfBirth"
              error={errors.register?.dateOfBirth}
              register={register}
              control={control}
              fontSize="sm"
              defaultValue={user?.dateOfBirth || ''}
            />

            <PrimarySelect<ApplicationModel>
              label="nationality"
              name="register.nationality"
              error={errors.register?.nationality}
              placeholder="Select your nationality"
              register={register}
              defaultValue={user?.nationality || ''}
              options={
                <>
                  {CountryList.map((country: any, i: number) => {
                    return (
                      <option value={country} key={i}>
                        {country}
                      </option>
                    );
                  })}
                </>
              }
            />

            <PrimarySelect<ApplicationModel>
              label="marital status"
              name="register.maritalStatus"
              error={errors.register?.maritalStatus}
              placeholder="Select your Status"
              register={register}
              defaultValue={user?.maritalStatus}
              options={
                <>
                  {maritalStatus.map((x: any) => {
                    return <option value={x.name}>{x.name}</option>;
                  })}
                </>
              }
            />
          </>
        )}
        {formStep === 1 && (
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
          </>
        )}
        {RenderButton()}
      </>
    </form>
  );
};

export default ApplicationForm;
