import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Flex,
  Text,
  Image,
  Box,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import ButtonComponent from 'lib/components/Button';
import { PrimaryInput } from 'lib/Utils/PrimaryInput';
import { PrimaryTextArea } from 'lib/Utils/PrimaryTextArea';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useOperationMethod } from 'react-openapi-client';
import { useToasts } from 'react-toast-notifications';
import { PropertyView, ReportModel } from 'types/api';
import Cookies from 'js-cookie';
import Modals from 'lib/Utils/Modals';

type Props = {
  isOpen?: any;
  onClose?: any;
  item: PropertyView;
};

const ReportListingModal = ({ isOpen, onClose, item }: Props) => {
  const [reportProperty, { loading, data, error }] =
    useOperationMethod('Reportcreate');

  const schema = yup.object().shape({
    propertyId: yup.string().required(),
    description: yup.string().required(),
    userName: yup.string().required(),
  });

  const users = Cookies.get('user') as unknown as string;
  let loggedInUser: any;

  if (users !== undefined) {
    loggedInUser = JSON.parse(users);
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ReportModel>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const { addToast } = useToasts();
  const router = useRouter();

  const onSubmit = async (data: ReportModel) => {
    data.propertyId = item.id as number;
    data.userId = loggedInUser?.id;

    try {
      const result = await (await reportProperty(undefined, data)).data;

      if (result.status !== 400) {
        addToast('Successful, We will look into it and reach out to you', {
          appearance: 'success',
          autoDismiss: true,
        });
        onClose();
        return;
      }
      addToast(result.message, {
        appearance: 'error',
        autoDismiss: true,
      });
      onClose();
      return;
    } catch (err: any) {
      addToast(err.message || err.body.message, {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  return (
    <>
      <Modals
        isOpen={isOpen}
        onClose={onClose}
        pmlogo={true}
        content={
          <>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
              <PrimaryInput<ReportModel>
                label="Property Name"
                name="propertyId"
                defaultValue={item.name as string}
                error={errors.propertyId}
                register={register}
              />
              {loggedInUser ? (
                <>
                  <PrimaryInput<ReportModel>
                    label="User's Name"
                    name="userName"
                    error={errors.userName}
                    defaultValue={loggedInUser?.fullName}
                    register={register}
                  />
                </>
              ) : (
                <>
                  <PrimaryInput<ReportModel>
                    label="Email"
                    name="email"
                    error={errors.email}
                    defaultValue=""
                    register={register}
                    placeholder="youremail@email.com"
                  />
                  <PrimaryInput<ReportModel>
                    label="User's Name"
                    name="userName"
                    error={errors.userName}
                    defaultValue=""
                    placeholder="Please enter your full name"
                    register={register}
                  />
                </>
              )}
              <PrimaryTextArea<ReportModel>
                label="Complaints"
                name="description"
                minH="150px"
                error={errors.description}
                defaultValue=""
                register={register}
              />
              <ButtonComponent
                isValid={isValid}
                loading={loading}
                content="submit"
              />
            </form>
          </>
        }
      />
    </>
  );
};

export default ReportListingModal;
