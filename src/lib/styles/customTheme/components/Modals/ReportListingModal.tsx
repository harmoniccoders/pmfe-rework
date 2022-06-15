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
import { PropertyView, ReportModel, UserView } from 'types/api';
import Cookies from 'js-cookie';

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
    // defaultValues: {
    //   userId: item.id,
    // },
  });

  const { addToast } = useToasts();
  const router = useRouter();

  const onSubmit = async (data: ReportModel) => {
    console.log({ data });
    data.propertyId = item.id as number;
    data.userId = loggedInUser?.id;
    console.log(data.userId);

    try {
      const result = await (await reportProperty(undefined, data)).data;
      console.log({ result });
      if (result.status !== 400) {
        addToast('Succesful, We will look into it and react out to you', {
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
    } catch (err) {}
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
        size="lg"
        
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />

        <ModalContent
          py={5}
          overflowY="scroll"
          borderRadius="0"
          pos="fixed"
          maxH="100vh"
        >
          <ModalHeader>
            <Flex justifyContent="space-between" alignItems="center">
              <Text
                onClick={onClose}
                display="flex"
                alignItems="center"
                fontSize="14px"
                cursor="pointer"
              >
                <span
                  className="fal fa-angle-left"
                  style={{ marginRight: '5px' }}
                ></span>
                Back
              </Text>

              <Box w="150px" h="40px">
                <Image
                  src="/assets/PropertyMataaz.png"
                  alt="company-logo"
                  w="100%"
                  h="100%"
                  objectFit="contain"
                />
              </Box>
            </Flex>
          </ModalHeader>

          <ModalBody>
            <Box px={5}>
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
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReportListingModal;
