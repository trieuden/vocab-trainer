import { useEffect, useState } from 'react';
import { Divider, Stack, Checkbox, Box } from '@mui/material';
import { North, South } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';

import { CustomDialog, OutlineButton, TextButton } from '@/core/component';
import { getUserByRole, searchUsersWithRole, deleteMultipleUsers } from '@/core/services/UserServices';
import { useConfirmation, useNotification, useThemeMode } from '@/vocab/providers';
import { handleSort } from '@/vocab/utils';

import { UserRow } from './components/UserRow';
import { UserProfile } from './components/UserProfile';
import { PaginationFooter } from '@/vocab/component/PaginationFooter';
import { SelectedBar } from '@/vocab/component/SelectedBar';
import { SearchBox } from '@/vocab/component';
import { useQueryClient } from '@tanstack/react-query';
import { UserModel } from '@/core/models';

export const UserManagement = () => {
  const { isDarkMode } = useThemeMode();
  const queryClient = useQueryClient();
  const { setNotification } = useNotification();
  const { setConfirmation } = useConfirmation();
  const [adminUsers, setAdminUsers] = useState<UserModel[]>([]);
  const [accountUsers, setAccountUsers] = useState<UserModel[]>([]);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  const [adPageSize, setAdPageSize] = useState(5);
  const [currentAdPage, setCurrentAdPage] = useState(0);

  const [accPageSize, setAccPageSize] = useState(5);
  const [currentAccPage, setCurrentAccPage] = useState(0);

  const [searchValue, setSearchValue] = useState('');
  const [sort, setSort] = useState<string>('');

  const { data: fetchAminUsers = [] } = useQuery({
    queryKey: ['users', 'admin'],
    queryFn: () => searchUsersWithRole('admin', searchValue),
  });

  const { data: fetchAccountUsers = [] } = useQuery({
    queryKey: ['users', 'account'],
    queryFn: () => searchUsersWithRole('user', searchValue),
  });

  useEffect(() => {
    if (fetchAminUsers) setAdminUsers(fetchAminUsers);
    setSort('');
  }, [fetchAminUsers]);

  useEffect(() => {
    setAccountUsers(fetchAccountUsers);
    setSort('');
  }, [fetchAccountUsers]);

  const handleSearch = async (value: string) => {
    setSearchValue(value);
    await queryClient.invalidateQueries({ queryKey: ['users', 'admin'] });
    await queryClient.invalidateQueries({ queryKey: ['users', 'account'] });
  };

  const handleDeleteUsers = async () => {
    if (checkedIds.length === 0) return;
    if (await setConfirmation('Delete Users', `Are you sure you want to delete ${checkedIds.length} users?`)) {
      const success = await deleteMultipleUsers(checkedIds);
      if (success) {
        await queryClient.invalidateQueries({ queryKey: ['users', 'admin'] });
        await queryClient.invalidateQueries({ queryKey: ['users', 'account'] });
        setCheckedIds([]);
        setNotification('Users deleted successfully', 'success');
      }
    }
  };

  return (
    <Stack spacing={3}>
      {/* header */}
      <Stack direction={'row'} component={'header'}>
        <Stack className="flex-1">
          <h1 className="text-xl font-bold">User Management</h1>
          <span className="text-gray-500">Manage user here</span>
        </Stack>
        <Stack direction={'row'} spacing={2} alignItems={'center'}>
          <SearchBox value={searchValue} setValue={setSearchValue} onChange={handleSearch} />
          <OutlineButton
            title="Add User"
            width={'100px'}
            handleClick={() => {
              setIsOpenModal(true);
            }}
          />
        </Stack>
      </Stack>
      <Divider />
      {/* admin */}
      <Stack spacing={1}>
        <Stack spacing={2} direction={'row'} component={'section'}>
          <Stack className="flex-1">
            <span className="text-md font-semibold">Admin users</span>
            <span className="text-xs text-gray-500">Admin can add and remove users and manage organization-level settings</span>
          </Stack>
          <Stack className="flex-3 border border-gray-300 rounded-xl">
            <Stack
              direction={'row'}
              alignItems={'center'}
              className="bg-gray-200 h-10 px-3 rounded-t-xl
            font-semibold"
            >
              <Checkbox
                checked={adminUsers.length > 0 && adminUsers.every((u: UserModel) => checkedIds.includes(u.id))}
                indeterminate={adminUsers.some((u: UserModel) => checkedIds.includes(u.id)) && !adminUsers.every((u) => checkedIds.includes(u.id))}
                onChange={(e) => {
                  if (e.target.checked) {
                    adminUsers.forEach((u) => {
                      setCheckedIds((prev) => [...prev, u.id]);
                    });
                  } else {
                    adminUsers.forEach((u) => {
                      setCheckedIds((prev) => prev.filter((id) => id !== u.id));
                    });
                  }
                }}
              />
              <Stack flex={0.8} direction={'row'} spacing={1} alignItems={'center'}>
                <TextButton
                  endIcon={sort === 'NameAdminAsc' ? <South /> : sort === 'NameAdminDes' ? <North /> : ''}
                  iconColor="var(--bgButtonPrimary)"
                  handleClick={() => {
                    handleSort(sort, setSort, 'NameAdmin', 'name', setAdminUsers, fetchAminUsers);
                  }}
                  title="Name"
                  color="black"
                  fontSize={'17px'}
                />
              </Stack>
              <Stack flex={1} direction={'row'} justifyContent={'space-between'} spacing={2}>
                <Box className="flex-1 items-start">
                  <TextButton
                    endIcon={sort === 'EmailAdminAsc' ? <South /> : sort === 'EmailAdminDes' ? <North /> : ''}
                    iconColor="var(--bgButtonPrimary)"
                    handleClick={() => {
                      handleSort(sort, setSort, 'EmailAdmin', 'email', setAdminUsers, fetchAminUsers);
                    }}
                    title="Email"
                    color="black"
                    fontSize={'17px'}
                    width={'fit-content'}
                  />
                </Box>
                <Box className="flex-1 items-start">
                  <TextButton
                    endIcon={sort === 'LastActiveAtAdminAsc' ? <South /> : sort === 'LastActiveAtAdminDes' ? <North /> : ''}
                    iconColor="var(--bgButtonPrimary)"
                    handleClick={() => {
                      handleSort(sort, setSort, 'LastActiveAtAdmin', 'lastActiveAt', setAdminUsers, fetchAminUsers);
                    }}
                    title="Last Active"
                    color="black"
                    fontSize={'17px'}
                    width={'fit-content'}
                  />
                </Box>
                <Box className="flex-1 items-start">
                  <TextButton
                    endIcon={sort === 'StatusAdminAsc' ? <South /> : sort === 'StatusAdminDes' ? <North /> : ''}
                    iconColor="var(--bgButtonPrimary)"
                    handleClick={() => {
                      handleSort(sort, setSort, 'StatusAdmin', 'status', setAdminUsers, fetchAminUsers);
                    }}
                    title="Status"
                    color="black"
                    fontSize={'17px'}
                    width={'fit-content'}
                  />
                </Box>
              </Stack>
            </Stack>
            {adminUsers.length > 0 &&
              adminUsers?.map((user, i) => (
                <Stack direction={'row'} alignItems={'center'} key={user.id} className="hover:bg-gray-100 px-3">
                  <Checkbox
                    checked={checkedIds.includes(user.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCheckedIds((prev) => [...prev, user.id]);
                      } else {
                        setCheckedIds((prev) => prev.filter((id) => id !== user.id));
                      }
                    }}
                  />
                  <UserRow user={user} />
                  {i < adminUsers.length - 1 && <Divider />}
                </Stack>
              ))}
          </Stack>
        </Stack>
        {/* Admin pagination */}
        <PaginationFooter
          pageSize={adPageSize}
          setPageSize={setAdPageSize}
          offset={currentAdPage}
          setOffset={setCurrentAdPage}
          totalItems={adminUsers.length}
        />
      </Stack>
      <Divider />
      {/* User */}
      <Stack>
        <Stack spacing={2} direction={'row'} component={'section'}>
          <Stack className="flex-1">
            <span className="text-md font-semibold">Account users</span>
            <span className="text-xs text-gray-500">Account users can assess and review risks, questionnaires, nd identify breaches</span>
          </Stack>
          <Stack className="flex-3 border border-gray-300 rounded-xl">
            <Stack
              direction={'row'}
              alignItems={'center'}
              className="bg-gray-200 h-10 px-3 rounded-t-xl
            font-semibold"
            >
              <Checkbox
                checked={accountUsers.length > 0 && accountUsers.every((u) => checkedIds.includes(u.id))}
                indeterminate={accountUsers.some((u) => checkedIds.includes(u.id)) && !accountUsers.every((u) => checkedIds.includes(u.id))}
                onChange={(e) => {
                  if (e.target.checked) {
                    accountUsers.forEach((u) => {
                      setCheckedIds((prev) => [...prev, u.id]);
                    });
                  } else {
                    accountUsers.forEach((u) => {
                      setCheckedIds((prev) => prev.filter((id) => id !== u.id));
                    });
                  }
                }}
              />
              <Stack flex={0.8} direction={'row'} spacing={1} alignItems={'center'}>
                <TextButton
                  endIcon={sort === 'NameUserAsc' ? <South /> : sort === 'NameUserDes' ? <North /> : ''}
                  iconColor="var(--bgButtonPrimary)"
                  handleClick={() => {
                    handleSort(sort, setSort, 'NameUser', 'name', setAccountUsers, fetchAccountUsers);
                  }}
                  title="Name"
                  color="black"
                  fontSize={'17px'}
                />
              </Stack>
              <Stack flex={1} direction={'row'} justifyContent={'space-between'} spacing={2}>
                <Box className="flex-1 items-start">
                  <TextButton
                    endIcon={sort === 'EmailUserAsc' ? <South /> : sort === 'EmailUserDes' ? <North /> : ''}
                    iconColor="var(--bgButtonPrimary)"
                    handleClick={() => {
                      handleSort(sort, setSort, 'EmailUser', 'email', setAccountUsers, fetchAccountUsers);
                    }}
                    title="Email"
                    color="black"
                    fontSize={'17px'}
                    width={'fit-content'}
                  />
                </Box>
                <Box className="flex-1 items-start">
                  <TextButton
                    endIcon={sort === 'LastActiveAtUserAsc' ? <South /> : sort === 'LastActiveAtUserDes' ? <North /> : ''}
                    iconColor="var(--bgButtonPrimary)"
                    handleClick={() => {
                      handleSort(sort, setSort, 'LastActiveAtUser', 'lastActiveAt', setAccountUsers, fetchAccountUsers);
                    }}
                    title="Last Active"
                    color="black"
                    fontSize={'17px'}
                    width={'fit-content'}
                  />
                </Box>
                <Box className="flex-1 items-start">
                  <TextButton
                    endIcon={sort === 'StatusUserAsc' ? <South /> : sort === 'StatusUserDes' ? <North /> : ''}
                    iconColor="var(--bgButtonPrimary)"
                    handleClick={() => {
                      handleSort(sort, setSort, 'StatusUser', 'status', setAccountUsers, fetchAccountUsers);
                    }}
                    title="Status"
                    color="black"
                    fontSize={'17px'}
                    width={'fit-content'}
                  />
                </Box>
              </Stack>
            </Stack>
            {accountUsers.map((user, i) => (
              <Stack direction={'row'} alignItems={'center'} key={user.id} className="hover:bg-gray-100 px-3">
                <Checkbox
                  checked={checkedIds.includes(user.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheckedIds((prev) => [...prev, user.id]);
                    } else {
                      setCheckedIds((prev) => prev.filter((id) => id !== user.id));
                    }
                  }}
                />
                <UserRow user={user} />
                {i < accountUsers.length - 1 && <Divider />}
              </Stack>
            ))}
          </Stack>
        </Stack>
        {/* Account pagination */}
        <PaginationFooter
          pageSize={accPageSize}
          setPageSize={setAccPageSize}
          offset={currentAccPage}
          setOffset={setCurrentAccPage}
          totalItems={adminUsers.length}
        />
      </Stack>

      <SelectedBar
        checkedCount={checkedIds.length}
        onClear={() => {
          setCheckedIds([]);
        }}
        onDelete={() => handleDeleteUsers()}
      />

      {/* New user */}
      <CustomDialog isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} maxWidth="md">
        <UserProfile setIsOpenModal={setIsOpenModal} />
      </CustomDialog>
    </Stack>
  );
};
