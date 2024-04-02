import { Box, Button, Divider, Flex, Heading, List } from '@chakra-ui/react';
import { InputField } from '../components/auth/InputField.jsx';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import {
  createSubjectService,
  getAllSubjectsService,
} from '../services/subjectsServices.js';

const validationSchema = yup.object().shape({
  subjectName: yup.string().min(3, 'The subject name is too short'),
});

export function LessonListPage() {
  const [isFormLoading, setFormLoading] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState(null);
  const [error, setError] = useState(null);

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
        <List>
          {subjects.map((subject) => (
            <LessonListPage key={subject.id} />
          ))}
        </List>
      )}
    </Flex>
  );
}
