'use client';
import { useEffect, useState } from 'react';
import { Stack, Divider, Box } from '@mui/material';
import { useThemeMode } from '@/vocab/providers';
import { CustomDialog, OutlineButton } from '@/core/component';
import { Permissions } from './components/Permissions';
import { RoleModel } from '@/core/models/RoleModel';
import { useQuery } from '@tanstack/react-query';
import { getAllRoles } from '@/core/services/RoleServices';

export const RoleManagers = () => {
  const { isDarkMode } = useThemeMode();

  const [roles, setRoles] = useState<RoleModel[]>();

  const { data: fetchRoles = [], isLoading: isLoadingRoles } = useQuery({
    queryKey: ['roles'],
    queryFn: () => getAllRoles(),
  });

  useEffect(() => {
    setRoles(fetchRoles);
  }, [fetchRoles]);

  return (
    <Stack spacing={3}>
      <Stack direction={'row'}>
        <Stack className="flex-1">
          <h1 className="text-xl font-bold">Roles Management</h1>
          <span className="text-gray-500">Manage roles here</span>
        </Stack>
      </Stack>
      <Divider />
      {isLoadingRoles ? (
        <Box className="p-5 text-center">Loading...</Box>
      ) : (
        roles?.map((role) => (
          <Stack spacing={2} direction={'row'} key={role.id}>
            <Stack className="flex-1">
              <span className="text-lg font-semibold">{role.roleName.toUpperCase()}</span>
              <span className="text-sm text-gray-500">Permissions: {role.rolePermissions?.length}</span>
            </Stack>
            <Box className="flex-3">
              <Permissions role={role} />
            </Box>
          </Stack>
        ))
      )}
    </Stack>
  );
};
