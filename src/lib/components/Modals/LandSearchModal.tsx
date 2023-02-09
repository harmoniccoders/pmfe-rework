import {
  Box,
  Text,
  ModalBody,
  ModalHeader,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import ButtonComponent from 'lib/components/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LandSearchModel } from 'types/api';
import { useOperationMethod } from 'react-openapi-client';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import { PrimaryInput } from 'lib/Utils/PrimaryInput';
import Modals from 'lib/Utils/Modals';

const schema = yup.object().shape({
  fileName: yup.string().required(),
  fileNumber: yup.string().required(),
});

const LandSearchModal = ({
  closeModal,
  isOpen,
}: {
  closeModal: () => void;
  isOpen: boolean;
}) => {
  const [LandSearch, { loading, data, error }] =
    useOperationMethod('LandSearchcreate');
  const {
    register,
    handleSubmit,

    formState: { errors, isValid },
  } = useForm<LandSearchModel>({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const { addToast } = useToasts();
  const router = useRouter();

  const onSubmit = async (data: LandSearchModel) => {
    try {
      const result = await (await LandSearch(undefined, data)).data;

      if (result.status) {
        addToast('Application created sucessfully', {
          appearance: 'success',
          autoDismiss: true,
        });
        closeModal();
        router.reload();
        return;
      }
      addToast(result.message, {
        appearance: 'error',
        autoDismiss: true,
      });
      closeModal();
      return;
    } catch (err: any) {
      addToast(err.message || err.body.message, {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };
  return (
    <Modals
      isOpen={isOpen}
      onClose={closeModal}
      pmlogo={true}
      content={
        <>
          <Text fontWeight="600" color="brand.100" fontSize="sm">
            Land Search
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <PrimaryInput<LandSearchModel>
              label="File Name"
              name="fileName"
              placeholder="Enter your file name"
              error={errors.fileName}
              defaultValue=""
              register={register}
            />
            <PrimaryInput<LandSearchModel>
              label="File Number"
              name="fileNumber"
              placeholder="Enter your file number"
              error={errors.fileNumber}
              defaultValue=""
              register={register}
            />
            <ButtonComponent
              content="Search"
              isValid={isValid}
              loading={loading}
            />
          </form>
        </>
      }
    />
  );
};

export default LandSearchModal;
