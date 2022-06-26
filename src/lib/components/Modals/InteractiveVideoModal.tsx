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

type Props = {
  open: boolean;
  close: any;
  data: PropertyView;
};

const InteractiveVideoModal = ({ open, close, data }: Props) => {
  
  return (
    <Modal
      isOpen={open}
      onClose={close}
      motionPreset="slideInBottom"
      size="lg"
      isCentered
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />

      <ModalContent
        py={5}
        borderRadius="0"
        overflowY="auto"
        h="100vh"
        pos="fixed"
      >
        <ModalHeader textAlign="center">
          <Text fontSize="1.1rem" fontWeight="bold">
            Watch 3D Interactive Video
          </Text>
          <ModalCloseButton />
        </ModalHeader>

        <ModalBody>
          <Box>
            <Text fontSize="15px" textAlign="justify">
              Hi there! We advise you watch the interactive videos embeded on
              this property so as to be sure of what you want. All Videos are
              rightfull owned by <strong>PropertyMattaz</strong>.
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
                                <AspectRatio
                                  maxH={['70px', '150px']}
                                  w="full"
                                  ratio={1}
                                >
                                  <iframe
                                    title="Interactive videp"
                                    src={media.url as string}
                                    allowFullScreen
                                  />
                                </AspectRatio>
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
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default InteractiveVideoModal;
