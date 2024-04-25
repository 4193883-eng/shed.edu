import {
  Box,
  Divider,
  Flex,
  Heading,
  IconButton,
  Button,
  Text,
  Spinner,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { HiPlusSm } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { getAllHomeworksService } from '../services/homeWorksServices';
import { getAllSubjectsService } from '../services/subjectsServices';
import { HomeworkListItem } from './HomeworkListPage';

function HomePage() {
  const [hasHomeWork, setHasHomeWork] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [homeWork, setHomeWork] = useState([]);
  const [hws, setHws] = useState(null);
  const [subjects, setSubjects] = useState(null);

  useEffect(() => {
    getAllHomeworksService().then((subjects) => {
      setHasHomeWork(subjects.length > 0);
    });
  }, []);

  useEffect(() => {
    getAllHomeworksService().then((data) => {
      setHomeWork(data);
    });
  }, []);

  function fetchHomeworks() {
    setIsLoading(true);
    getAllHomeworksService()
      .then((data) => {
        setHws(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function fetchSubjects() {
    setIsLoading(true);
    getAllSubjectsService()
      .then((data) => {
        setSubjects(data);
      })
      .finally(() => {
        setIsLoading(false);
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

  useEffect(() => {
    fetchHomeworks();
    fetchSubjects();
  }, []);

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
      p={4}
    >
      <Heading alignSelf={'start'}>Home</Heading>

      <Divider />

      <Box>
        {hasHomeWork ? (
          <>
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
          </>
        ) : (
          <Text fontSize="4xl">There is no homeworks yet</Text>
        )}

        <Box>
          <Button as={Link} to={'hw-list'} size="md">
            Add homework
          </Button>
          {homeWork.length > 3 && (
            <Button as={Link} to={'hw-list'} size="md">
              See all homeworks
            </Button>
          )}
        </Box>
      </Box>
    </Flex>
  );
}

export default HomePage;
