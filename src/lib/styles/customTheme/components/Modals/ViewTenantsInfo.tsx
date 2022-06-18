import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Flex,
  Image,
  Text,
  Box,
  Heading,
  ModalBody,
  VStack,
  Button,
  HStack,
  SimpleGrid,
  Divider,
} from '@chakra-ui/react';

import React from 'react';
import { FaStar,FaStarHalfAlt } from 'react-icons/fa';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ViewTenantsInfo = ({ isOpen, onClose }: Props) => {
  const accepted = false;
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      size="lg"
      isCentered
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />

      <ModalContent
        py={5}
        borderRadius="0"
        overflowY="auto"
        h="100vh"
        pos="fixed"
      >
        <ModalHeader>
          <Flex justifyContent="space-between" alignItems="center">
            <Text
              onClick={onClose}
              display="flex"
              alignItems="center"
              fontSize="14px"
              cursor="pointer"
            >
              <span
                className="fal fa-angle-left"
                style={{ marginRight: '5px' }}
              ></span>
              Back
            </Text>
            <Box w="150px" h="40px">
              <Image
                src="/assets/PropertyMataaz.png"
                alt="company-logo"
                w="100%"
                h="100%"
                objectFit="contain"
              />
            </Box>
          </Flex>
        </ModalHeader>

        <ModalBody>
          <Box px={5}>
            <VStack spacing="5">
              <Image
                rounded="lg"
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
                h="200px"
                w="200px"
                objectFit="cover"
                alt="name"
              />
              <Heading fontSize="17px">Gideon Oluwasegun Emokpae</Heading>
            </VStack>
            {accepted ? (
              <VStack spacing="3" my="7">
                <Heading fontSize="20px">Tenancy Status</Heading>
                <Text
                  borderRadius="4px"
                  border="1px solid #96FFC9"
                  px="1.5rem"
                  fontWeight="600"
                  py="3"
                  bgColor="brand.700"
                >
                  Awaiting Payment
                </Text>
              </VStack>
            ) : (
              <Box>
                <Flex
                  w="full"
                  justifyContent="space-between"
                  alignItems="center"
                  bgColor="brand.700"
                  borderRadius="4px"
                  px="1rem"
                  my="5"
                  h="3rem"
                  border="1px solid #96FFC9"
                >
                  <Text fontWeight="500">Suitability Rating</Text>
                  <Flex gap="2">
                    <FaStar color="blue" />
                    <FaStar color="blue" />
                    <FaStarHalfAlt color="blue" />
                    <FaStarHalfAlt color="blue" />
                  </Flex>
                </Flex>
                <Text color="gray.600" px="3">
                  We recommend you only consider applicants with a suitability
                  rating of 3 stars or higher
                </Text>
                <SimpleGrid columns={2} spacing="5" my="7">
                  <Button w="full" variant="outline">
                    Decline
                  </Button>
                  <Button w="full" variant="outline">
                    Accept as Tenant
                  </Button>
                </SimpleGrid>
              </Box>
            )}

            <VStack w="full" align="flex-start" spacing="3">
              <VStack align="flex-start" w="full" spacing="2">
                <Heading fontSize="15px">Mobile Number</Heading>
                <Text fontSize="14px">08098765432</Text>
                <Divider />
              </VStack>
              <VStack align="flex-start" w="full" spacing="2">
                <Heading fontSize="15px">Email</Heading>
                <Text fontSize="14px">gideonemo@gmail.com</Text>
                <Divider />
              </VStack>
              <VStack align="flex-start" w="full" spacing="2">
                <Heading fontSize="15px">Current Residential Address</Heading>
                <Text fontSize="14px">
                  10 Adebayo Titilope Street, Omole Phase 4, Ikeja, Lagos,
                  Nigeria
                </Text>
                <Divider />
              </VStack>
              <VStack align="flex-start" w="full" spacing="2">
                <Heading fontSize="15px">Date of Birth</Heading>
                <Text fontSize="14px">14/04/1980</Text>
                <Divider />
              </VStack>
              <VStack align="flex-start" w="full" spacing="2">
                <Heading fontSize="15px">Nationality</Heading>
                <Text fontSize="14px">Nigerian</Text>
                <Divider />
              </VStack>
              <VStack align="flex-start" w="full" spacing="2">
                <Heading fontSize="15px">Marital Status</Heading>
                <Text fontSize="14px">Married</Text>
                <Divider />
              </VStack>
              <VStack align="flex-start" w="full" spacing="2">
                <Heading fontSize="15px">Occupation</Heading>
                <Text fontSize="14px">Banker</Text>
                <Divider />
              </VStack>
              <VStack align="flex-start" w="full" spacing="2">
                <Heading fontSize="15px">Work Address</Heading>
                <Text fontSize="14px">
                  44 Cameron Road, Ikoyi, Lagos, Nigeria
                </Text>
                <Divider />
              </VStack>
              <VStack align="flex-start" w="full" spacing="2">
                <Heading fontSize="15px">Annual Income</Heading>
                <Text fontSize="14px">₦14,500,000</Text>
                <Divider />
              </VStack>
              <VStack align="flex-start" w="full" spacing="2">
                <Heading fontSize="15px">Work Address</Heading>
                <Text fontSize="14px">
                  44 Cameron Road, Ikoyi, Lagos, Nigeria
                </Text>
                <Divider />
              </VStack>
            </VStack>
            <Heading my="5" fontSize="18px">
              Next of Kin
            </Heading>
            <VStack w="full" align="flex-start" spacing="3">
              <VStack align="flex-start" w="full" spacing="2">
                <Heading fontSize="15px">First Name</Heading>
                <Text fontSize="14px">Amanda</Text>
                <Divider />
              </VStack>
              <VStack align="flex-start" w="full" spacing="2">
                <Heading fontSize="15px">Surname</Heading>
                <Text fontSize="14px">Gideon</Text>
                <Divider />
              </VStack>
              <VStack align="flex-start" w="full" spacing="2">
                <Heading fontSize="15px">Address</Heading>
                <Text fontSize="14px">
                  10 Adebayo Titilope Street, Omole Phase 4, Ikeja, Lagos,
                  Nigeria
                </Text>
                <Divider />
              </VStack>
              <VStack align="flex-start" w="full" spacing="2">
                <Heading fontSize="15px">Relationship</Heading>
                <Text fontSize="14px">Wife</Text>
                <Divider />
              </VStack>
              <VStack align="flex-start" w="full" spacing="2">
                <Heading fontSize="15px">Work ID</Heading>
                <Image
                  src="/assets/idcard.png"
                  h="200px"
                  objectFit="cover"
                  alt="id card"
                />
              </VStack>
            </VStack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ViewTenantsInfo;
