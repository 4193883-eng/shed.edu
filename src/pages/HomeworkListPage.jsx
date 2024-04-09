import PropTypes from 'prop-types';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useRef } from 'react';
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

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
        <HomeworkListItem />
        <HomeworkListItem />
        <HomeworkListItem />
        <HomeworkListItem />
        <HomeworkListItem />
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
    if (
      e.target != moreButton.current &&
      e.target != icon.current.childNodes[0]
    ) {
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
            <Text>subeject of the homework</Text>
            <Text>Due date</Text>

            <Menu>
              <MenuButton
                ref={moreButton}
                as={IconButton}
                variant="ghost"
                colorScheme="gray"
                aria-label="See menu"
                icon={<BsThreeDotsVertical ref={icon} />}
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
