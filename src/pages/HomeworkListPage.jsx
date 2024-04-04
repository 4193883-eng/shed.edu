import { BsThreeDotsVertical } from 'react-icons/bs';
import {
  Flex,
  MenuItem,
  Menu,
  MenuButton,
  MenuList,
  Box,
  ListItem,
  IconButton,
  Card,
  CardBody,
  Button,
  Text,
  Heading,
  List,
} from '@chakra-ui/react';

export function HomeworkListPage() {
  return (
    <Flex
      justifyContent={'center'}
      flexDir={'column'}
      alignItems={'center'}
      pt={16}
      width={'100%'}
      maxW={'700px'}
      gap={4}
      m={'auto'}
      mt={4}
    >
      <Heading>HomeWork List</Heading>

      <List
        alignItems={'center'}
        flexDirection={'column'}
        display={'flex'}
        width={'100%'}
        gap={'4'}
      >
        <ListItem maxW={'500px'} w={'100%'}>
          <Card>
            <CardBody
              alignItems={'center'}
              justifyContent={'space-between'}
              p={'5'}
              display={'flex'}
            >
              <Text>subeject of the homework</Text>
              <Text>Due date</Text>
              <Menu>
                <MenuButton
                  as={IconButton}
                  variant="ghost"
                  colorScheme="gray"
                  aria-label="See menu"
                  icon={<BsThreeDotsVertical />}
                />

                <MenuList>
                  <MenuItem>Edit</MenuItem>
                  <MenuItem color="red.400">Delete</MenuItem>
                </MenuList>
              </Menu>
            </CardBody>
          </Card>
        </ListItem>
        <ListItem maxW={'500px'} w={'100%'}>
          <Card>
            <CardBody
              alignItems={'center'}
              justifyContent={'space-between'}
              p={'5'}
              display={'flex'}
            >
              <Text>subeject of the homework</Text>
              <Text>Due date</Text>

              <Menu>
                <MenuButton
                  as={IconButton}
                  variant="ghost"
                  colorScheme="gray"
                  aria-label="See menu"
                  icon={<BsThreeDotsVertical />}
                />

                <MenuList>
                  <MenuItem>Edit</MenuItem>
                  <MenuItem color="red.400">Delete</MenuItem>
                </MenuList>
              </Menu>
            </CardBody>
          </Card>
        </ListItem>
        <ListItem maxW={'500px'} w={'100%'}>
          <Card>
            <CardBody
              alignItems={'center'}
              justifyContent={'space-between'}
              p={'5'}
              display={'flex'}
            >
              <Text>subeject of the homework</Text>
              <Text>Due date</Text>
              <Menu>
                <MenuButton
                  as={IconButton}
                  variant="ghost"
                  colorScheme="gray"
                  aria-label="See menu"
                  icon={<BsThreeDotsVertical />}
                />

                <MenuList>
                  <MenuItem>Edit</MenuItem>
                  <MenuItem color="red.400">Delete</MenuItem>
                </MenuList>
              </Menu>
            </CardBody>
          </Card>
        </ListItem>
      </List>
    </Flex>
  );
}
