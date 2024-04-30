import {
  Box,
  Divider,
  Flex,
  Heading,
  Button,
  Text,
  Spinner,
  CircularProgressLabel,
  CircularProgress,
  ButtonGroup,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { getAllHomeworksService } from '../services/homeWorksServices';
import { getAllSubjectsService } from '../services/subjectsServices';
import { HomeworkListItem } from './HomeworkListPage';
import PropTypes from 'prop-types';
import { BsDot } from 'react-icons/bs';

function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [homeWork, setHomeWork] = useState([]);
  const [hws, setHws] = useState(null);
  const [subjects, setSubjects] = useState(null);
  const [medianGrades, setMedianGrades] = useState(null);

  useEffect(() => {
    getAllHomeworksService().then((data) => {
      setHomeWork(data);
    });
  }, []);

  useEffect(() => {
    if (hws === null || subjects === null) {
      return;
    }

    let medianGradesPerSubjects = {};
    subjects.forEach((subject) => {
      const hwsPerSubject = hws.filter((hw) => subject.id === hw.subjectId);
      if (hwsPerSubject.length !== 0) {
        medianGradesPerSubjects[subject.name] = medGrade(hwsPerSubject);
      }
    });

    setMedianGrades({
      grade: medGrade(hws),
      perSubject: medianGradesPerSubjects,
    });
  }, [hws, subjects]);

  function sort(object) {
    let sortable = [];
    for (let subject in object) {
      sortable.push([subject, object[subject]]);
    }
    sortable.sort((a, b) => b[1] - a[1]);
    return sortable;
  }

  function medGrade(hwArray) {
    let allGrades = [];
    hwArray.forEach((hw) => {
      if (hw.grade !== 0 && hw.grade !== null) {
        allGrades.push(hw.grade);
      }
    });
    let sum = allGrades.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
    if (sum === 0) {
      return null;
    }

    return Math.round((sum / allGrades.length) * 100) / 100;
  }

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
    fetchHomeworks();
  }

  function onDelete(id) {
    setHws((prev) => {
      return prev.filter((prevId) => {
        return prevId !== id;
      });
    });
    fetchHomeworks();
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

      {!(hws !== null && hws.length === 0) ? (
        <Box
          alignItems={'center'}
          flexDirection={'column'}
          display={'flex'}
          width={'100%'}
          gap={'4'}
        >
          {!!hws && !!subjects && !isLoading ? (
            <>
              {hws
                .sort((a, b) => {
                  const aDate = (new Date(a.dueDate)).getTime();
                  const bDate = new Date(b.dueDate).getTime();
                  return aDate - bDate
                })
                .map((hw) => {
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
      ) : (
        <Text fontSize="xl">There are no homeworks yet</Text>
      )}

      <ButtonGroup>
        <Button as={Link} to={'hw-list'} size="md">
          Add homework
        </Button>
        {homeWork.length > 3 && (
          <Button as={Link} to={'hw-list'} size="md">
            See all homeworks
          </Button>
        )}
      </ButtonGroup>
      <Divider />
      {!(hws !== null && hws.length === 0) && medianGrades !== null && (
        <CircularProgress
          value={(100 / 12) * medianGrades.grade}
          size={'100px'}
          color="green.400"
        >
          <CircularProgressLabel>{medianGrades.grade}</CircularProgressLabel>
        </CircularProgress>
      )}
      {!(hws !== null && hws.length === 0) && medianGrades !== null && (
        <>
          <Divider />
          <Flex flexDir={'column'} gap={1} w={'500px'} maxW={'95%'}>
            {sort(medianGrades.perSubject).map((medianGrade, i) => (
              <SubjectMedianGradeDisplay
                subjectName={medianGrade[0]}
                key={i}
                medianGrade={medianGrade[1]}
              />
            ))}
          </Flex>
        </>
      )}
    </Flex>
  );
}

function SubjectMedianGradeDisplay({ subjectName, medianGrade }) {
  return (
    <Flex w={'100%'} alignItems={'center'} justifyContent={'space-between'}>
      <Flex alignItems={'center'}>
        <BsDot /> {subjectName}
      </Flex>
      <CircularProgress
        value={(100 / 12) * medianGrade}
        size={'50px'}
        color="green.400"
      >
        <CircularProgressLabel>{medianGrade}</CircularProgressLabel>
      </CircularProgress>
    </Flex>
  );
}

SubjectMedianGradeDisplay.propTypes = {
  subjectName: PropTypes.string,
  medianGrade: PropTypes.number,
};

export default HomePage;
