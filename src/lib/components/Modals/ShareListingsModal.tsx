import { Flex, Text, Box, Heading, HStack } from '@chakra-ui/react';
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

import React from 'react';
import { useToasts } from 'react-toast-notifications';
import Modals from 'lib/Utils/Modals';

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
    url = window.origin + `/buy/enquire/${id}`;
  } else {
    url = '';
  }

  const handleCopyToClipboard = async () => {
    const copied = await navigator.clipboard.writeText(url);
    addToast('Copied to clipboard', {
      appearance: 'success',
      autoDismiss: true,
    });
    onClose();
  };

  return (
    <>
      <Modals
        isOpen={isOpen}
        onClose={onClose}
        pmlogo={true}
        content={
          <>
            {' '}
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
              <Text
                color="white"
                fontWeight="600"
                fontSize=".9rem"
                w="70%"
                noOfLines={1}
              >
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
          </>
        }
      />
    </>
  );
};

export default ShareListingsModal;
