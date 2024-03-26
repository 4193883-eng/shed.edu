import {Box, Flex, Heading} from "@chakra-ui/react";
import {NewsPage} from "./news/NewsPage.jsx";

function HomePage() {
  return <Flex justifyContent={'center'} flexDir={'column'} alignItems={'center'} pt={16}>
    <Box>
      <Heading>You aren't signed in</Heading>
    </Box>
    <NewsPage/>
  </Flex>;
}

export default HomePage;
