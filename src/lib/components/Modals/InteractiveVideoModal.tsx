import React from 'react';
import {
  AspectRatio,
  Box,
  Grid,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { PropertyView } from 'types/api/property-view';
import { SRLWrapper } from 'simple-react-lightbox';
import Modals from 'lib/Utils/Modals';

type Props = {
  open: boolean;
  close: any;
  data: PropertyView;
};

const InteractiveVideoModal = ({ open, close, data }: Props) => {
  return (
    <Modals
      isOpen={open}
      onClose={close}
      pmlogo={true}
      content={
        <>
          <Text fontSize="15px" textAlign="justify">
            Hi there! We advise you watch the interactive videos embeded on this
            property so as to be sure of what you want. All Videos are rightfull
            owned by <strong>PropertyMattaz</strong>.
          </Text>
          <Box mt="8">
            <Heading fontSize="1rem" mb="1">
              Video Tour
            </Heading>
            <>
              {data.mediaFiles && data.mediaFiles?.length > 0 ? (
                <Grid templateColumns="repeat(4,1fr)" gap={4}>
                  <>
                    {data.mediaFiles?.map((media) => {
                      return (
                        <>
                          {media.isVideo && (
                            <SRLWrapper>
                              <video
                                controls
                                style={{
                                  objectFit: 'cover',
                                  maxWidth: '130px',
                                  height: '130px',
                                }}
                              >
                                <source src={media.url as string} />
                              </video>
                            </SRLWrapper>
                          )}
                        </>
                      );
                    })}
                  </>
                </Grid>
              ) : (
                <Text fontSize="15px">No Videos found</Text>
              )}
            </>
          </Box>
        </>
      }
    />
  );
};

export default InteractiveVideoModal;
