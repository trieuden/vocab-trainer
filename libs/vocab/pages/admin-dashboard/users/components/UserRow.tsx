import { Stack, Dialog, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { CheckBox, MoreVert, AccountCircleOutlined, EditOutlined, DeleteForeverOutlined, LockOutlined } from '@mui/icons-material';
import { TextButton, CustomTextField, CustomDialog } from '@/core/component';
import { UserProfile } from './UserProfile';
import { UserPermission } from './UserPermission.js';

export const UserRow = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [openDialog, setOpenDialog] = useState<'Profile' | 'Permission' | false>(false);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Stack direction={'row'} alignItems={'center'} className="hover:bg-gray-100 h-16 rounded-md cursor-pointer p-3">
      <Stack flex={1.5} direction={'row'} spacing={1} alignItems={'center'}>
        <CheckBox />
        <span>Name</span>
      </Stack>
      <Stack flex={1} direction={'row'} justifyContent={'space-between'} spacing={2}>
        <CustomTextField className="flex-1" value="yantic088@gmai.com" />
        <Stack direction={'row'} alignItems={'center'} spacing={2} className="flex-1" justifyContent={'space-between'}>
          <span className="flex-1 text-[12px]">Mar 14, 2025</span>
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
              setOpenDialog('Profile');
            }}
            className="gap-2"
          >
            <AccountCircleOutlined sx={{ height: 16, width: 16 }} />
            <span className="font-[550] text-[14px]">Profile</span>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              setOpenDialog('Permission');
            }}
            className="gap-2"
          >
            <LockOutlined sx={{ height: 16, width: 16 }} />
            <span className="font-[550] text-[14px]">Permission</span>
          </MenuItem>

          <MenuItem onClick={handleClose} className="gap-2">
            <DeleteForeverOutlined sx={{ height: 16, width: 16 }} />
            <span className="font-[550] text-[14px]">Delete</span>
          </MenuItem>
        </Menu>
      </Stack>

      <CustomDialog isOpenModal={openDialog != false} setIsOpenModal={() => setOpenDialog(false)} maxWidth="md">
        {openDialog === 'Profile' ? (
          <UserProfile setIsOpenModal={() => setOpenDialog(false)} />
        ) : (
          <UserPermission setIsOpenModal={() => setOpenDialog(false)} />
        )}
      </CustomDialog>
    </Stack>
  );
};
