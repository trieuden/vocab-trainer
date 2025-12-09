import { CloseOutlined } from '@mui/icons-material';
import { Stack, Dialog, Menu, MenuItem, Checkbox, Divider, Box } from '@mui/material';
import React, { useState } from 'react';

export const AuditLogRow = () => {
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
        <span>Huỳnh Ngọc Triều</span>
      </Stack>
      <Stack flex={1} direction={'row'} justifyContent={'space-between'} spacing={2} alignItems={'center'}>
        <Box className="flex-1">
          <Stack direction={'row'} alignItems={'center'} className="border-2 border-red-500 w-fit p-1 rounded-full shadow-2xl" spacing={1}>
            <CloseOutlined className="text-red-500" />
            <span className="">Delete</span>
          </Stack>
        </Box>
        <Stack flex={1} direction={'row'}>
          <span className="">10:20 12/6/2025</span>
        </Stack>
        <span className="flex-1">Delete word on Animal Library</span>
      </Stack>
    </Stack>
  );
};
