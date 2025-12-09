import { Stack, Dialog, Menu, MenuItem, Checkbox, Divider, Box } from '@mui/material';
import React, { useState } from 'react';
import { MoreVert, DeleteForeverOutlined, AssessmentOutlined } from '@mui/icons-material';
import { TextButton, CustomTextField, CustomDialog, TextFieldInput } from '@/core/component';
import { TopicDetail } from '../../topics/components/TopicDetail';
import { LibraryDetail } from './LibraryDetail';

export const LibraryRow = () => {
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
      <Stack flex={0.5} direction={'row'} spacing={1} alignItems={'center'}>
        <Checkbox checked={false} className="h-6 w-6" />
        <Box
          component="img"
          src="/images/trieuden.jpg"
          alt="avatar"
          className="rounded-full h-10 w-10 object-cover cursor-pointer hover:opacity-80 transition"
        />
        <span>Road</span>
      </Stack>
      <Stack flex={1} direction={'row'} justifyContent={'space-between'} spacing={2} alignItems={'center'}>
        <span className="flex-1">It description</span>
        <Stack flex={1} direction={'row'}>
          <span className="pl-[20%]">20</span>
        </Stack>
        <span className="flex-1">Huynh Noc Trieu</span>
        <Stack direction={'row'} spacing={2} className="flex-1" justifyContent={'space-around'} alignItems={'center'}>
          <span className="flex-1">Public</span>
          <TextButton startIcon={<MoreVert />} width={'30px'} fontSize={'20px'} color="black" handleClick={handleOpen} />
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
      <CustomDialog isOpenModal={openDialog} setIsOpenModal={() => setOpenDialog(false)} maxWidth="md">
        <LibraryDetail setOpenDialog={setOpenDialog} />
      </CustomDialog>
    </Stack>
  );
};
