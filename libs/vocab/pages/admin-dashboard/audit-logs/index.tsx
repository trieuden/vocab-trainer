'use client';
import React, { useState } from 'react';
import { Stack, Divider, Checkbox, Box } from '@mui/material';
import { AddCircleRounded, Clear, Done, DeleteOutlined, SaveOutlined } from '@mui/icons-material';
import { TextButton, OutlineButton, CustomDialog, TextFieldInput, SelectInput } from '@/core/component';
import { LibraryRow } from '../libraries/components/LibraryRow';
import { AuditLogRow } from './component/AuditLogRow';

export const AuditLogsManager = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [onAddWordForNewLibrary, setOnAddWordForNewLibrary] = useState(false);

  return (
    <Stack spacing={3}>
      <Stack direction={'row'}>
        <Stack className="flex-1">
          <h1 className="text-xl font-bold">Audit Logs Management</h1>
          <span className="text-gray-500">Manage audit logs here</span>
        </Stack>
      </Stack>
      <Divider />
      <Stack spacing={2} direction={'row'}>
        <Stack className="flex-1 border border-gray-300 rounded-xl">
          {/* Header */}
          <Stack
            direction={'row'}
            alignItems={'center'}
            className="bg-gray-200 h-10 px-3 rounded-t-xl
                  font-semibold"
          >
            <Stack flex={0.5} direction={'row'} spacing={1} alignItems={'center'}>
              <Checkbox checked={false} className="h-6 w-6" />
              <span>User Name</span>
            </Stack>
            <Stack flex={1} direction={'row'} justifyContent={'space-between'} spacing={2}>
              <span className="flex-1 whitespace-nowrap">Action Type</span>
              <span className="flex-1">Acted Time</span>
              <span className="flex-1">Action Detail</span>
            </Stack>
          </Stack>

          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item}>
              <AuditLogRow />
              {item < 5 && <Divider />}
            </div>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};
