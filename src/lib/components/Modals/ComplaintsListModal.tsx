import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Flex,
  Text,
  Box,
} from '@chakra-ui/react';
import LandlordOptions from 'lib/components/my-rent/landlord/LandlordOptions';
import Modals from 'lib/Utils/Modals';
import { useState } from 'react';

interface LandlordProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

function LandlordModal({ isOpen, onClose, data }: LandlordProps) {
  const [formStep, setFormStep] = useState(0);
  return (
    <Modals isOpen={isOpen} onClose={onClose} pmlogo={true} content={<></>} />
  );
}

export default LandlordModal;
