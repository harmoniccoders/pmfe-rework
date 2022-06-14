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
import { InspectionDateView, PropertyView } from 'types/api';

type Props = {
  date?: InspectionDateView;
  data: PropertyView;
  step: number;
  setStep: any;
};

const iconStyle = {
  color: '#191919',
};

const StepOne = ({ date, data, step, setStep }: Props) => {
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
      <Flex
        h={[step !== 0 ? '3rem' : '100%', '100%']}
        justifyContent="space-between"
        width="100%"
        overflow={'hidden'}
      >
        <VStack w={['fit-content']} spacing="0.5rem">
          <Circle
            size="2rem"
            border={step >= 0 ? '1px solid #2fdf84' : '1px solid #DCE1E7'}
            bgColor={step >= 0 ? '#2fdf84' : '#DCE1E7'}
            p="0.2rem"
          >
            <Icon
              as={FaCheck}
              w="100%"
              color={step >= 0 ? 'white' : 'brand.50'}
            />
          </Circle>
          <Box
            h="100%"
            w="2px"
            bgColor={step >= 0 ? '#2fdf84' : '#DCE1E7'}
          ></Box>
        </VStack>
        <VStack
          // borderLeft="2px solid #DCE1E7"
          align="flex-start"
          spacing={3}
          width="100%"
          ml="2rem"
          pb={[step !== 0 ? '0' : '3.5rem', '3.5rem']}
          h={[step !== 0 ? '1rem' : '100%', ' 100%']}
          overflow="hidden"
        >
          <Heading fontSize="1rem" lineHeight={1.5}>
            Step 1-enquiries
          </Heading>
          <Button
            variant="outline"
            width="100%"
            fontSize="13px"
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
            fontSize="13px"
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
                width="40px"
                height="40px"
                borderRadius="50%"
                border="1px solid #DCE1E7"
                mr="5px"
                overflow="hidden"
              >
                <Image
                  src={
                    (data.representative
                      ?.profilePicture as unknown as string) ||
                    '/assets/user-icon.png'
                  }
                  alt="rep-image"
                  w="100%"
                  h="100%"
                  objectFit="cover"
                />
              </Box>
            </Box>
            <VStack width="100%" align="flex-start" spacing={2} pl="5px">
              <Text fontSize="13px" fontWeight={500}>
                Speak with a representative
              </Text>

              <Text fontSize="13px" fontWeight={600}>
                {data.representative?.firstName || 'No rep assigned yet'}
              </Text>

              <Text
                as="a"
                href={`tel: ${data.representative?.phoneNumber}`}
                fontSize="13px"
                color="brand.100"
              >
                {data.representative?.phoneNumber}
              </Text>
              <Text
                as="a"
                href={`mailto: ${data.representative?.email}`}
                fontSize="13px"
                color="brand.100"
              >
                {data.representative?.email}
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </Flex>

      {openModal ? (
        <InteractiveVideoModal open={isOpen} close={onClose} />
      ) : (
        <LiveInspectionModal
          open={isOpen}
          close={onClose}
          date={date}
          item={data}
          setStep={setStep}
        />
      )}
    </>
  );
};

export default StepOne;
