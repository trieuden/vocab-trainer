'use-client';
import React, { useState } from 'react';
import { Stack, Divider, Checkbox, Box } from '@mui/material';
import { AddCircleRounded, Clear } from '@mui/icons-material';
import { TextButton, OutlineButton, CustomDialog, TextFieldInput } from '@/core/component';
import { TopicRow } from './components/TopicRow';

export const TopicsManagement = () => {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <Stack spacing={3}>
      <Stack direction={'row'}>
        <Stack className="flex-1">
          <h1 className="text-xl font-bold">Topics Management</h1>
          <span className="text-gray-500">Manage topics here</span>
        </Stack>
        <OutlineButton
          title="New Topic"
          width={'100px'}
          handleClick={() => {
            setOpenDialog(true);
          }}
        />
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
            <Stack flex={1.2} direction={'row'} spacing={1} alignItems={'center'}>
              <Checkbox checked={false} className="h-6 w-6" />
              <span>Name</span>
            </Stack>
            <Stack flex={1} direction={'row'} justifyContent={'space-between'} spacing={2}>
              <span className="flex-1 whitespace-nowrap">Description</span>
              <span className="flex-1">Word Quantity</span>
            </Stack>
          </Stack>

          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item}>
              <TopicRow />
              {item < 5 && <Divider />}
            </div>
          ))}
        </Stack>
      </Stack>
      <CustomDialog isOpenModal={openDialog} setIsOpenModal={() => setOpenDialog(false)}>
        <Box className="text-black">
          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <h1 className="font-bold text-[16px] pl-3">New Topic</h1>
            <TextButton icon={<Clear />} width={'35px'} fontSize={23} handleClick={() => setOpenDialog(false)} color="red" />
          </Stack>
          <Stack direction={'row'} spacing={1}>
            <Stack spacing={2} flex={1}>
              <Box>
                <span className="">Topic Name</span>
                <TextFieldInput value={''} setValue={() => {}} roundedWidth={3} height={'30px'} />
              </Box>
              <Box>
                <span className="">Description</span>
                <TextFieldInput value={''} setValue={() => {}} roundedWidth={3} height={'30px'} />
              </Box>
            </Stack>
            <Stack flex={2} alignItems={'center'} boxShadow={2} className="p-2 rounded-xl">
              <span className="self-start font-semibold">Word</span>
              <OutlineButton title="" width={'80%'} handleClick={() => {}} height={'30px'} icon={<AddCircleRounded />} />
            </Stack>
          </Stack>
        </Box>
      </CustomDialog>
    </Stack>
  );
};
