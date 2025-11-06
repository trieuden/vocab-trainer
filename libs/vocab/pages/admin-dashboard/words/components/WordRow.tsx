import { Stack, Dialog, Menu, MenuItem, Checkbox } from '@mui/material';
import React, { useState } from 'react';
import { MoreVert, AccountCircleOutlined, EditOutlined, DeleteForeverOutlined, LockOutlined, AssessmentOutlined } from '@mui/icons-material';
import { TextButton, CustomTextField, CustomDialog } from '@/core/component';
import { WordDetail } from './WordDetail';

export const WordRow = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [openDialog, setOpenDialog] = useState<'Detail' | 'Permission' | false>(false);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Stack direction={'row'} className="hover:bg-gray-100 min-h-16 rounded-md cursor-pointer p-3">
      <Stack flex={0.5} direction={'row'} spacing={1}>
        <Checkbox checked={false} className="h-6 w-6" />
        <span>Road</span>
      </Stack>
      <Stack flex={1} direction={'row'} justifyContent={'space-between'} spacing={2}>
        <Stack direction={'column'} spacing={1} className="flex-1" alignItems="flex-start">
          <span className="bg-[#99ffbb] px-2 rounded-xl hover:scale-105">Noun</span>
          <span className="bg-[#ffff99] px-2 rounded-xl hover:scale-105">Verb</span>
          <span className="bg-[#b3c6ff] px-2 rounded-xl hover:scale-105">Adjective</span>
          <span className="bg-[#ff9999] px-2 rounded-xl hover:scale-105">Adverb</span>
        </Stack>
        <Stack direction={'column'} spacing={1} className="flex-1" alignItems="flex-start">
          <span>/rəʊd/</span>
          <span>/roʊd/</span>
        </Stack>

        <Stack direction={'row'} spacing={2} className="flex-1" justifyContent={'space-between'} alignItems={'flex-start'}>
          <span className="flex-1">Con đường</span>
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
              setOpenDialog('Detail');
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

      <CustomDialog isOpenModal={openDialog != false} setIsOpenModal={() => setOpenDialog(false)} maxWidth="md">
        <WordDetail setIsOpenModal={() => setOpenDialog(false)} />
      </CustomDialog>
    </Stack>
  );
};
