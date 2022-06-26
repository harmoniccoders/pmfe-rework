import {
  Box,
  Button,
  Flex,
  FormLabel,
  Text,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';

interface CounterProps {
  valueName: string;
  setValue: any;
  getValues: any;
  label: string;
  fontSize?: string;
}
function NumberCounter({
  valueName,
  label,
  fontSize,
  setValue,
  getValues,
}: CounterProps) {
  return (
    <Box my="1.5rem">
      <FormLabel
        htmlFor={label}
        textTransform="capitalize"
        textAlign="center"
        bg="brand.200"
        zIndex={3}
        fontSize={fontSize}
      >
        {label}
      </FormLabel>
      <NumberInput
        onChange={(valueString: string) =>
          setValue(valueName, parseInt(valueString))
        }
        value={getValues(valueName) || 0}
        max={50}
        min={0}
      >
        <Flex justify="space-between">
          <NumberDecrementStepper
            border="0"
            justifyContent="flex-start"
            _active={{ bgColor: 'none' }}
          >
            <Button
              bg="brand.100"
              width="40px"
              height="40px"
              variant="solid"
              borderRadius="50%"
              color="white"
            >
              -
            </Button>
          </NumberDecrementStepper>
          <NumberInputField textAlign="center" w="50%" />
          <NumberIncrementStepper
            border="0"
            justifyContent="flex-end"
            _active={{ bgColor: 'none' }}
          >
            <Button
              bg="brand.100"
              width="40px"
              height="40px"
              variant="solid"
              borderRadius="50%"
              color="white"
            >
              +
            </Button>
          </NumberIncrementStepper>
        </Flex>
      </NumberInput>
      <Text fontSize=".7rem" color="red">
        {getValues(valueName) <= 0 || undefined ? `${label} is required` : ''}
      </Text>
    </Box>
  );
}

export default NumberCounter;
