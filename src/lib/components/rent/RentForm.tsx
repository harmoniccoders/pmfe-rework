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
} from '@chakra-ui/react';
import { PrimaryInput } from 'lib/Utils/PrimaryInput';
import {
  PropertyModel,
  PropertyTitle,
  PropertyType,
  MediaModel,
  RentCollectionType,
  TenantType,
} from 'types/api';
import ButtonComponent from 'lib/components/Button';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import { useOperationMethod } from 'react-openapi-client';
import axios from 'axios';
import { RadioButton } from 'lib/Utils/CheckBox/RadioButton';
import RadioInput from 'lib/Utils/CheckBox/RadioInput';
import { FaInfoCircle } from 'react-icons/fa';
import NumberCounter from 'lib/Utils/NumberCounter';
import { Widget } from '@uploadcare/react-widget';
import { BiImage } from 'react-icons/bi';
import { incomeBracket } from 'lib/Utils/IncomeBracket';
import { SRLWrapper } from 'simple-react-lightbox';
import { PrimaryEditor } from 'lib/Utils/PrimaryEditor';
import { CurrencyField } from 'lib/Utils/CurrencyInput';
import Geocode from 'react-geocode';
import { PrimarySelect } from 'lib/Utils/PrimarySelect';

interface Props {
  propertyTitles: PropertyTitle[];
  propertyTypes: PropertyType[];
  propertyTenants: TenantType[];
  propertyCollection: RentCollectionType[];
  getStates: any[];
  getBanks: any[];
  formStep: number;
  setFormStep: any;
  onClose: () => void;
  isClosed: () => void;
}

