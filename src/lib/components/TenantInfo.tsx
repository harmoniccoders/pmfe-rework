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
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Application } from 'types/api';

const TenantInfo = ({
  item,
  disabled,
}: {
  item: Application;
  disabled?: boolean;
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const router = useRouter()
  return (
    <HStack
      w="full"
      spacing="4"
      opacity={disabled ? '.5' : 'unset'}
      cursor={disabled ? 'not-allowed' : 'pointer'}
      onClick={()=>setShowModal(true)}
      // onClick={
      //   disabled
      //     ? undefined
      //     : () => router.push(`/my-rent/applications/tenant/${item.id}`)
      // }
    >
      <Box w="35%">
        <Image
          rounded="lg"
          src={item?.user?.passportPhotograph?.url || '/assets/user-icon.png'}
          h="100px"
          w="100px"
          objectFit="cover"
          alt="name"
        />
      </Box>
      <VStack align="flex-start" spacing="1" w="full">
        <Heading
          fontSize="14px"
          textTransform="capitalize"
        >{`${item?.user?.firstName} ${item?.user?.lastName}`}</Heading>
        <Box fontSize="13px">
          <Text>{item?.user?.maritalStatus}</Text>
          <Text textTransform="capitalize">{item?.user?.occupation}</Text>
          <Text>
            Earns {item?.user?.annualIncome}
            per year
          </Text>
        </Box>
        <Divider />
      </VStack>
      <ViewTenantsInfo
        item={item}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
      {/* <AgreementModal isOpen={showModal} onClose={() => setShowModal(false)} /> */}
    </HStack>
  );
};

export default TenantInfo;
