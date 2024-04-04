import {
  AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  List,
  UnorderedList
} from '@chakra-ui/react';
import { InputField } from '../components/auth/InputField.jsx';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {useEffect, useRef, useState} from 'react';
import {
  createSubjectService,
  getAllSubjectsService,
} from '../services/subjectsServices.js';
import {LessonListItem} from "../components/LessonListItem.jsx";

const validationSchema = yup.object().shape({
  subjectName: yup.string().min(3, 'The subject name is too short'),
});

export function LessonListPage() {
  const [isFormLoading, setFormLoading] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState(null);
  const [error, setError] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const cancelRef = useRef()

  const formik = useFormik({
    initialValues: {
      subjectName: '',
    },
    validationSchema,
    onSubmit: (values) => {
      setFormLoading(true);
      createSubjectService({
        name: values.subjectName,
      })
        .catch((err) => {
          setError(err);
        })
        .then((sub) => {
          setSubjects((prev) => [...prev, sub]);
        })
        .finally(() => setFormLoading(false));
    },
  });

  useEffect(() => {
    fetchSubjects()
  }, []);

  function fetchSubjects() {
    setLoading(true);
    getAllSubjectsService()
      .catch((err) => {
        setLoading(false);
        setError(err);
      })
      .then((data) => {
        setSubjects(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsAlertOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsAlertOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={() => setIsAlertOpen(false)} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    <Flex
      justifyContent={'center'}
      flexDir={'column'}
      alignItems={'center'}
      pt={16}
      width={'100%'}
      maxW={'700px'}
      gap={4}
      m={'auto'}
      mt={0}
    >
      <Heading alignSelf={'start'}>Subject List</Heading>
      <Box as={'form'} w={'100%'}>
        <InputField
          meta={formik.getFieldMeta('subjectName')}
          label={'Subject Name'}
          required={false}
          placeholder={'Subject Name'}
          disabled={isLoading}
          {...formik.getFieldProps('subjectName')}
        />
        <Button isLoading={isFormLoading} type={'submit'} mt={2}>
          Add Subject
        </Button>
      </Box>
      <Divider />
      {subjects && (
        <UnorderedList width={'100%'} maxW={'500px'}>
          {subjects.map((subject) => (
            <LessonListItem key={subject.id} subjectName={subject.name} />
          ))}
        </UnorderedList>
      )}
    </Flex>
    </>
  );
}
