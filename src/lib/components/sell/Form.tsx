import {
  Box,
  Text,
  Stack,
  Button,
  Image,
  Flex,
  HStack,
  Center,
  Tooltip,
  Icon,
  AspectRatio,
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
  UserView,
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
import { VscDeviceCameraVideo } from 'react-icons/vsc';
import { Widget } from '@uploadcare/react-widget';
import { BiImage } from 'react-icons/bi';
import { SRLWrapper } from 'simple-react-lightbox';
import { PrimaryEditor } from 'lib/Utils/PrimaryEditor';
import { CurrencyField } from 'lib/Utils/CurrencyInput';
import Geocode from 'react-geocode';
import { PrimarySelect } from 'lib/Utils/PrimarySelect';
import PrimaryState from 'lib/Utils/PrimaryState';
import HelpMeSellModal from '../Modals/HelpMeSellModal';
import { PrimaryCheckbox } from 'lib/Utils/CheckBox/PrimaryCheckbox';
import NewCheckbox from 'lib/Utils/CheckBox/NewCheckbox';
import { UserContext } from 'lib/Utils/MainContext';
// const ngBanks = require('ng-banks');

interface Props {
  propertyTitles: PropertyTitle[];
  propertyTypes: PropertyType[];
  formStep: number;
  setFormStep: any;
  onClose: () => void;
  getBanks: any;
}
const Form = ({
  propertyTitles,
  propertyTypes,
  formStep,
  setFormStep,
  getBanks,
  onClose,
}: Props) => {
  const [PropertyCreate, { loading: isLoading, data, error }] =
    useOperationMethod('Propertycreate');
  const [uploadedMedia, setUploadedMedia] = useState<MediaModel[]>([]);
  const { isOpen: open, onOpen: opened, onClose: close } = useDisclosure();
  const { user } = useContext(UserContext);

  let validationSchema = {
    address: yup.string().required(),
    description: yup.string().required(),
    title: yup.string().required(),
    area: yup.string().required(),
    lga: yup.string().required(),
    state: yup.string().required(),
    propertyTypeId: yup.string().required(),
    name: yup.string().required(),
  };
  if (formStep === 1) {
    validationSchema = {
      //@ts-ignore
      price: yup.number().required(),
      numberOfBedrooms: yup.number().min(1).required(),
      numberOfBathrooms: yup.number().min(1).required(),
      numberOfFloors: yup.number().min(1).required(),
    };
  }
  const schema = yup.object().shape(validationSchema);

  const {
    register,
    handleSubmit,
    trigger,
    control,
    watch,
    reset,
    getValues,
    formState: { errors, isValid, isSubmitting },
  } = useForm<PropertyModel>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      isForSale: true,
    },
  });

  const completeFormStep = async () => {
    await trigger();
    if (isValid) {
      setFormStep((cur: number) => cur + 1);
      return;
    }
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
        <Button
          w="100%"
          h="100%"
          variant="solid"
          textTransform="capitalize"
          onClick={completeFormStep}
          // disabled={isValid ? false : true}
        >
          Next
        </Button>
      );
    } else if (formStep === 1) {
      return (
        <Box mt="2rem">
          <HStack spacing={3}>
            <Button
              w="50%"
              variant="outline"
              onClick={() => {
                saveToDraft(true);
              }}
              isLoading={draftLoading && isSubmitting}
            >
              Save as Draft
            </Button>
            <Button
              w="50%"
              variant="outline"
              onClick={() => {
                saveToDraft(false);
              }}
              isLoading={!draftLoading && isSubmitting}
            >
              Publish
            </Button>
          </HStack>
          <Button
            w="full"
            variant="outline"
            onClick={() => clearPreviewData()}
            mt="1rem"
          >
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

    let newArr = [info.count];

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

  const [sellMyself, setSellMyself] = useState(true);
  const [draftLoading, setDraftLoading] = useState(false);
  const toast = useToast();
  const saveToDraft = (draft: boolean) => {
    draft ? setDraftLoading(true) : setDraftLoading(false);
    const onSubmit = async (data: PropertyModel) => {
      await getLongAndLat(data);
      draft ? (data.isDraft = true) : (data.isDraft = false);

      data.sellMyself = sellMyself;
      data.mediaFiles = uploadedMedia;
      data.bank = user?.bank || data.bank;
      data.accountNumber = user?.accountNumber || data.accountNumber;

      if (data.mediaFiles.length == 0) {
        toast({
          position: 'top-right',
          status: 'warning',
          description: 'Please upload an image or video of your property',
        });
        return;
      }
      // console.log({ data });

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
                        {propertyTypes?.map((x: PropertyType) => {
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
                    placeholder="Nearest Landmark"
                    error={errors.area}
                    defaultValue=""
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
                    <Tooltip
                      label={
                        user?.accountNumber !== null
                          ? 'Account information can only be changed on your profile page'
                          : ''
                      }
                      hasArrow
                    >
                      <Box mb="1.3rem">
                        <PrimarySelect<PropertyModel>
                          register={register}
                          error={errors.bank}
                          label="Your Bank"
                          placeholder="Choose your bank"
                          name="bank"
                          defaultValue={user?.bank}
                          disabled={user?.bank !== null}
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
                          defaultValue={user?.accountNumber}
                          register={register}
                          error={errors.accountNumber}
                          disableLabel={user?.accountNumber !== null}
                        />
                      </Box>
                    </Tooltip>
                  )}
                </>
              )}
              {formStep === 1 && (
                <>
                  <CurrencyField<PropertyModel>
                    placeholder="₦0.00"
                    defaultValue=""
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
                    {uploadedMedia.length > 0 && (
                      <>
                        <HStack w="full" spacing="1rem" overflow="auto">
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
                                      <FaTrash
                                        color="white"
                                        fontSize="1rem"
                                        onClick={() => {
                                          setUploadedMedia(
                                            uploadedMedia.filter(
                                              (x) => x.url !== item.url
                                            )
                                          );
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
                                      <FaTrash
                                        color="white"
                                        fontSize="1rem"
                                        cursor="pointer"
                                        onClick={() => {
                                          setUploadedMedia(
                                            uploadedMedia.filter(
                                              (x) => x.url !== item.url
                                            )
                                          );
                                        }}
                                      />
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
                      </>
                    )}
                  </Box>

                  <NumberCounter
                    register={register}
                    control={control}
                    error={errors.numberOfBedrooms}
                    name="numberOfBedrooms"
                    label="Number of Bedrooms"
                    fontSize="sm"
                  />
                  <NumberCounter
                    register={register}
                    control={control}
                    error={errors.numberOfBathrooms}
                    name="numberOfBathrooms"
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

export default Form;
