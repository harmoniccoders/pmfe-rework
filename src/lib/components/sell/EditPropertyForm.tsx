import {
  Box,
  Text,
  Stack,
  Button,
  Image,
  Flex,
  HStack,
  Tooltip,
  Icon,
  AspectRatio,
  Center,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { PrimaryInput } from 'lib/Utils/PrimaryInput';
import {
  MediaModel,
  PropertyModel,
  PropertyTitle,
  PropertyType,
  PropertyView,
} from 'types/api';
import ButtonComponent from 'lib/components/Button';
import React, { useContext, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import { useOperationMethod } from 'react-openapi-client';
import { RadioButton } from 'lib/Utils/CheckBox/RadioButton';
import RadioInput from 'lib/Utils/CheckBox/RadioInput';
import { FaInfoCircle, FaTrash } from 'react-icons/fa';
import NumberCounter from 'lib/Utils/NumberCounter';
import { VscDeviceCameraVideo } from 'react-icons/vsc';
import { Widget } from '@uploadcare/react-widget';
import { BiImage } from 'react-icons/bi';
import { SRLWrapper } from 'simple-react-lightbox';
import { Parameters } from 'openapi-client-axios';
import { PrimaryEditor } from 'lib/Utils/PrimaryEditor';
import { CurrencyField } from 'lib/Utils/CurrencyInput';
import Geocode from 'react-geocode';
import { PrimarySelect } from 'lib/Utils/PrimarySelect';
import PrimaryState from 'lib/Utils/PrimaryState';
import HelpMeSellModal from '../Modals/HelpMeSellModal';
import NewCheckbox from 'lib/Utils/CheckBox/NewCheckbox';
import { UserContext } from 'lib/Utils/MainContext';

interface Props {
  propertyTitles: PropertyTitle[];
  propertyTypes: PropertyType[];
  item: PropertyView;
  formStep: number;
  setFormStep: any;
  onClose: () => void;
  getBanks: any;
}
const EditPropertyForm = ({
  propertyTitles,
  propertyTypes,
  formStep,
  setFormStep,
  item,
  getBanks,
  onClose,
}: Props) => {
  const [PropertyCreate, { loading: isLoading, data, error }] =
    useOperationMethod('Propertyupdate');
  const [uploadedMedia, setUploadedMedia] = useState<MediaModel[]>([]);
  const { isOpen: open, onOpen: opened, onClose: close } = useDisclosure();
  // console.log({ getBanks });

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
    // price: yup.number().when('name', {
    //   is: () => formStep === 1,
    //   then: yup.number(),
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
      isForRent: item.isForRent,
      name: item.name as string,
      propertyTypeId: item.propertyTypeId,
      title: item?.title as string,
      state: item.state,
      lga: item.lga,
      area: item.area,
      address: item?.address as string,
      description: item?.description as string,
      sellMyself: item.sellMyself,
      price: item.price,
      numberOfBathrooms: item.numberOfBathrooms,
      numberOfBedrooms: item.numberOfBedrooms,
      accountNumber: item?.createdByUser?.accountNumber,
      bank: item.createdByUser?.bank,
    },
  });

  watch('numberOfBathrooms');
  watch('numberOfBedrooms');

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
        <Box onClick={completeFormStep}>
          <Button
            type="button"
            w="100%"
            h="100%"
            variant="solid"
            textTransform="capitalize"
            disabled={isValid ? false : true}
          >
            Next
          </Button>
        </Box>
      );
    } else if (formStep === 1) {
      return (
        <Box>
          <HStack spacing={3}>
            <Button
              w="50%"
              variant="outline"
              onClick={() => {
                saveToDraft(true);
              }}
              isLoading={draftLoading && isSubmitting}
            >
              {item.isDraft ? 'Update Draft' : 'Move to Draft'}
            </Button>
            <Button
              w="50%"
              variant="outline"
              onClick={() => {
                saveToDraft(false);
              }}
              isLoading={!draftLoading && isSubmitting}
            >
              {item.isDraft ? 'Publish' : 'Update'}
            </Button>
          </HStack>
          <Button w="full" variant="outline" onClick={() => clearPreviewData()}>
            Cancel
          </Button>
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
      };

      medias.push(newMedia);
    });

    setUploadedMedia([...uploadedMedia, ...medias]);
  };

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

  const deleteMedia = async (mediaId: any) => {
    const params: Parameters = {
      id: mediaId,
    };

    try {
      const result = await (await deleteItem(params)).data;
      if (result.status) {
        addToast(
          'File deleted successfully, you may need to reload page to see changes',
          {
            appearance: 'success',
            autoDismiss: true,
          }
        );
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
  const [sellMyself, setSellMyself] = useState(item.sellMyself);
  const { user } = useContext(UserContext);
  const [draftLoading, setDraftLoading] = useState(false);
  const toast = useToast();
  const saveToDraft = (draft: boolean) => {
    draft ? setDraftLoading(true) : setDraftLoading(false);
    const onSubmit = async (data: PropertyModel) => {
      await getLongAndLat(data);
      {
        draft ? (data.isDraft = true) : (data.isDraft = false);
      }

      data.sellMyself = sellMyself;
      data.mediaFiles = item.mediaFiles?.concat(uploadedMedia);
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
      if ((data.mediaFiles as unknown as []).length == 0) {
        toast({
          position: 'top-right',
          status: 'warning',
          description: 'Please upload an image or video of your property',
        });
        return;
      }

      try {
        const result = await (await PropertyCreate(undefined, data)).data;

        if (result.status) {
          draft
            ? addToast('Property Saved to Draft', {
                appearance: 'success',
                autoDismiss: true,
              })
            : addToast(
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
    handleSubmit(onSubmit)();
  };

  return (
    <>
      <Box>
        <Stack>
          <form style={{ width: '100%' }}>
            <>
              {formStep === 0 && (
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
                  <VStack my="1.3em" align="flex-start">
                    <NewCheckbox
                      checked={sellMyself}
                      onChange={() => setSellMyself(true)}
                      label="I want to sell myself"
                    />
                    <Flex align="center" gap="1" pos="relative">
                      <NewCheckbox
                        checked={!sellMyself}
                        onChange={() => setSellMyself(false)}
                        label="Help me sell"
                      />
                      <Box as="span" cursor="pointer">
                        <FaInfoCircle onMouseOver={opened} />
                      </Box>
                    </Flex>
                  </VStack>
                  {!sellMyself && (
                    <Box mb="1.3rem">
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
                  )}
                </>
              )}
              {formStep === 1 && (
                <>
                  <CurrencyField<PropertyModel>
                    placeholder="₦0.00"
                    defaultValue={item.price}
                    register={register}
                    error={errors.price}
                    name={'price'}
                    control={control}
                    label="Price"
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
                      {item.mediaFiles && item.mediaFiles?.length > 0 && (
                        <HStack w="full" spacing="1rem" overflow="auto">
                          {item.mediaFiles
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
                                      <FaTrash
                                        color="white"
                                        fontSize="1rem"
                                        onClick={() => {
                                          deleteMedia(item.id);
                                        }}
                                      />
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
                    {uploadedMedia.length > 0 && (
                      <>
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
                                    pos="relative"
                                  >
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
                      </>
                    )}
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
                      {item.mediaFiles && item.mediaFiles?.length > 0 && (
                        <HStack w="full" spacing="1rem" overflow="auto">
                          {item.mediaFiles
                            .filter((m) => m.isVideo)
                            .map((item: any) => {
                              return (
                                <SRLWrapper>
                                  <Box role="group" pos="relative">
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
                                      <FaTrash
                                        color="white"
                                        fontSize="1rem"
                                        onClick={() => {
                                          deleteMedia(item.id);
                                        }}
                                      />
                                    </Box>
                                    <video width="150px" height="150px">
                                      <source
                                        src={item.url as string}
                                        type="video/mp4"
                                      />
                                      Your browser does not support this video
                                    </video>
                                  </Box>
                                </SRLWrapper>
                              );
                            })}
                        </HStack>
                      )}
                    </>
                    {uploadedMedia.length > 0 && (
                      <>
                        <HStack w="full" spacing="1rem" overflow="auto">
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
                                  >
                                    <AspectRatio
                                      maxW="150px"
                                      w="full"
                                      ratio={1}
                                    >
                                      <iframe
                                        title="Interactive videp"
                                        src={item.url as string}
                                        allowFullScreen
                                      />
                                    </AspectRatio>
                                  </Box>
                                </SRLWrapper>
                              );
                            })}
                        </HStack>
                      </>
                    )}
                  </Box>

                  <NumberCounter
                    valueName="numberOfBedrooms"
                    setValue={setValue}
                    getValues={getValues}
                    label="Number of Bedrooms"
                    fontSize="sm"
                  />
                  <NumberCounter
                    valueName="numberOfBathrooms"
                    setValue={setValue}
                    getValues={getValues}
                    label="Number of Bathrooms"
                    fontSize="sm"
                  />
                </>
              )}

              {RenderButton()}
            </>
          </form>
        </Stack>
        <HelpMeSellModal onClose={close} isOpen={open} />
      </Box>
    </>
  );
};

export default EditPropertyForm;