const RentForm = ({
  propertyTitles,
  propertyTypes,
  propertyTenants,
  propertyCollection,
  getStates,
  getBanks,
  formStep,
  setFormStep,
  onClose,
  isClosed,
}: Props) => {
  const [PropertyUser, { loading, data, error }] =
    useOperationMethod('Propertycreate');
  const [uploadedMedia, setUploadedMedia] = useState<MediaModel[]>([]);

  const schema = yup.object().shape({
    address: yup.string().required(),
    description: yup.string().required(),
    title: yup.string().required(),
    area: yup.string().required(),
    lga: yup.string().required(),
    state: yup.string().required(),
    propertyTypeId: yup.number().required(),
    sellMyself: yup.string().required(),
    name: yup.string().required(),
    numberOfBathrooms: yup.number().required(),
    numberOfBedrooms: yup.number().required(),
    price: yup.number().required(),
    budget: yup.number().when('name', {
      is: () => formStep === 1,
      then: yup.number(),
    }),
    rentCollectionTypeId: yup.number().when('name', {
      is: () => formStep === 1,
      then: yup.number(),
    }),
    tenantTypeId: yup.number().when('name', {
      is: () => formStep === 1,
      then: yup.number(),
    }),
    bank: yup.string().when('name', {
      is: () => formStep === 1,
      then: yup.string(),
    }),
    accountNumber: yup.string().when('name', {
      is: () => formStep === 1,
      then: yup.string(),
    }),
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm<PropertyModel>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      isForRent: true,
      isDraft: false,
      isForSale: false,
    },
  });

  watch('numberOfBedrooms');
  watch('numberOfBathrooms');
  watch('sellMyself');

  const completeFormStep = () => {
    setFormStep((cur: number) => cur + 1);
  };

  const widgetApi = useRef();
  const widgetApis = useRef();

  const [lgas, setLgas] = useState([]);

  useEffect(() => {
    const getLga = async (state: string) => {
      const result = (
        await axios.get(
          `http://locationsng-api.herokuapp.com/api/v1/states/${state}/lgas`
        )
      ).data;

      if (Array.isArray(result) === true) {
        setLgas(
          result.map((value: string) => {
            return { name: value };
          })
        );
      }
    };
    getLga(getValues('state') as unknown as string);
  }, [watch('state')]);

  const clearPreviewData = () => {
    setFormStep(0);
    onClose();
  };
  const RenderButton = () => {
    if (formStep === 0) {
      return (
        <>
          {
            //@ts-ignore
            getValues('sellMyself') === 'true' ? (
              <ButtonComponent
                content="Submit"
                isValid={isValid}
                loading={loading}
              />
            ) : (
              <Box onClick={completeFormStep}>
                <Button
                  type="button"
                  w="100%"
                  h="100%"
                  variant="solid"
                  textTransform="capitalize"
                  disabled={isValid ? false : true}
                  isLoading={loading}
                >
                  Next
                </Button>
              </Box>
            )
          }
        </>
      );
    } else if (formStep === 1) {
      return (
        <Box>
          <HStack spacing={3} pt="5">
            <Box w="50%">
              <ButtonComponent
                content="Submit"
                isValid={isValid}
                loading={loading}
              />
            </Box>
            <Button
              w="50%"
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

  const onSubmit = async (data: PropertyModel) => {
    await getLongAndLat(data);
    data.sellMyself = data.sellMyself as boolean;
    data.mediaFiles = uploadedMedia;
    try {
      const result = await (await PropertyUser(undefined, data)).data;

      if (result.status !== 400) {
        addToast('Property Added', {
          appearance: 'success',
          autoDismiss: true,
        });
        isClosed();
        onClose();
        setFormStep(0);
        router.push('/listings/myrents');
        return;
      }
      addToast(result.message, {
        appearance: 'error',
        autoDismiss: true,
      });
      setFormStep(0);
      onClose();
      return;
    } catch (err) {}
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
                  <PrimarySelect<PropertyModel>
                    register={register}
                    error={errors.state}
                    label="State"
                    placeholder="Which state in Nigeria is your property located"
                    name="state"
                    options={
                      <>
                        {getStates.map((x: any) => {
                          return <option value={x.name}>{x.name}</option>;
                        })}
                      </>
                    }
                  />

                  {getValues('state') !== undefined ? (
                    <PrimarySelect<PropertyModel>
                      register={register}
                      error={errors.lga}
                      label="LGA"
                      placeholder="Local Government Area"
                      name="lga"
                      options={
                        <>
                          {lgas.map((x: any) => {
                            return <option value={x.name}>{x.name}</option>;
                          })}
                        </>
                      }
                    />
                  ) : null}

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
                    defaultValue=""
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
                      <Icon as={BiImage} />
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
                  />
                  <NumberCounter
                    valueName="numberOfBathrooms"
                    setValue={setValue}
                    getValues={getValues}
                    label="Number of Bathrooms"
                  />
                  <Box my="1.3em">
                    <RadioButton<PropertyModel>
                      name="sellMyself"
                      register={register}
                      defaultValue=""
                      error={errors.sellMyself}
                      control={control}
                      radios={
                        <>
                          <RadioInput
                            label={'I want to manage the tenant myself'}
                            value={'true'}
                          />
                          <Flex align="center" gap="1" pos="relative">
                            <RadioInput
                              label={'Help me manage my tenant'}
                              value={'false'}
                            />
                            <Tooltip
                              label="We help you rent out your property."
                              aria-label="A tooltip"
                            >
                              <FaInfoCircle />
                            </Tooltip>
                          </Flex>
                        </>
                      }
                    />
                  </Box>
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
                      options={
                        <>
                          {propertyCollection.map((x: RentCollectionType) => {
                            return <option value={x.id}>{x.name}</option>;
                          })}
                        </>
                      }
                    />
                    <PrimarySelect<PropertyModel>
                      register={register}
                      error={errors.bank}
                      label="Your Bank"
                      placeholder="Choose your bank"
                      name="bank"
                      options={
                        <>
                          {getBanks.map((x: any) => {
                            return <option value={x.name}>{x.name}</option>;
                          })}
                        </>
                      }
                    />

                    <PrimaryInput<PropertyModel>
                      label="Your Account Number"
                      name="accountNumber"
                      placeholder="Enter your bank account number"
                      defaultValue=""
                      register={register}
                      error={errors.accountNumber}
                    />
                  </Box>
                </>
              )}
              {RenderButton()}
            </>
          </form>
        </Stack>
      </Box>
    </>
  );
};

export default RentForm;
