import { Box, Text, VStack, SimpleGrid, Stack } from '@chakra-ui/react';
import ButtonComponent from 'lib/components/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Register } from 'types/api';
import { useOperationMethod } from 'react-openapi-client';
import { PrimaryInput } from 'lib/Utils/PrimaryInput';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import { PrimaryTextArea } from 'lib/Utils/PrimaryTextArea';
import { FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { GrMail } from 'react-icons/gr';

const schema = yup.object().shape({
  firstname: yup.string().required(),
  email: yup.string().required(),
  lastName: yup.string().required(),
});

const ContactPage = () => {
  const [SendMessage, { loading }] = useOperationMethod('');
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Register>({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const { addToast } = useToasts();

  const onSubmit = async (data: Register) => {
    try {
      const result = await (await SendMessage(undefined, data)).data;

      if (result.status) {
        addToast('Message sent sucessfully', {
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
    } catch (err) {}
  };
  return (
    <Stack minH="calc(100vh - 77px)" justify="center" w="90%" mx="auto">
      <Text
        fontWeight={600}
        textAlign="center"
        fontSize="1.1rem"
        color="brand.100"
        pt="5"
        pb="1"
      >
        Need any help? contact us
      </Text>
      <SimpleGrid columns={[1, 2]} alignItems="center" pb="10">
        <VStack spacing="10" p="10" align="flex-start">
          <VStack align="flex-start" spacing="2">
            <FaPhone fontSize="20" color="blue" />
            <Text fontWeight="600" fontSize="1.2rem" lineHeight="1">
              Phone
            </Text>
            <Text>0909 000 2394</Text>
          </VStack>
          <VStack align="flex-start" spacing="2">
            <GrMail fontSize="20" color="blue" />
            <Text fontWeight="600" fontSize="1.2rem" lineHeight="1">
              Email
            </Text>
            <Text>hello@propertymataaz.com</Text>
          </VStack>
          <VStack align="flex-start" spacing="2">
            <FaMapMarkerAlt fontSize="20" color="blue" />
            <Text fontWeight="600" fontSize="1.2rem" lineHeight="1">
              Address
            </Text>
            <Text>
              1st Floor, Providence House, <br /> 15 Admiralty Way, Lekki Phase
              I 106104, Lagos
            </Text>
          </VStack>
        </VStack>

        <Box
          w={['100%', '80%', '100%']}
          border="2px hidden blue"
          pl={[0, 0, '2.5rem']}
          mt={[0, '20px', 0]}
          margin="auto"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <PrimaryInput<Register>
              label="Name"
              name="firstName"
              error={errors.firstName}
              defaultValue=""
              register={register}
            />
            <PrimaryInput<Register>
              label="Email "
              name="email"
              error={errors.email}
              defaultValue=""
              register={register}
            />
            <PrimaryTextArea<Register>
              label="Message"
              name="lastName"
              error={errors.lastName}
              defaultValue=""
              minH="200px"
              register={register}
            />

            <ButtonComponent
              content="Send"
              isValid={isValid}
              loading={loading}
            />
          </form>
        </Box>
      </SimpleGrid>
    </Stack>
  );
};

export default ContactPage;
