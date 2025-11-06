import { Stack, Dialog, Menu, MenuItem, Checkbox, Divider } from '@mui/material';
import React, { useState } from 'react';
import { MoreVert, DeleteForeverOutlined, AssessmentOutlined } from '@mui/icons-material';
import { TextButton, CustomTextField, CustomDialog, TextFieldInput } from '@/core/component';
import { TopicDetail } from './TopicDetail';

export const TopicRow = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [openDialog, setOpenDialog] = useState(false);
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Stack direction={'row'} alignItems={'center'} className="hover:bg-gray-100 min-h-16 rounded-md cursor-pointer p-3">
      <Stack flex={1.2} direction={'row'} spacing={1}>
        <Checkbox checked={false} className="h-6 w-6" />
        <span>Road</span>
      </Stack>
      <Stack flex={1} direction={'row'} justifyContent={'space-between'} spacing={2} alignItems={'center'}>
        <span className="flex-1">It description</span>
        <Stack direction={'row'} spacing={2} className="flex-1" justifyContent={'space-around'} alignItems={'center'}>
          <span className="">20</span>
          <TextButton icon={<MoreVert />} width={'30px'} fontSize={'20px'} color="black" handleClick={handleOpen} />
        </Stack>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              setOpenDialog(true);
            }}
            className="gap-2"
          >
            <AssessmentOutlined sx={{ height: 16, width: 16, color: 'green' }} />
            <span className="font-[550] text-[14px]">Detail</span>
          </MenuItem>

          <MenuItem onClick={handleClose} className="gap-2">
            <DeleteForeverOutlined sx={{ height: 16, width: 16, color: 'red' }} />
            <span className="font-[550] text-[14px]">Delete</span>
          </MenuItem>
        </Menu>
      </Stack>
      {/* Dialog */}
      <CustomDialog isOpenModal={openDialog} setIsOpenModal={() => setOpenDialog(false)}>
        <TopicDetail setOpenDialog={setOpenDialog} />
      </CustomDialog>
    </Stack>
  );
};
