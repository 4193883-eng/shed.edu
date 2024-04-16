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
  FormControl,
  FormLabel,
  Select,
  UnorderedList,
  Divider,
} from '@chakra-ui/react';
import { InputField } from '../components/auth/InputField';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { DateInput } from '../components/auth/DateInput';
import { useState } from 'react';
import {
  getAllHomeworksService,
  createHomeworkService,
} from '../services/homeWorksServices';
import { useEffect } from 'react';
import { getAllSubjectsService } from '../services/subjectsServices';

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

const validationSchema = yup.object().shape({
  title: yup.string().min(3, 'Title is too short').max(50, 'Title is too long'),
  description: yup.string().max(300, 'Description is too long'),
  dueDate: yup.date(),
  subjectId: yup.number().positive().integer(),
});
export function HomeworkListPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hws, setHws] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState(null);
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      dueDate: '',
      subjectId: 0,
    },
    validationSchema,
    onSubmit: (values) => {
      const data = {
        title: values.title,
        description: values.description,
        dueDate: values.dueDate,
        subjectId: parseInt(values.subjectId),
        grade: 12,
        // dueDate: '2024-05-19T18:37:53.345Z',
        // title: 'Finish first task',
        // description: 'Some test description',
        // grade: 12,
        // subjectId: 8,
      };
      console.log(data);
      createHomeworkService(data).then((sub) => {
        setHws((prev) => [...prev, sub]);
        fetchHomeworks();
      });
    },
  });
  function fetchHomeworks() {
    setLoading(true);
    getAllHomeworksService()
      .then((data) => {
        setHws(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function fetchSubjects() {
    setLoading(true);
    getAllSubjectsService()
      .then((data) => {
        setSubjects(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  useEffect(() => {
    fetchHomeworks();
    fetchSubjects();
  }, []);

  return (
    <div>
      <Flex
        justifyContent={'center'}
        flexDir={'column'}
        alignItems={'center'}
        p={4}
        width={'100%'}
        maxW={'700px'}
        gap={4}
        m={'auto'}
      >
        <Heading alignSelf={'start'}>Homework List</Heading>
        <Divider />
        <Button type="submit" onClick={onOpen}>
          Create Homework
        </Button>

        <Modal onClose={onClose} size="xl" isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {' '}
              <Box as="form">
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
                    {!!subjects &&
                      subjects.sort().map((subject) => {
                        return (
                          <option value={subject.id} key={subject.id}>
                            {subject.name}
                          </option>
                        );
                      })}
                  </Select>
                </FormControl>
              </Box>
            </ModalBody>
            <ModalFooter>
              <Box as="form" onSubmit={formik.handleSubmit}>
                <Button type="submit" m={'auto'}>
                  Create Homework
                </Button>
              </Box>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <List
          alignItems={'center'}
          flexDirection={'column'}
          display={'flex'}
          width={'100%'}
          gap={'4'}
        >
          {!!hws && (
            <UnorderedList width={'100%'} maxW={'500px'}>
              {hws.map((hw) => (
                <HomeworkListItem
                  title={hw.title}
                  description={hw.description}
                  id={hw.id}
                  grade={hw.grade}
                  updatedAt={hw.updatedAt}
                  createdAt={hw.createdAt}
                  dueDate={hw.dueDate}
                  subjectid={hw.subjectId}
                  key={hw.id}
                />
              ))}
            </UnorderedList>
          )}
        </List>
      </Flex>
    </div>
  );
}

function HomeworkListItem({
  title,
  desctiption,
  id,
  grade,
  updatedAt,
  createdAt,
  dueDate,
  subjectId,
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
