import {
  Box,
  Text,
  Stack,
  Button,
  Flex,
  Center,
  HStack,
  Tooltip,
  Icon,
  AspectRatio,
  Image,
  useDisclosure,
  VStack,
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
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import { useOperationMethod } from 'react-openapi-client';
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
import PrimaryState from 'lib/Utils/PrimaryState';
import Cookies from 'js-cookie';
import HelpMeSellModal from '../Modals/HelpMeSellModal';
import NewCheckbox from 'lib/Utils/CheckBox/NewCheckbox';
import { UserContext } from 'lib/Utils/MainContext';

interface Props {
  propertyTitles: PropertyTitle[];
  propertyTypes: PropertyType[];
  propertyTenants: TenantType[];
  propertyCollection: RentCollectionType[];
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

  getBanks,
  formStep,
  setFormStep,
  onClose,
  isClosed,
}: Props) => {
  const [PropertyUser, { loading, data, error }] =
    useOperationMethod('Propertycreate');
  const [uploadedMedia, setUploadedMedia] = useState<MediaModel[]>([]);
  const { isOpen: open, onOpen: opened, onClose: close } = useDisclosure();
  const { user } = useContext(UserContext);

  const schema = yup.object().shape({
    address: yup.string().required(),
    description: yup.string().required(),
    title: yup.string().required(),
    area: yup.string().required(),
    lga: yup.string().required(),
    state: yup.string().required(),
    propertyTypeId: yup.number().required(),
    name: yup.string().required(),
    numberOfBathrooms: yup.number().required(),
    numberOfBedrooms: yup.number().required(),
    price: yup.number().required(),
    budget: yup.number().when('name', {
      is: () => formStep === 1,
      then: yup.number().required(),
    }),
    rentCollectionTypeId: yup.number().when('name', {
      is: () => formStep === 1,
      then: yup.number().required(),
    }),
    tenantTypeId: yup.number().when('name', {
      is: () => formStep === 1,
      then: yup.number().required(),
    }),
    bank: yup.string().when('name', {
      is: () => formStep === 1,
      then: yup.string().required(),
    }),
    accountNumber: yup.string().when('name', {
      is: () => formStep === 1,
      then: yup.string().required(),
    }),
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    trigger,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm<PropertyModel>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      isForRent: true,
    },
  });

  watch('numberOfBedrooms');
  watch('numberOfBathrooms');
  watch('sellMyself');

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
  const [sellMyself, setSellMyself] = useState(true);
  const RenderButton = () => {
    if (formStep === 0) {
      return (
        <>
          {
            sellMyself ? (
              <ButtonComponent content="Submit" loading={loading} />
            ) : (
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
                isValid={true}
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
    data.bank = user?.bank || data.bank;
    data.accountNumber = user?.accountNumber || data.accountNumber;
    try {
      const result = await (await PropertyUser(undefined, data)).data;

      if (result.status !== 400) {
        addToast(
          'Your property has been submitted for review. We will notify you when it goes live.',
          {
            appearance: 'success',
            autoDismiss: true,
          }
        );
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
    } catch (err: any) {
      addToast(err.message || err.body.message, {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };
  const userIn = Cookies.get('userIn');
  useEffect(() => {
    if (userIn !== 'true') {
      router.push({ pathname: '/login', query: { from: router.pathname } });
      return;
    }
  });

  return (
    <>
      {userIn == 'true' ? (
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
                  </>
                )}
                {RenderButton()}
              </>
            </form>
          </Stack>
          <HelpMeSellModal onClose={close} isOpen={open} isRent={true} />
        </Box>
      ) : null}
    </>
  );
};

export default RentForm;
