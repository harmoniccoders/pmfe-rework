import { Flex, Icon, Square, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { PagedCollection } from 'types/AppTypes';

function Pagination({ data }: { data: PagedCollection }) {
  const totalPages = Math.ceil(
    (data?.size as number) / (data?.limit as unknown as number)
  );

  const currentPage = (((data?.limit as unknown as number) +
    (data?.offset as unknown as number)) /
    (data?.limit as unknown as number)) as number;

  const router = useRouter();
  const next = data.next?.href;
  const previous = data.previous?.href;

  const paginate = (direction: 'next' | 'previous') => {
    let link = '';
    if (direction == 'previous' && previous != null) {
      link = previous!.split('?')[1];
      router.push({
        query: {
          url: link,
        },
      });
    }
    if (direction == 'next' && next != null) {
      link = next!.split('?')[1];
      router.push({
        query: {
          url: link,
        },
      });
    }
  };
  return (
    <Flex align="center" justify="flex-end" p="0 2rem">
      <Text fontSize="14px" fontFamily="Poppins" color="black" mr="1rem">
        {`${data.size || 0} items`}
      </Text>
      <Flex align="center">
        <Square
          size="30px"
          borderRadius="2px"
          boxShadow="0px 1px 4px rgba(0, 0, 0, 0.14)"
          bgColor="#E2E8F0;"
          cursor="pointer"
          onClick={() => paginate('previous')}
        >
          <Icon as={FiChevronLeft} color="#323232" fontSize="1.2rem" />
        </Square>
        <Text fontSize="14px" fontFamily="Poppins" px="1.5rem" color="black">
          {`${currentPage} of ${totalPages}`}
        </Text>
        <Square
          size="30px"
          borderRadius="2px"
          boxShadow="0px 1px 4px rgba(0, 0, 0, 0.14)"
          bgColor="#E2E8F0;"
          cursor="pointer"
          onClick={() => paginate('next')}
        >
          <Icon as={FiChevronRight} color="#323232" fontSize="1.2rem" />
        </Square>
      </Flex>
    </Flex>
  );
}

export default Pagination;
