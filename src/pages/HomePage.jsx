import { Container, Heading, Image, Stack } from '@chakra-ui/react';
import reactIcon from '../assets/react.svg';
import Todos from '../components/Todos';

function HomePage() {
  return (
    <Container maxWidth="container.xl" py="64px">
      <Stack alignItems="center" mb="32px">
        <Heading>Get started</Heading>
        <Image src={reactIcon} alt="React" />
      </Stack>

      <Todos />
    </Container>
  );
}

export default HomePage;
