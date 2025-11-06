import { Divider, Stack } from '@mui/material';
import { OutlineButton } from '@/core/component/Button/OutlineButton';
import { CheckBox } from '@mui/icons-material';
import { UserRow } from './components/UserRow';
import { useThemeMode } from '@/vocab/providers';

export const UserManagement = () => {
  const { isDarkMode } = useThemeMode();

  return (
    <Stack spacing={3}>
      <Stack direction={'row'}>
        <Stack className="flex-1">
          <h1 className="text-xl font-bold">User Management</h1>
          <span className="text-gray-500">Manage user here</span>
        </Stack>
        <OutlineButton title="Add User" width={'100px'} handleClick={() => {}} />
      </Stack>
      <Divider />
      <Stack spacing={2} direction={'row'}>
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
            <Stack flex={1.5} direction={'row'} spacing={1} alignItems={'center'}>
              <CheckBox />
              <span>Name</span>
            </Stack>
            <Stack flex={1} direction={'row'} justifyContent={'space-between'} spacing={2}>
              <span className="flex-1">Email</span>
              <span className="flex-1">Last acive</span>
            </Stack>
          </Stack>
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item}>
              <UserRow />
              {item < 5 && <Divider />}
            </div>
          ))}
        </Stack>
      </Stack>
      <Divider />

      <Stack spacing={2} direction={'row'}>
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
            <Stack flex={1.5} direction={'row'} spacing={1} alignItems={'center'}>
              <CheckBox />
              <span>Name</span>
            </Stack>
            <Stack flex={1} direction={'row'} justifyContent={'space-between'} spacing={2}>
              <span className="flex-1">Email</span>
              <span className="flex-1">Last acive</span>
            </Stack>
          </Stack>
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item}>
              <UserRow />
              {item < 5 && <Divider />}
            </div>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};
