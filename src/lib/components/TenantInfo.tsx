import {
  HStack,
  Box,
  Text,
  Image,
  VStack,
  Heading,
  Divider,
} from '@chakra-ui/react';
import ViewTenantsInfo from 'lib/components/Modals/ViewTenantsInfo';

import { useState } from 'react';
import { ApplicationView, Application } from 'types/api';

const TenantInfo = ({
  item,
  onAccepted,
}: {
  item: ApplicationView;
  onAccepted?: boolean;
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <HStack
      w="full"
      spacing="4"
      opacity={onAccepted ? '.5' : 'unset'}
      cursor={onAccepted ? 'not-allowed' : 'pointer'}
      onClick={onAccepted ? undefined : () => setShowModal(true)}
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
        item={item as Application}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </HStack>
  );
};

export default TenantInfo;
