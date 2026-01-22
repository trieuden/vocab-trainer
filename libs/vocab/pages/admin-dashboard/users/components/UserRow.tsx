import { Stack, Checkbox, Menu, MenuItem, Box } from '@mui/material';
import React, { memo, useState } from 'react';
import { MoreVert, AccountCircleOutlined, LockOpenOutlined, LockOutlined, LockPersonOutlined } from '@mui/icons-material';
import { TextButton, CustomTextField, CustomDialog } from '@/core/component';
import { UserProfile } from './UserProfile';
import { UserPermission } from './UserPermission.js';
import { UserModel } from '@/core/models';
import { formatDate } from '@/vocab/utils/formatDate';
import { UserStatus } from '@/core/enums/UserEnum';
import { useNotification } from '@/vocab/providers/NotificationProvider';
import { useConfirmation } from '@/vocab/providers/ConfirmationProvider';
import { banUser, unbannedUser } from '@/core/services/UserServices';
import { useQueryClient } from '@tanstack/react-query';

type UserRowProps = {
  user: UserModel;
};

export const UserRow = memo(({ user }: UserRowProps) => {
  const { setNotification } = useNotification();
  const { setConfirmation } = useConfirmation();
  const queryClient = useQueryClient();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [openDialog, setOpenDialog] = useState<'Profile' | 'Permission' | false>(false);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const updateStatus = async () => {
    const status = user.status === UserStatus.ACTIVE ? UserStatus.BANNED : UserStatus.ACTIVE;
    if (await setConfirmation('Update User Status', `Are you sure you want to ${status} user?`)) {
      try {
        if (user.status === UserStatus.ACTIVE) {
          await banUser(user.id);
        } else {
          await unbannedUser(user.id);
        }
        setNotification('User status updated successfully', 'success');
        await queryClient.invalidateQueries({ queryKey: ['users', user.role.roleName] });
      } catch (error) {
        setNotification('Failed to update user status', 'error');
        console.error(error);
      }
      handleClose();
    }
  };

  return (
    <Stack direction={'row'} alignItems={'center'} className=" h-16 rounded-md cursor-pointer flex-1">
      <Stack flex={0.8} direction={'row'} spacing={1} alignItems={'center'}>
        <Box
          component="img"
          src={user.avatar || '/images/default.png'}
          alt="avatar"
          className="rounded-full h-10 w-10 object-cover cursor-pointer hover:opacity-80 transition"
        />
        <span>{user.name}</span>
      </Stack>
      <Stack flex={1} direction={'row'} alignItems={'center'} justifyContent={'space-between'} spacing={2}>
        <CustomTextField className="flex-1" value={user.email} />
        <span className="flex-1">{formatDate(user.createdAt.toString(), 'date')}</span>
        <Stack direction={'row'} alignItems={'center'} spacing={2} className="flex-1" justifyContent={'space-between'}>
          <span
            className={`flex-1 font-bold ${
              user.status === UserStatus.ACTIVE ? 'text-blue-500' : user.status === UserStatus.BANNED ? 'text-yellow-500' : 'text-gray-500'
            }`}
          >
            {user.status.toUpperCase()}
          </span>
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
            <LockPersonOutlined sx={{ height: 16, width: 16 }} />
            <span className="font-[550] text-[14px]">Permission</span>
          </MenuItem>

          <MenuItem onClick={() => updateStatus()} className="gap-2">
            {user.status === UserStatus.ACTIVE ? (
              <LockOutlined sx={{ height: 16, width: 16 }} />
            ) : (
              <LockOpenOutlined sx={{ height: 16, width: 16 }} />
            )}
            <span className="font-[550] text-[14px]">{user.status === UserStatus.ACTIVE ? 'Lock' : 'UnLock'}</span>
          </MenuItem>
        </Menu>
      </Stack>
      <CustomDialog isOpenModal={openDialog != false} setIsOpenModal={() => setOpenDialog(false)} maxWidth="md">
        {openDialog === 'Profile' && <UserProfile setIsOpenModal={() => setOpenDialog(false)} currentUser={user} />}
        {openDialog === 'Permission' && <UserPermission setIsOpenModal={() => setOpenDialog(false)} currentUser={user} />}
      </CustomDialog>
    </Stack>
  );
});
