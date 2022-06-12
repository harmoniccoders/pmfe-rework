import React, { useState } from 'react';
import {
  VStack,
  Heading,
  Button,
  Flex,
  Image,
  Text,
  Box,
  HStack,
  Circle,
  Icon,
  useDisclosure,
} from '@chakra-ui/react';
import Icons from './Icons';
import { FaCheck } from 'react-icons/fa';
import LiveInspectionModal from 'lib/styles/customTheme/components/Modals/LiveInspectionModal';
import InteractiveVideoModal from 'lib/styles/customTheme/components/Modals/InteractiveVideoModal';
import { InspectionDateView } from 'types/api';

type Props = {
  date?: InspectionDateView;
};

const iconStyle = {
  color: '#191919',
};

const StepOne = ({ date }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [openModal, setOpenModal] = useState<boolean>(false);

  const showInteractiveVideoModal = () => {
    setOpenModal(true);
    onOpen();
  };

  const showLiveInspectionModal = () => {
    setOpenModal(false);
    onOpen();
  };

  return (
    <>
      <Flex h="100%" justifyContent="space-between" width="100%">
        <VStack w="8px" spacing="0.5rem">
          <Circle size="2rem" border="1px solid #DCE1E7" p="0.2rem">
            <Icon as={FaCheck} w="100%" color="brand.50" />
          </Circle>
          <Box h="100%" w="2px" bgColor="#DCE1E7"></Box>
        </VStack>
        <VStack
          // borderLeft="2px solid #DCE1E7"
          align="flex-start"
          spacing={3}
          width="100%"
          ml="2rem"
          pb="3.5rem"
        >
          <Heading fontSize="1rem" lineHeight={1.5}>
            Step 1-enquiries
          </Heading>
          <Button
            variant="outline"
            width="100%"
            fontSize="15px"
            color="brand.900"
            justifyContent="flex-start"
            role="group"
            display="flex"
            alignItems="center"
            onClick={showInteractiveVideoModal}
          >
            <Box
              pr="10px"
              _groupHover={{
                color: 'white',
              }}
            >
              <Icons iconClass="fa-video" />
            </Box>
            <Text>Watch interactive 3D videos</Text>
          </Button>
          <Button
            variant="outline"
            width="100%"
            fontSize="15px"
            color="brand.900"
            justifyContent="flex-start"
            role="group"
            display="flex"
            alignItems="center"
            onClick={showLiveInspectionModal}
          >
            <Box
              pr="10px"
              _groupHover={{
                color: 'white',
              }}
            >
              <Icons iconClass="fa-calendar" />
            </Box>
            <Text>Schedule live inspection</Text>
          </Button>
          <HStack
            border="1px solid #DCE1E7"
            width="100%"
            py=".5rem"
            borderRadius="5px"
            alignItems="flex-start"
            pl="6px"
          >
            <Box>
              <Box
                width="70px"
                height="70px"
                borderRadius="50%"
                border="1px solid #DCE1E7"
                mr="5px"
                overflow="hidden"
              >
                <Image
                  src="/assets/user-icon.png"
                  alt="rep-image"
                  w="100%"
                  h="100%"
                  objectFit="cover"
                />
              </Box>
            </Box>
            <VStack width="100%" align="flex-start" spacing={2} pl="5px">
              <Text fontSize="16px" fontWeight={500}>
                Speak with a representative
              </Text>

              <Text fontSize="16px" fontWeight={600}>
                Toluwani
              </Text>

              <Text
                as="a"
                href="tel: +2348047848939"
                fontSize="14px"
                color="brand.100"
              >
                +2348047848939
              </Text>
              <Text
                as="a"
                href="mailto: toluwani@propertymataaz.com"
                fontSize="14px"
                color="brand.100"
              >
                toluwani@propertymataaz.com
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </Flex>

      {openModal ? (
        <InteractiveVideoModal open={isOpen} close={onClose} />
      ) : (
        <LiveInspectionModal open={isOpen} close={onClose} date={date} />
      )}
    </>
  );
};

export default StepOne;
