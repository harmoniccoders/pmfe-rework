import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Flex,
  Button,
  Text,
  Image,
  Box,
  Badge,
  Heading,
  Grid,
  GridItem,
  VStack,
  ModalCloseButton,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import ButtonComponent from 'lib/components/Button';
import { PrimaryInput } from 'lib/Utils/PrimaryInput';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useOperationMethod } from 'react-openapi-client';
import { useToasts } from 'react-toast-notifications';
import { PasswordResetModel, PropertyTitle, PropertyType } from 'types/api';

interface AddPropertyProps {
  isOpen: boolean;
  onClose: () => void;
}

const schema = yup.object().shape({
  existingPassword: yup.string().required(),
  newPassword: yup.string().required(),
});

function UpdateUserModal({ isOpen, onClose }: AddPropertyProps) {
  const [UpdatePassword, { loading, data, error }] =
    useOperationMethod('Userpasswordupdate');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<PasswordResetModel>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const { addToast } = useToasts();
  const router = useRouter();
  const [passwordType, setPasswordType] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(true);

  const changePasswordType = () => {
    setPasswordType(!passwordType);
  };
  const changePasswordField = () => {
    setShowPassword(!showPassword);
  };

  const [err, setErr] = useState('');

  const onSubmit = async (data: PasswordResetModel) => {
    if (data.existingPassword == data.newPassword) {
      setErr('Old password & New Password are the same');
      setTimeout(() => {
        setErr('');
      }, 2000);
      return;
    }
    try {
      const result = await (await UpdatePassword(undefined, data)).data;
      console.log({ result });
      if (result.status) {
        onClose();
        addToast('Password succesfully changed', {
          appearance: 'success',
          autoDismiss: true,
        });
        window.location.href = '/login';
        return;
      }
      addToast(result.message, {
        appearance: 'error',
        autoDismiss: true,
      });
      return;
    } catch (err) {}
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      isCentered
      // scrollBehavior="outside"
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />

      <ModalContent
        py={5}
        borderRadius="0"
        w={['88%', '80%']}
        overflow="hidden"
        maxH="100vh"
        maxW="40%"
        pos="fixed"
        mt="1rem"
        mb="1rem"
      >
        <ModalHeader>
          <ModalCloseButton />
        </ModalHeader>

        <ModalBody>
          <Box maxH="77vh" overflowY="auto" px={5}>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
              <PrimaryInput<PasswordResetModel>
                label="Old Password"
                name="existingPassword"
                error={errors.existingPassword}
                defaultValue=""
                register={register}
                changePasswordType={changePasswordType}
                type={passwordType ? 'password' : 'text'}
                iconClass={passwordType ? 'fa-eye-slash' : 'fa-eye'}
              />
              <PrimaryInput<PasswordResetModel>
                label="New Password"
                name="newPassword"
                defaultValue=""
                register={register}
                error={errors.newPassword}
                changePasswordType={changePasswordField}
                type={showPassword ? 'password' : 'text'}
                iconClass={showPassword ? 'fa-eye-slash' : 'fa-eye'}
              />
              {err && (
                <Text color="red" fontSize=".8rem" textAlign="center" mt="1rem">
                  {err}
                </Text>
              )}
              <ButtonComponent
                content="Change Password"
                isValid={isValid}
                loading={loading}
              />
            </form>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default UpdateUserModal;
