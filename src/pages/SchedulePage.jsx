import { Flex, Heading } from '@chakra-ui/react';

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
        <Heading alignSelf={'start'}>Subject List</Heading>
      </Flex>
    </>
  );
}

function SubjectDisplay({}) {

}

function DayScheduleDisplay({daySchedule}) {

}
