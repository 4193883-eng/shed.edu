import PropTypes from 'prop-types';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { forwardRef, useRef } from 'react';
import {
  Image,
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

export const LIST_ITEMS = [
  {
    title: 'good',
    dueDate: '04.08.2222',
    description: 'bad',
  },
  {
    title: 'dwef',
    description: 'bawfaefd',
  },
];

export function HomeworkListPage() {
  return (
    <Flex
      justifyContent={'center'}
      flexDir={'column'}
      alignItems={'center'}
      p={4}
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
        {LIST_ITEMS.map((data, index) => {
          return (
            <HomeworkListItem
              title={data.title}
              desctiption={data.description}
              dueDate={data.dueDate}
              key={index}
            />
          );
        })}
      </List>
    </Flex>
  );
}

function HomeworkListItem({
  title,
  desctiption,
  id,
  grade,
  updatedAt,
  createAt,
  dueDate,
  subjectid,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const moreButton = useRef();
  const icon = useRef();

  function handleOpening(e) {
    if (e.target != moreButton.current && e.target != icon.current) {
      onOpen();
    }
  }

  return (
    <>
      <Modal onClose={onClose} size={'xl'} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <ListItem maxW={'500px'} w={'100%'}>
        <Card>
          <CardBody
            onClick={handleOpening}
            alignItems={'center'}
            justifyContent={'space-between'}
            p={'5'}
            display={'flex'}
          >
            <Text>{title}</Text>
            <Text>{dueDate}</Text>

            <Menu>
              <MenuButton
                ref={moreButton}
                as={IconButton}
                variant="ghost"
                colorScheme="gray"
                aria-label="See menu"
                icon={
                  <Image
                    src="/dots.svg"
                    ref={icon}
                    transform={'rotate(90deg)'}
                  />
                }
              />

              <MenuList>
                <MenuItem>Edit</MenuItem>
                <MenuItem color="red.400">Delete</MenuItem>
              </MenuList>
            </Menu>
          </CardBody>
        </Card>
      </ListItem>
    </>
  );
}

HomeworkListItem.propTypes = {
  id: PropTypes.number,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
  dueDate: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  grade: PropTypes.number,
  subjectid: PropTypes.number,
};
