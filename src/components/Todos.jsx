import { useEffect, useState } from 'react';
import {
  Stack,
  Card,
  CardBody,
  Text,
  CircularProgress,
  Heading,
  Flex,
} from '@chakra-ui/react';
import { getTodosService } from '../services/todosService';

function Todos() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getTodosService()
      .then((data) => setTodos(data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <Heading size="lg" mb="8px">
        Todos
      </Heading>
      {isLoading && (
        <Flex justifyContent="center" py="16px">
          <CircularProgress isIndeterminate />
        </Flex>
      )}
      {todos.length !== 0 && (
        <Stack>
          {todos.map((todo) => (
            <Card key={todo.id}>
              <CardBody>
                <Text>{todo.title}</Text>
              </CardBody>
            </Card>
          ))}
        </Stack>
      )}
    </>
  );
}

export default Todos;
