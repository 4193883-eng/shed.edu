import {
  Button,
  IconButton,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure,
} from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import PropTypes from 'prop-types';
import {
  amendSubjectService,
  deleteSubjectService,
} from '../services/subjectsServices.js';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {InputField} from "./auth/InputField.jsx";

const validationSchema = yup.object().shape({
  subjectName: yup.string().min(3, 'The subject name is too short'),
});

export function LessonListItem({ subjectName, id, onDelete, onEdit }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false)

  function handleDelete() {
    setIsLoading(true);
    deleteSubjectService(id).then(() => {
      onDelete(id);
      setIsLoading(false);
    });
  }


  const formik = useFormik({
    initialValues: {
      subjectName: subjectName,
    },
    validationSchema,
    onSubmit: (values) => {
      const newName= values.subjectName
      setIsLoading(true);
      setIsOpen(false)
      amendSubjectService(id, newName).then(() => {
        onEdit(id, newName)
        setIsLoading(false)
      });
    },
  });

  return (
    <ListItem
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      width={'100%'}
    >
      {subjectName}
      <Menu>
        <MenuButton
          as={IconButton}
          variant="ghost"
          colorScheme="gray"
          aria-label="See menu"
          icon={<BsThreeDotsVertical />}
          isLoading={isLoading}
        />
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size={'xl'}>
          <ModalOverlay/>
          <ModalContent as={'form'} onSubmit={formik.handleSubmit}>
            <ModalHeader>
              Editing {subjectName}
            </ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
              <InputField
                meta={formik.getFieldMeta('subjectName')}
                label={'Subject Name'}
                required={true}
                placeholder={'Subject Name'}
                disabled={isLoading}
                {...formik.getFieldProps('subjectName')}
              />
            </ModalBody>
            <ModalFooter>
              <Button type={'submit'} mr={3}>
                Edit Subject
              </Button>
              <Button onClick={() => setIsOpen(false)}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <MenuList>
          <MenuItem onClick={() => setIsOpen(true) }>Edit</MenuItem>
          <MenuItem color="red.400" onClick={handleDelete}>
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
    </ListItem>
  );
}

LessonListItem.propTypes = {
  subjectName: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};
