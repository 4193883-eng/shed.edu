import {IconButton, ListItem, Menu, MenuButton, MenuItem, MenuList} from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';

export function LessonListItem({ subjectName, id,  onDelete }) {
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
        />

        <MenuList>
          <MenuItem >
            Edit
          </MenuItem>
          <MenuItem color="red.400" onClick={() => { onDelete(id) }}>
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
    </ListItem>
  );
}
