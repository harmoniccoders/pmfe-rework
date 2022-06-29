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
  FormControl,
  Select,
  FormLabel,
} from '@chakra-ui/react';
import Icons from 'lib/components/Icons';
import { PrimarySelect } from 'lib/Utils/PrimarySelect';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PrimaryTextArea } from 'lib/Utils/PrimaryTextArea';
import ButtonComponent from 'lib/components/Button';
import { useOperationMethod } from 'react-openapi-client';
import { ComplaintsCategory, ComplaintsModel } from 'types/api';
import { useToasts } from 'react-toast-notifications';
import RentReliefModal from '../RentReliefModal';
import AgreementModal from '../AgreementModal';
import TenancyAgreement from 'lib/components/my-rent/landlord/TenancyAgreement';
const moment = require('moment');

type Props = {
  isOpen: boolean;
  onClose: any;
  category: ComplaintsCategory[];
  propertyData: any;
};

const TenancyModal = ({ isOpen, onClose, category, propertyData }: Props) => {
  const [openRelief, setOpenRelief] = useState<boolean>(false);
  const [openAgree, setOpenAgree] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<number>(0);
  const [CreateComplaint, { loading, data, error }] =
    useOperationMethod('Complaintscreate');

  const [showCategory, setShowCategory] = useState<boolean>(false);

  const schema = yup.object().shape({
    complaintsSubCategoryId: yup.number().required(),
    comment: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors, isValid },
  } = useForm<ComplaintsModel>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: { propertyId: propertyData.property.id },
  });
  const { addToast } = useToasts();

  const onSubmit = async (data: ComplaintsModel) => {
    console.log({ data });

    try {
      const result = await (await CreateComplaint(undefined, data)).data;

      onClose();
      if (result.status) {
        addToast('Successful', {
          appearance: 'success',
          autoDismiss: true,
        });

        return;
      }
      addToast(result.message, {
        appearance: 'error',
        autoDismiss: true,
      });
    } catch (err) {}
  };

  const [cat, setCat] = useState();
  // console.log({ selectedCategory });
  const handleOnChange = (e: any) => {
    const { value } = e.target;
    setCat(value);
    setShowCategory(true);
  };
  const subCat = category.filter((x) => x.id == cat)[0];

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />

      <ModalContent
        py={5}
        borderRadius="0"
        w={['88%', '80%']}
        overflowY="auto"
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
              <FormControl>
                <FormLabel
                  textTransform="capitalize"
                  pos="relative"
                  top={5}
                  left={4}
                  width="fit-content"
                  zIndex={3}
                  bg="brand.200"
                >
                  choose a category
                </FormLabel>
                <Select
                  w="full"
                  border="1px solid grey"
                  borderRadius="0"
                  height="3rem"
                  fontSize=".9rem"
                  icon={<Icons iconClass="fa-angle-right" />}
                  onChange={handleOnChange}
                  textTransform="capitalize"
                >
                  <option disabled>choose a category </option>
                  <>
                    {category.map((item: any) => {
                      return (
                        <option value={item.id} key={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </>
                </Select>
              </FormControl>

              {showCategory && (
                <PrimarySelect<ComplaintsModel>
                  label="choose a subcategory"
                  name="complaintsSubCategoryId"
                  error={errors?.complaintsSubCategoryId}
                  placeholder="choose your subcategory"
                  register={register}
                  options={
                    <>
                      {subCat?.complaintsSubCategories?.map((item: any) => {
                        return (
                          <option value={item.id} key={item.id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </>
                  }
                />
              )}

              <PrimaryTextArea<ComplaintsModel>
                label="comments"
                name="comment"
                minH="150px"
                error={errors?.comment}
                defaultValue=""
                register={register}
              />

              <Box my="40px"></Box>

              <ButtonComponent
                content="submit"
                isValid={isValid}
                loading={loading}
              />
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
                    {propertyData.property.lga}
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
                  {propertyData.property.name}
                </Text>

                <HStack w="100%">
                  <Icons iconClass="fa-calendar-day" />

                  <Text>{`Next rent is due in ${moment(
                    propertyData.rentDueDate
                  ).diff(
                    moment(propertyData.transaction?.dateCreated),
                    'day'
                  )} days`}</Text>
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
                  onClick={() => setOpenRelief(true)}
                >
                  <Box
                    pr="10px"
                    _groupHover={{
                      color: 'white',
                    }}
                  >
                    <Icons iconClass="fa-life-ring" />
                  </Box>
                  <Text>Rent Relief</Text>
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
                    <Icons iconClass="fa-house-leave" />
                  </Box>
                  <Text>Terminate Tenancy</Text>
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
                  <Text>Receipts </Text>
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
                  onClick={() => setOpenAgree(true)}
                >
                  <Box
                    pr="10px"
                    _groupHover={{
                      color: 'white',
                    }}
                  >
                    <Icons iconClass="fa-file-minus" />
                  </Box>
                  <Text> Tenancy Agreement </Text>
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
                    <Icons iconClass="fa-life-ring" />
                  </Box>
                  <Text>Renew Tenancy</Text>
                </Button>
              </VStack>
            </Box>
          )}
        </ModalBody>
        <RentReliefModal
          onClose={() => setOpenRelief(false)}
          isOpen={openRelief}
          item={propertyData?.property}
        />
        <TenancyAgreement
          isOpen={openAgree}
          onClose={() => setOpenAgree(false)}
          data={propertyData}
        />
      </ModalContent>
    </Modal>
  );
};

export default TenancyModal;
