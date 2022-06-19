import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Flex,
  Button,
  Text,
  Image,
  Box,
  Badge,
  Heading,
  Grid,
  GridItem,
  HStack,
} from '@chakra-ui/react';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';

import {
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';

type Props = {
  isOpen?: any;
  onClose?: any;
  id: number;
};

const ShareListingsModal = ({ isOpen, onClose, id }: Props) => {
  const { addToast } = useToasts();

  let url: string;
  const isBrowser = () => typeof window !== 'undefined';
  if (isBrowser()) {
    url = window.origin + `/buy/enquires/${id}`;
  } else {
    url = '';
  }

  const handleCopyToClipboard = async () => {
    console.log({ url });
    const copied = await navigator.clipboard.writeText(url);
    addToast('Copied to clipboard', {
      appearance: 'success',
      autoDismiss: true,
    });
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
       size="lg"
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />

        <ModalContent
          py={5}
          borderRadius="0"
          // w={['88%', '80%']}
          overflow="hidden"
          // maxH="100vh"
          // maxW="40%"
          pos="fixed"
          mt="0"
          //   mb="1rem"
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
            <Box h="100vh" overflowY="auto" px={5}>
              <Heading fontSize="16px" my="2rem" textAlign="left" pl="1.8rem">
                Share this listing
              </Heading>

              <HStack ml="1rem">
                <FacebookShareButton url={url} className="mb-2 ml-2">
                  <FacebookIcon size={32} round></FacebookIcon>
                </FacebookShareButton>
                <TwitterShareButton url={url} className="mb-2 ml-2">
                  <TwitterIcon size={32} round></TwitterIcon>
                </TwitterShareButton>
                <LinkedinShareButton url={url} className="mb-2 ml-2">
                  <LinkedinIcon size={32} round></LinkedinIcon>
                </LinkedinShareButton>
                <WhatsappShareButton url={url} className="mb-2 ml-2">
                  <WhatsappIcon size={32} round></WhatsappIcon>
                </WhatsappShareButton>
              </HStack>
              <Flex
                w="full"
                borderRadius="80px"
                bgColor="black"
                justify="space-between"
                align="center"
                px="2rem"
                mt="1rem"
                h="3rem"
              >
                <Text color="white" fontWeight="600" fontSize=".9rem">
                  {url}
                </Text>
                <Box
                  as="button"
                  type="button"
                  color="white"
                  fontWeight="500"
                  onClick={() => handleCopyToClipboard()}
                >
                  Copy
                </Box>
              </Flex>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ShareListingsModal;
