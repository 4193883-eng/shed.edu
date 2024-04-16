import {Box, Divider, Flex, Heading, IconButton} from "@chakra-ui/react";
import {HiPlusSm} from "react-icons/hi";

function HomePage() {
  return <Flex
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
    <Heading alignSelf={'start'}>Home</Heading>
    <Divider />
  </Flex>
}

export default HomePage;
