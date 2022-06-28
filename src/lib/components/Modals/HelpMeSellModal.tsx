import Modals from 'lib/Utils/Modals';
import { Button, Center, Text } from '@chakra-ui/react';

function HelpMeSellModal({ isOpen, onClose }: any) {
  return (
    <Modals
      isOpen={isOpen}
      onClose={onClose}
      pmlogo={true}
      content={
        <>
          <Text fontSize="18px" fontWeight="600" my="1rem">
            Benefits of letting us help you sell your property
          </Text>
          <ol>
            <li>
              <Text mt="1rem">
                Our 103% money-back guarantee will be activated on your
                property. This guarantee will help you sell your property faster
                as buyers will feel more confident to buy.
              </Text>
            </li>
            <li>
              <Text mt="1rem">
                Your property will be shown prominently in search results.
              </Text>
            </li>
            <li>
              <Text mt="1rem">
                Your property will feature the verification badge.
              </Text>
            </li>
          </ol>
          <Center>
            <Button w="100%" mt="6rem" onClick={onClose}>
              ok
            </Button>
          </Center>
        </>
      }
    />
  );
}

export default HelpMeSellModal;
