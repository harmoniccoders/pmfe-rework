import {
  HStack,
  Box,
  Text,
  Image,
  VStack,
  Heading,
  Divider,
} from '@chakra-ui/react';
import AgreementModal from 'lib/styles/customTheme/components/Modals/AgreementModal';
import ViewTenantsInfo from 'lib/styles/customTheme/components/Modals/ViewTenantsInfo';
import { useState } from 'react';

const TenantInfo = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <HStack
      w="full"
      spacing="4"
      cursor="pointer"
      onClick={() => setShowModal(true)}
    >
      <Box w="35%">
        <Image
          rounded="lg"
          src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
          h="100px"
          w="100px"
          objectFit="cover"
          alt="name"
        />
      </Box>
      <VStack align="flex-start" spacing="1" w="full">
        <Heading fontSize="14px">Olasunbo Agbeloba</Heading>
        <Box fontSize="14px">
          <Text>Single</Text>
          <Text>Software Developer</Text>
          <Text>Earns ₦16,000,000 per year</Text>
        </Box>
        <Divider/>
      </VStack>
      <ViewTenantsInfo isOpen={showModal} onClose={() => setShowModal(false)} />
      {/* <AgreementModal isOpen={showModal} onClose={() => setShowModal(false)} /> */}
    </HStack>
  );
};

export default TenantInfo;
