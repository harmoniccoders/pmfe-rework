import {
  Box,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Flex,
  Image,
  VStack,
  HStack,
  Button,
} from '@chakra-ui/react';
import Icons from 'lib/components/Icons';
import { PrimarySelect } from 'lib/Utils/PrimarySelect';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PrimaryTextArea } from 'lib/Utils/PrimaryTextArea';
import ButtonComponent from 'lib/components/Button';

type Props = {
  isOpen: boolean;
  onClose: any;
};

const TenancyModal = ({ isOpen, onClose }: Props) => {
  const [showForm, setShowForm] = useState<number>(0);

  const complaints = [
    {
      id: 1,
      name: 'structural damage',
    },

    {
      id: 2,
      name: 'legal issues',
    },

    {
      id: 3,
      name: 'co-tenants',
    },
  ];

  const schema = yup.object().shape({
    category: yup.string().required(),
    subcategory: yup.string().required(),
    comment: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent
        py={5}
        borderRadius="0"
        w={['88%', '80%']}
        overflowY="scroll"
        maxH="100vh"
        pos="fixed"
        mt="0rem"
        mb="1rem"
      >
        <ModalHeader>
          <Text
            onClick={showForm < 1 ? onClose : () => setShowForm(showForm - 1)}
            // onClick={onClose}
            display="flex"
            alignItems="center"
            fontSize="14px"
            cursor="pointer"
            fontWeight={600}
          >
            <span
              className="fal fa-angle-left"
              style={{ marginRight: '5px', fontWeight: 600 }}
            ></span>
            Back
          </Text>
        </ModalHeader>

        <ModalBody>
          {showForm === 1 ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <PrimarySelect
                label="choose a category"
                name="category"
                error={errors?.category}
                placeholder="choose your category"
                register={register}
                options={
                  <>
                    {complaints.map((item, index) => {
                      return (
                        <option value={item.name} key={index}>
                          {item.name}
                        </option>
                      );
                    })}
                  </>
                }
              />

              <PrimarySelect
                label="choose a subcategory"
                name="subcategory"
                error={errors?.subcategory}
                placeholder="choose your subcategory"
                register={register}
                options={
                  <>
                    {['bungalow', 'terrace'].map((item, index) => {
                      return (
                        <option value={item} key={index}>
                          {item}
                        </option>
                      );
                    })}
                  </>
                }
              />

              <PrimaryTextArea
                label="comments"
                name="comment"
                minH="150px"
                error={errors?.comment}
                defaultValue=""
                register={register}
              />

              <Box my="40px"></Box>

              <ButtonComponent content="submit" />
            </form>
          ) : (
            <Box borderRadius="8px 8px 0 0" overflow="hidden">
              <Flex w="100%" pos="relative" flexDirection="column">
                <Box w="full" h="250px" pos="relative">
                  <Image
                    src="/assets/nb.webp"
                    alt="propery-image"
                    w="100%"
                    height="100%"
                    objectFit="cover"
                  />

                  <Flex
                    bg="brand.100"
                    color="white"
                    pos="absolute"
                    w="fit-content"
                    px="1.5rem"
                    h="24px"
                    top="18%"
                    fontSize="14px"
                    align="center"
                    justify="center"
                    borderRadius="4px 0 0 4px"
                    right="0"
                    textTransform="capitalize"
                  >
                    lekki phase 1
                  </Flex>
                </Box>
              </Flex>

              <VStack
                alignItems="flex-start"
                spacing={4}
                mx="auto"
                my="20px"
                w="90%"
              >
                <Text
                  w="200px"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  fontWeight={600}
                  lineHeight={1.5}
                >
                  4 Bedroom duplex with BQ
                </Text>

                <HStack w="100%">
                  <Icons iconClass="fa-calendar-day" />

                  <Text>Next rent is due in 365 days</Text>
                </HStack>
              </VStack>

              <VStack
                alignItems="flex-start"
                spacing={4}
                mx="auto"
                my="20px"
                w="90%"
              >
                <Button
                  variant="outline"
                  width="100%"
                  fontSize="13px"
                  color="brand.900"
                  justifyContent="flex-start"
                  role="group"
                  display="flex"
                  alignItems="center"
                  onClick={() => setShowForm(1)}
                >
                  <Box
                    pr="10px"
                    _groupHover={{
                      color: 'white',
                    }}
                  >
                    <Icons iconClass="fa-home" />
                  </Box>
                  <Text>Complaints </Text>
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
                >
                  <Box
                    pr="10px"
                    _groupHover={{
                      color: 'white',
                    }}
                  >
                    <Icons iconClass="fa-calendar" />
                  </Box>
                  <Text>rent relief</Text>
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
                >
                  <Box
                    pr="10px"
                    _groupHover={{
                      color: 'white',
                    }}
                  >
                    <Icons iconClass="fa-house-person-leave" />
                  </Box>
                  <Text>Terminate tenancy</Text>
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
                >
                  <Box
                    pr="10px"
                    _groupHover={{
                      color: 'white',
                    }}
                  >
                    <Icons iconClass="fa-scroll" />
                  </Box>
                  <Text>receipts </Text>
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
                >
                  <Box
                    pr="10px"
                    _groupHover={{
                      color: 'white',
                    }}
                  >
                    <Icons iconClass="fa-file-minus" />
                  </Box>
                  <Text> tenancy agreement </Text>
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
                >
                  <Box
                    pr="10px"
                    _groupHover={{
                      color: 'white',
                    }}
                  >
                    <Icons iconClass="fa-calendar" />
                  </Box>
                  <Text>renew tenancy</Text>
                </Button>
              </VStack>
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TenancyModal;
