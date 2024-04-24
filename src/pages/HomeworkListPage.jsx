import PropTypes from 'prop-types';

import { useRef, useState, useEffect } from 'react';
import {
  ListIcon,
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
  ButtonGroup,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Spinner,
  useColorMode,
} from '@chakra-ui/react';
import { marked } from 'marked';
import dompure from 'dompurify';
import { InputField } from '../components/auth/InputField';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { DateInput } from '../components/auth/DateInput';

import {
  getAllHomeworksService,
  createHomeworkService,
  deleteHomeworkService,
  amendHomeworkService,
} from '../services/homeWorksServices';

import { getAllSubjectsService } from '../services/subjectsServices';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { FaPlus } from 'react-icons/fa6';
import { format } from 'date-fns';

const validationSchema = yup.object().shape({
  title: yup.string().min(3, 'Title is too short').max(50, 'Title is too long'),
  description: yup.string().max(300, 'Description is too long'),
  dueDate: yup.date(),
  subjectId: yup.number().positive().integer(),
  grade: yup.number().positive().integer(),
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
        dueDate: new Date(values.dueDate).toISOString(),
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
        onClose();
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

  function onEdit(id, hw) {
    setHws((prev) => {
      return prev.map((prevHw) => {
        return id === prevHw.id ? hw : prevHw;
      });
    });
  }

  function onDelete(id) {
    setHws((prev) => {
      return prev.filter((prevId) => {
        return prevId !== id;
      });
    });
    fetchHomeworks(onEdit);
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
        <Flex justifyContent={'space-between'} alignItems={'center'} w={'100%'}>
          <Heading alignSelf={'start'}>Homework List</Heading>
          <IconButton
            aria-label={'add a hw'}
            icon={<FaPlus />}
            type="submit"
            onClick={onOpen}
          />
        </Flex>
        <Divider />

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

        <Box
          alignItems={'center'}
          flexDirection={'column'}
          display={'flex'}
          width={'100%'}
          gap={'4'}
        >
          {!!hws && !!subjects ? (
            <>
              {hws.map((hw) => {
                let name;
                subjects.map((subject) => {
                  if (subject.id === hw.subjectId) {
                    name = subject.name;
                  }
                });

                return (
                  <HomeworkListItem
                    onEdit={onEdit}
                    onDelete={onDelete}
                    title={hw.title}
                    description={hw.description}
                    id={hw.id}
                    grade={hw.grade}
                    updatedAt={hw.updatedAt}
                    createdAt={hw.createdAt}
                    dueDate={hw.dueDate}
                    subjectName={name}
                    key={hw.id}
                    subjectId={hw.subjectId}
                    subjects={subjects}
                  />
                );
              })}
            </>
          ) : (
            <Spinner size={'xl'} />
          )}
        </Box>
      </Flex>
    </div>
  );
}

function HomeworkListItem({
  onEdit,
  onDelete,
  title,
  description,
  id,
  grade,
  updatedAt,
  createdAt,
  dueDate,
  subjectName,
  subjectId,
  subjects,
}) {
  const editingModal = useDisclosure();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cardBody = useRef();
  const [isLoading, setIsLoading] = useState(false);

  function handleOpening(e) {
    if (e.target == cardBody.current) {
      onOpen();
    }
  }

  function handleDeleting() {
    setIsLoading(true);
    deleteHomeworkService(id).then(() => {
      onDelete(id);
      setIsLoading(false);
    });
  }

  const formik = useFormik({
    initialValues: {
      title: title,
      description: description,
      dueDate: new Date(dueDate).toISOString().slice(0, -1),
      subjectId: subjectId,
      grade: grade,
    },
    validationSchema,
    onSubmit: (values) => {
      const hw = {
        dueDate: values.dueDate,
        title: values.title,
        description: values.description,
        grade: Number(values.grade),
        subjectId: values.subjectId,
      };
      amendHomeworkService(id, hw).then(() => {
        editingModal.onClose();
        onEdit(hw);
      });
    },
  });

  return (
    <>
      <Modal
        onClose={editingModal.onClose}
        isOpen={editingModal.isOpen}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editing &quot;{title}&quot;</ModalHeader>
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
                value={dueDate}
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
                  {subjects.map((subject) => {
                    return (
                      <option value={subject.id} key={subject.id}>
                        {subject.name}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl
                isRequired={false}
                isDisabled={false}
                isInvalid={
                  !!formik.getFieldMeta('grade').error &&
                  formik.getFieldMeta('grade').touched
                }
              >
                <FormLabel>Grade</FormLabel>
                <NumberInput
                  defaultValue={formik.values.grade}
                  min={0}
                  max={12}
                  value={String(formik.values.grade)}
                  onChange={(valueAsString, valueAsNumber) =>
                    formik.setFieldValue('grade', valueAsNumber)
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </Box>
          </ModalBody>
          <ModalFooter as={ButtonGroup}>
            <Button onClick={editingModal.onClose}>Cancel</Button>
            <Box as="form" onSubmit={formik.handleSubmit}>
              <Button type="submit" m={'auto'}>
                Edit Homework
              </Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal onClose={onClose} size={'xl'} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader as={ButtonGroup} alignItems={'center'} display={'flex'}>
            <Text>{title}</Text>
            <Text fontSize={'sm'}>|</Text>
            <Text color={'gray.300'}>{subjectName}</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody flexDir={'column'} as={Flex}>
            <Text color={'gray.300'}>
              Due at {format(new Date(dueDate), 'dd/MM/yyyy kk:mm')}
            </Text>
            <ParsedMarkdown value={description}
            
             />
            <Text alignSelf={'flex-end'} color={'gray.300'}>
              Grade: {grade}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box maxW={'500px'} w={'100%'}>
        <Card>
          <CardBody
            ref={cardBody}
            onClick={handleOpening}
            alignItems={'center'}
            justifyContent={'space-between'}
            p={'5'}
            display={'flex'}
            cursor={'pointer'}
          >
            <Flex flexDir={'column'} cursor={'default'}>
              <Text>{title}</Text>
              <Text color={'gray.300'}>{subjectName}</Text>
            </Flex>

            <Text cursor={'default'}>
              due in {formatDistanceToNow(new Date(dueDate))}
            </Text>

            <Menu cursor={'default'}>
              <MenuButton
                isLoading={isLoading}
                as={IconButton}
                variant="ghost"
                colorScheme="gray"
                aria-label="See menu"
                icon={<BsThreeDotsVertical />}
              />

              <MenuList>
                <MenuItem onClick={editingModal.onOpen}>Edit</MenuItem>
                <MenuItem color="red.400" onClick={handleDeleting}>
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
          </CardBody>
        </Card>
      </Box>
    </>
  );
}

export function ParsedMarkdown({ value }) {
  const { colorMode } = useColorMode();
  return (
    <Box
      sx={{
        '& h1': {
          fontSize: '3xl',
          fontWeight: '700',
          my: '8px',
        },
        '& h2': {
          fontSize: '2xl',
          fontWeight: '700',
          my: '8px',
        },
        '& h3': {
          fontSize: 'xl',
          fontWeight: '700',
          my: '8px',
        },
        '& h4': {
          fontSize: 'lg',
          fontWeight: '700',
          my: '8px',
        },
        '& h5': {
          fontSize: 'md',
          fontWeight: '700',
          my: '8px',
        },
        '& h6': {
          fontSize: 'sm',
          fontWeight: '700',
          my: '8px',
        },
        '& ul, & ol': {
          my: '8px',
          pl: '30px',
        },
        '& blockquote': {
          borderLeftWidth: '4px',
          color: 'gray.500',
          px: '8px',
          my: '8px',
        },
        '& code': {
          padding: '3px 5px',
          backgroundColor: colorMode === 'dark' ? 'whiteAlpha.300' : 'gray.100',
          borderRadius: 'md',
          my: '8px',
        },
        '& p': {
          my: '8px',
        },
        '& hr': {
          my: '16px',
        },
      }}
      dangerouslySetInnerHTML={{
        __html: dompure.sanitize(marked.parse(value)),
      }}
    />
  );
}

ParsedMarkdown.propTypes = {
  value: PropTypes.string.isRequired,
};

HomeworkListItem.propTypes = {
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  id: PropTypes.number,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
  dueDate: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  grade: PropTypes.number,
  subjectName: PropTypes.string,
  subjects: PropTypes.array,
};
