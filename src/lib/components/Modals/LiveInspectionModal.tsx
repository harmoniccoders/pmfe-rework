import {
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  ModalHeader,
  Flex,
  ModalBody,
  VStack,
  Box,
} from '@chakra-ui/react';
import Icons from 'lib/components/Icons';

import ScheduleTabs from 'lib/components/ScheduleTabs';
import Modals from 'lib/Utils/Modals';
import React from 'react';
import { InspectionDateView, PropertyView } from 'types/api';

type Props = {
  open: boolean;
  close: any;
  date?: InspectionDateView;
  item?: PropertyView;
};

const LiveInspectionModal = ({ open, close, date, item }: Props) => {
  return (
    <Modals
      isOpen={open}
      onClose={close}
      pmlogo={true}
      content={
        <>
          <VStack spacing={4} alignItems="flex-start">
            <Text fontWeight={600}>Select an inspection type</Text>
            <ScheduleTabs date={date} item={item} close={close} />
          </VStack>
        </>
      }
    />
  );
};

export default LiveInspectionModal;
