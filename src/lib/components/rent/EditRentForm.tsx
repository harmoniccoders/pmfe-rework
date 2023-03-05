import {
  Box,
  Text,
  Stack,
  Button,
  Flex,
  HStack,
  Tooltip,
  Icon,
  AspectRatio,
  Image,
  Center,
  useDisclosure,
  VStack,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { PrimaryInput } from 'lib/Utils/PrimaryInput';
import {
  PropertyModel,
  PropertyTitle,
  PropertyType,
  MediaModel,
  RentCollectionType,
  TenantType,
  PropertyView,
} from 'types/api';
import ButtonComponent from 'lib/components/Button';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import { useOperationMethod } from 'react-openapi-client';
import axios from 'axios';
import { RadioButton } from 'lib/Utils/CheckBox/RadioButton';
import RadioInput from 'lib/Utils/CheckBox/RadioInput';
import { FaInfoCircle, FaTrash } from 'react-icons/fa';
import NumberCounter from 'lib/Utils/NumberCounter';
import { Widget } from '@uploadcare/react-widget';
import { BiImage } from 'react-icons/bi';
import { incomeBracket } from 'lib/Utils/IncomeBracket';
import { SRLWrapper } from 'simple-react-lightbox';
import { Parameters } from 'openapi-client-axios';
import { PrimaryEditor } from 'lib/Utils/PrimaryEditor';
import { CurrencyField } from 'lib/Utils/CurrencyInput';
import { PrimarySelect } from 'lib/Utils/PrimarySelect';
import { VscDeviceCameraVideo } from 'react-icons/vsc';
import Geocode from 'react-geocode';
import PrimaryState from 'lib/Utils/PrimaryState';
import HelpMeSellModal from '../Modals/HelpMeSellModal';
import NewCheckbox from 'lib/Utils/CheckBox/NewCheckbox';
import { UserContext } from 'lib/Utils/MainContext';
import { useNonInitialEffect } from '../Generics/useNonInitialEffect';

interface Props {
  propertyTitles: PropertyTitle[];
  propertyTypes: PropertyType[];
  propertyTenants: TenantType[];
  propertyCollection: RentCollectionType[];
  getBanks: any[];
  formStep: number;
  item: PropertyView;
  setFormStep: any;
  onClose: () => void;
}

const EditRentForm = ({
  propertyTitles,
  propertyTypes,
  propertyTenants,
  propertyCollection,
  getBanks,
  formStep,
  setFormStep,
  item,
  onClose,
}: Props) => {
  const [PropertyCreate, { loading: isLoading, data, error }] =
    useOperationMethod('Propertyupdate');
  const [uploadedMedia, setUploadedMedia] = useState<MediaModel[]>(
    item.mediaFiles as MediaModel[]
  );
  const { isOpen: open, onOpen: opened, onClose: close } = useDisclosure();
  const [sellMyself, setSellMyself] = useState(item.sellMyself);
  const { user } = useContext(UserContext);
  console.log({ sellMyself });

  const schema = yup.object().shape({
    // address: yup.string().required(),
    // description: yup.string().required(),
    // title: yup.string().required(),
    // area: yup.string().required(),
    // lga: yup.string().required(),
    // state: yup.string().required(),
    // propertyTypeId: yup.number().required(),
    // sellMyself: yup.string().required(),
    // name: yup.string().required(),
    // numberOfBathrooms: yup.number().required(),
    // numberOfBedrooms: yup.number().required(),
    // price: yup.number().required(),
    // budget: yup.number().when('name', {
    //   is: () => formStep === 1,
    //   then: yup.number(),
    // }),
    // rentCollectionTypeId: yup.number().when('name', {
    //   is: () => formStep === 1,
    //   then: yup.number(),
    // }),
    // tenantTypeId: yup.number().when('name', {
    //   is: () => formStep === 1,
    //   then: yup.number(),
    // }),
    // bank: yup.string().when('name', {
    //   is: () => formStep === 1,
    //   then: yup.string(),
    // }),
    // accountNumber: yup.string().when('name', {
    //   is: () => formStep === 1,
    //   then: yup.string(),
    // }),
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    getValues,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm<PropertyModel>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      id: item.id,
      isActive: item.isActive,
      isForSale: item.isForSale,
      isDraft: item.isDraft,
      isForRent: item.isForRent,
      name: item.name as string,
      propertyTypeId: item.propertyTypeId,
      title: item.title as string,
      state: item.state,
      lga: item.lga,
      area: item.area,
      address: item.address as string,
      description: item.description as string,
      bank: item.createdByUser?.bank,
      accountNumber: item.createdByUser?.accountNumber,
      sellMyself: sellMyself,
      price: item.price,
      numberOfBathrooms: item.numberOfBathrooms,
      numberOfBedrooms: item.numberOfBedrooms,
      rentCollectionTypeId: 1,
      tenantTypeId: 1,
      budget: '',
    },
  });

  watch('numberOfBedrooms');
  watch('numberOfBathrooms');
  watch('sellMyself');

  console.log(watch('sellMyself'));

  const completeFormStep = () => {
    setFormStep((cur: number) => cur + 1);
  };

  const widgetApi = useRef();
  const widgetApis = useRef();

  const clearPreviewData = () => {
    setFormStep(0);
    onClose();
  };
  const RenderButton = () => {
    if (formStep === 0) {
      return (
        <>
          {sellMyself ? (
            <ButtonComponent content="Submit" loading={isSubmitting} isValid />
          ) : (
            <Button
              w="100%"
              h="100%"
              variant="solid"
              textTransform="capitalize"
              onClick={completeFormStep}
            >
              Next
            </Button>
          )}
        </>
      );
    } else if (formStep === 1) {
      return (
        <Box mt="2rem">
          <HStack spacing={3} pt="5">
            <Box w="50%">
              <ButtonComponent content="Submit" loading={isSubmitting} />
            </Box>
            <Button
              w="50%"
              mt="1rem"
              variant="outline"
              onClick={() => clearPreviewData()}
            >
              Cancel
            </Button>
          </HStack>
        </Box>
      );
    } else {
      return null;
    }
  };

  let uploaded;
  const onChangeImg = async (info: any, type: boolean) => {
    uploaded = await groupInfo(info.uuid);

    let medias: MediaModel[] = [];

    uploaded.files.forEach((file: any) => {
      let newMedia: MediaModel = {
        url: file.original_file_url,
        isImage: type ? true : false,
        isVideo: !type ? true : false,
        name: '',
        extention: '',
        base64String: '',
        propertyId: item.id,
      };

      medias.push(newMedia);
    });

    setUploadedMedia([...uploadedMedia, ...medias]);
  };

  // console.log({ uploadedMedia });

  const groupInfo = async (uuid: string) => {
    const result = await fetch(`https://api.uploadcare.com/groups/${uuid}/`, {
      headers: {
        Accept: 'application/vnd.uploadcare-v0.5+json',
        authorization:
          'Uploadcare.Simple fda3a71102659f95625f:dcdc4ba3595b6be5fc0d',
      },
    });

    let res = await result.json();
    return res;
  };

  const { addToast } = useToasts();
  const router = useRouter();

  const [deleteItem, { loading, data: isData, error: isError }] =
    useOperationMethod('Mediadelete{id}');

  const deleteMedia = async (media: any) => {
    const params: Parameters = {
      id: media.id,
    };

    if (media.id == undefined) {
      setUploadedMedia(uploadedMedia.filter((x) => x.url !== media.url));
      return;
    }
    try {
      const result = await (await deleteItem(params)).data;
      if (result.status) {
        setUploadedMedia(uploadedMedia.filter((x) => x.url !== media.url));
        return;
      }
      addToast(result.message, {
        appearance: 'error',
        autoDismiss: true,
      });
    } catch (err: any) {
      addToast(err.message || err.body.message, {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };
  const [uploadMedia, { loading: isLoad, data: isDatas, error: isErrors }] =
    useOperationMethod('Mediaupload');

  const updateMedia = async (data: MediaModel) => {
    try {
      const result = await (await uploadMedia(undefined, data)).data;
      if (result.status) {
        return;
      }
      addToast(result.message, {
        appearance: 'error',
        autoDismiss: true,
      });
    } catch (err: any) {
      addToast(err.message || err.body.message, {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };
  Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string);
  Geocode.setRegion('ng');
  //@ts-ignore
  Geocode.setLocationType('ROOFTOP');
  Geocode.enableDebug();

  const getLongAndLat = async (values: PropertyModel) => {
    try {
      const { results } = await Geocode.fromAddress(values.address);

      values.latitude = results[0].geometry.location.lat;
      values.longitude = results[0].geometry.location.lng;
      return values;
    } catch (error) {
      return values;
    }
  };

  const toast = useToast();

  const asyncForEach = async (array: any, callback: any) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  };

  const onSubmit = async (data: PropertyModel) => {
    await getLongAndLat(data);
    await asyncForEach(
      uploadedMedia.filter((x) => x.propertyId !== undefined),
      async (select: MediaModel) => {
        await updateMedia(select);
      }
    );

    data.sellMyself = sellMyself;
    data.mediaFiles = uploadedMedia;
    data.bank = user?.bank || data.bank;
    data.accountNumber = user?.accountNumber || data.accountNumber;
    if (
      data.numberOfBathrooms == undefined ||
      data.numberOfBathrooms == 0 ||
      data.numberOfBedrooms == undefined ||
      data.numberOfBedrooms == 0
    ) {
      toast({
        position: 'top-right',
        status: 'warning',
        description: 'Number of bedrooms or bathrooms can not be 0',
      });
      return;
    }
    // if ((data.mediaFiles as unknown as []).length == 0) {
    //   toast({
    //     position: 'top-right',
    //     status: 'warning',
    //     description: 'Please upload an image or video of your property',
    //   });
    //   return;
    // }

    try {
      const result = await (await PropertyCreate(undefined, data)).data;

      if (result.status) {
        addToast(
          'Your property has been submitted for review. We will notify you when it goes live.',
          {
            appearance: 'success',
            autoDismiss: true,
          }
        );
        onClose();
        setFormStep(0);
        router.reload();
        return;
      }
      addToast(result.message, {
        appearance: 'error',
        autoDismiss: true,
      });
      setFormStep(0);
      onClose();
      return;
    } catch (err: any) {
      addToast(err.message || err.body.message, {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  return (
    <>
      <Box>
        <Stack>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <>
              {formStep == 0 && (
                <>
                  <PrimaryInput<PropertyModel>
                    label="Name"
                    name="name"
                    error={errors.name}
                    placeholder="Give your listing a name that makes it able to find"
                    defaultValue=""
                    register={register}
                  />
                  <PrimarySelect<PropertyModel>
                    register={register}
                    error={errors.propertyTypeId}
                    label="Type"
                    placeholder="Choose a Property"
                    name="propertyTypeId"
                    options={
                      <>
                        {propertyTypes.map((x: PropertyType) => {
                          return <option value={x.id}>{x.name}</option>;
                        })}
                      </>
                    }
                  />
                  <PrimarySelect<PropertyModel>
                    register={register}
                    error={errors.title}
                    label="Property Title"
                    placeholder="Certificate of Occupancy, Governor's Consent ..."
                    name="title"
                    options={
                      <>
                        {propertyTitles.map((x: PropertyType) => {
                          return (
                            <option value={x.name as string}>{x.name}</option>
                          );
                        })}
                      </>
                    }
                  />
                  <PrimaryState
                    register={register}
                    error={errors.state}
                    errors={errors.lga}
                    getValues={getValues}
                    watch={watch}
                  />

                  <PrimaryInput<PropertyModel>
                    label="Landmark"
                    name="area"
                    placeholder=""
                    error={errors.area}
                    defaultValue="Nearest Landmark"
                    register={register}
                  />
                  <PrimaryInput<PropertyModel>
                    label="Address"
                    name="address"
                    placeholder="Enter your address"
                    error={errors.address}
                    defaultValue=""
                    register={register}
                  />
                  <PrimaryEditor<PropertyModel>
                    name="description"
                    control={control}
                    label="Description"
                    register={register}
                    defaultValue=""
                    error={errors.description}
                  />
                  <CurrencyField<PropertyModel>
                    placeholder="₦0.00"
                    defaultValue={item.price}
                    register={register}
                    error={errors.price}
                    name={'price'}
                    control={control}
                    label="Rent (Per year)"
                  />

                  <Box>
                    <Flex
                      w="full"
                      border="1px solid grey"
                      height="3rem"
                      px="1rem"
                      align="center"
                      my="1.5rem"
                      cursor="pointer"
                      borderRadius="6px" //@ts-ignore
                      onClick={() => widgetApi.current.openDialog()}
                    >
                      <Icon as={BiImage} />
                      <Text fontWeight="500" pl="1rem">
                        Upload an Image
                      </Text>
                    </Flex>
                    <Widget
                      publicKey="fda3a71102659f95625f"
                      //@ts-ignore
                      id="file"
                      multiple
                      imageShrink="640x480"
                      multipleMax={9}
                      imagePreviewMaxSize={9}
                      imagesOnly
                      onChange={(info) => onChangeImg(info, true)}
                      //@ts-ignore
                      ref={widgetApi}
                    />
                    <>
                      {uploadedMedia && uploadedMedia?.length > 0 && (
                        <HStack
                          w="full"
                          spacing="1rem"
                          overflow="auto"
                          mt="1rem"
                        >
                          {uploadedMedia
                            .filter((m) => m.isImage)
                            .map((item: any) => {
                              return (
                                <SRLWrapper>
                                  <Box
                                    w="90px"
                                    h="90px"
                                    borderRadius="5px"
                                    bgColor="brand.50"
                                    flexShrink={0}
                                    overflow="hidden"
                                    role="group"
                                    pos="relative"
                                  >
                                    <Box
                                      pos="absolute"
                                      left="50%"
                                      top="50%"
                                      w="full"
                                      h="full"
                                      display="flex"
                                      justifyContent="center"
                                      alignItems="center"
                                      transition=".5s ease all"
                                      opacity="0"
                                      cursor="pointer"
                                      transform="translate(-50%, -50%)"
                                      _groupHover={{
                                        opacity: 1,
                                        bgColor: 'rgba(0,0,0,.5)',
                                      }}
                                    >
                                      {loading ? (
                                        <Spinner />
                                      ) : (
                                        <FaTrash
                                          color="white"
                                          fontSize="1rem"
                                          onClick={() => {
                                            deleteMedia(item);
                                          }}
                                        />
                                      )}
                                    </Box>
                                    <Image
                                      src={item.url}
                                      alt="propery-image"
                                      w="100%"
                                      height="100%"
                                      objectFit="cover"
                                    />
                                  </Box>
                                </SRLWrapper>
                              );
                            })}
                        </HStack>
                      )}
                    </>
                  </Box>
                  <Box>
                    <Flex
                      w="full"
                      border="1px solid grey"
                      height="3rem"
                      px="1rem"
                      align="center"
                      my="1.5rem"
                      cursor="pointer"
                      borderRadius="6px" //@ts-ignore
                      onClick={() => widgetApis.current.openDialog()}
                    >
                      <Icon as={VscDeviceCameraVideo} />
                      <Text fontWeight="500" pl="1rem">
                        Upload an Interactive Video
                      </Text>
                    </Flex>
                    <Widget
                      publicKey="fda3a71102659f95625f"
                      //@ts-ignore
                      id="file"
                      multiple
                      imageShrink="640x480"
                      multipleMax={3}
                      imagePreviewMaxSize={9}
                      inputAcceptTypes={'video/*'}
                      onChange={(info) => onChangeImg(info, false)}
                      //@ts-ignore
                      ref={widgetApis}
                    />
                    <>
                      {uploadedMedia && uploadedMedia?.length > 0 && (
                        <HStack
                          w="full"
                          spacing="1rem"
                          overflow="auto"
                          mt="1rem"
                        >
                          {uploadedMedia
                            .filter((m) => m.isVideo)
                            .map((item: any) => {
                              return (
                                <SRLWrapper>
                                  <Box
                                    w="90px"
                                    h="90px"
                                    borderRadius="5px"
                                    bgColor="brand.50"
                                    flexShrink={0}
                                    overflow="hidden"
                                    role="group"
                                    pos="relative"
                                  >
                                    <Box
                                      pos="absolute"
                                      left="50%"
                                      top="50%"
                                      w="full"
                                      h="full"
                                      display="flex"
                                      justifyContent="center"
                                      alignItems="center"
                                      transition=".5s ease all"
                                      opacity="0"
                                      cursor="pointer"
                                      zIndex="999"
                                      transform="translate(-50%, -50%)"
                                      _groupHover={{
                                        opacity: 1,
                                        bgColor: 'rgba(0,0,0,.5)',
                                      }}
                                    >
                                      {loading ? (
                                        <Spinner />
                                      ) : (
                                        <FaTrash
                                          color="white"
                                          fontSize="1rem"
                                          onClick={() => {
                                            deleteMedia(item);
                                          }}
                                        />
                                      )}
                                    </Box>
                                    <video
                                      controls
                                      style={{
                                        objectFit: 'cover',
                                        maxWidth: '130px',
                                        height: '130px',
                                      }}
                                    >
                                      <source src={item.url as string} />
                                    </video>
                                  </Box>
                                </SRLWrapper>
                              );
                            })}
                        </HStack>
                      )}
                    </>
                  </Box>
                  <NumberCounter
                    valueName="numberOfBedrooms"
                    setValue={setValue}
                    getValues={getValues}
                    label="Number of Bedrooms"
                  />
                  <NumberCounter
                    valueName="numberOfBathrooms"
                    setValue={setValue}
                    getValues={getValues}
                    label="Number of Bathrooms"
                  />
                  <VStack my="1.3em" align="flex-start">
                    <NewCheckbox
                      checked={sellMyself}
                      onChange={() => setSellMyself(true)}
                      label="I want to manage the tenant myself"
                    />
                    <Flex align="center" gap="1" pos="relative">
                      <NewCheckbox
                        checked={!sellMyself}
                        onChange={() => setSellMyself(false)}
                        label="Help me manage my tenant"
                      />
                      <Box as="span" cursor="pointer">
                        <FaInfoCircle onMouseOver={opened} />
                      </Box>
                    </Flex>
                  </VStack>
                </>
              )}
              {formStep === 1 && (
                <>
                  <Box>
                    <Text fontWeight="600">
                      What kind of tenants do you want?
                    </Text>
                    <PrimarySelect<PropertyModel>
                      register={register}
                      error={errors.tenantTypeId}
                      label="Type"
                      placeholder="Choose an option"
                      name="tenantTypeId"
                      options={
                        <>
                          {propertyTenants.map((x: TenantType) => {
                            return <option value={x.id}>{x.name}</option>;
                          })}
                        </>
                      }
                    />
                    <PrimarySelect<PropertyModel>
                      register={register}
                      error={errors.budget}
                      label="Annual Income Bracket"
                      placeholder="Choose an option"
                      name="budget"
                      options={
                        <>
                          {incomeBracket.map((x: any) => {
                            return <option value={x.id}>{x.name}</option>;
                          })}
                        </>
                      }
                    />
                  </Box>
                  <Box mt="8">
                    <Text fontWeight="600">Rent Collection</Text>
                    <PrimarySelect<PropertyModel>
                      register={register}
                      error={errors.rentCollectionTypeId}
                      label="How Frequently do you want to collect rent?"
                      placeholder="Choose option: weekly, monthly, yearly"
                      name="rentCollectionTypeId"
                      // defaultValue={item?.rent}
                      options={
                        <>
                          {propertyCollection.map((x: RentCollectionType) => {
                            return <option value={x.id}>{x.name}</option>;
                          })}
                        </>
                      }
                    />
                    <Tooltip
                      label={
                        user?.accountNumber !== null
                          ? 'Account information can only be changed on your profile page'
                          : ''
                      }
                      hasArrow
                    >
                      <Box>
                        <PrimarySelect<PropertyModel>
                          register={register}
                          error={errors.bank}
                          defaultValue={item?.createdByUser?.bank}
                          label="Your Bank"
                          placeholder="Choose your bank"
                          name="bank"
                          disabled={item?.createdByUser?.bank !== null}
                          options={
                            <>
                              {getBanks?.map((x: any, i: any) => {
                                return (
                                  <option value={x.name} key={i}>
                                    {x.name}
                                  </option>
                                );
                              })}
                            </>
                          }
                        />
                        <PrimaryInput<PropertyModel>
                          label="Your Account Number"
                          name="accountNumber"
                          placeholder="Enter your bank account number"
                          defaultValue={
                            item?.createdByUser?.accountNumber as string
                          }
                          register={register}
                          error={errors.accountNumber}
                          disableLabel={
                            item?.createdByUser?.accountNumber !== null
                          }
                        />
                      </Box>
                    </Tooltip>
                  </Box>
                </>
              )}

              {RenderButton()}
            </>
          </form>
        </Stack>
        <HelpMeSellModal onClose={close} isOpen={open} isRent={true} />
      </Box>
    </>
  );
};

export default EditRentForm;
