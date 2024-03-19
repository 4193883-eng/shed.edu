import { Flex, Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  return (
    <Flex flexDirection={'column'}>
      <Box>
        <Link to="/signup">SignIn</Link>
      </Box>
    </Flex>
  );
}
