import {Box, Button, Divider, Flex, Heading, IconButton} from '@chakra-ui/react';
import {HiPlusSm} from "react-icons/hi";

export function SchedulePage() {
  return (
    <>
      <Flex
        justifyContent={'center'}
        flexDir={'column'}
        alignItems={'center'}
        pt={16}
        width={'100%'}
        maxW={'700px'}
        gap={4}
        m={'auto'}
        mt={0}
        p={4}
      >
        <Heading alignSelf={'start'}>Schedule</Heading>
        <Divider />
        <Box
          display={'flex'}
          flexDir={'column'}
          gap={2}
          p={2}
          maxW={'300px'}
          width={'100%'}
        >
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            p={4}
            bg={'purple.50'}
            width={'100%'}
            borderRadius={'md'}
            color={'purple.700'}
            transition={'0.3s'}
            _hover={{
              bg: 'purple.100',
              color: 'purple.800'
            }}
          >
            Monday
            <IconButton variant={'ghost'} colorScheme={'purple'} aria-label={'add a subject'} icon={<HiPlusSm />}/>
          </Box>
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            py={4}
            bg={'gray.50'}
            width={'100%'}
            borderRadius={'md'}
           >
            Math

          </Box>
        </Box>
      </Flex>
    </>
  );
}

function SubjectDisplay({}) {}

function DayScheduleDisplay({ daySchedule }) {}
