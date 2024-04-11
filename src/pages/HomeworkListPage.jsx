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
import { InputField } from '../components/auth/InputField';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { DateInput } from '../components/auth/DateInput';
import { useState } from 'react';

const validationSchema = yup.object().shape({
  title: yup.string().min(3, 'Title is too short').max(50, 'Title is too long'),
  description: yup.string().max(300, 'Description is too long'),
  dueDate: yup.date(),
  subjectId: yup.number().positive().integer(),
});
export function HomeworkListPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hw, setHw] = useState(null);
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      dueDate: '',
      subjectId: 0,
    },
    validationSchema,
    onSubmit: (values) => {
      createHomeWorkService({
        title: values.title,
        description: values.description,
        dueDate: values.dueDate,
        subjectId: values.subjectId,
      })
        // .catch((err) => {
        //   setError(err);
        // })
        .then((sub) => {
          setHw((prev) => [...prev, sub]);
          fetchSubjects();
        });
      // .finally(() => setFormLoading(false));
    },
  });

  return (
    <div>
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
        <Box>
          <Button type="submit" mt={2} onClick={onOpen}>
            Create Homework
          </Button>
          <Modal onClose={onClose} size="xl" isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {' '}
                <InputField
                  meta={formik.getFieldMeta('title')}
                  label={'Title'}
                  required={true}
                  placeholder={'Title'}
                  disabled={false}
                  {...formik.getFieldProps('title')}
                />
                <InputField
                  meta={formik.getFieldMeta('description')}
                  label={'Description'}
                  required={true}
                  placeholder={'Description'}
                  disabled={false}
                  {...formik.getFieldProps('description')}
                />
                <DateInput
                  placeholder="Date"
                  meta={formik.getFieldMeta('dueDate')}
                  label={'Date'}
                  required={true}
                  disabled={false}
                  {...formik.getFieldProps('dueDate')}
                />
                <FormControl
                  isRequired={true}
                  isDisabled={false}
                  isInvalid={
                    !!formik.getFieldMeta('subjectId').error &&
                    formik.getFieldMeta('subjectId').touched
                  }
                >
                  <FormLabel>Subject</FormLabel>
                  <Select
                    placeholder="Select subject"
                    {...formik.getFieldProps('subjectId')}
                  >
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </Select>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button type="submit" m={'auto'}>
                  Create Homework
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
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
