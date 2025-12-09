'use-client';
import React, { useState } from 'react';
import { Stack, Divider, Checkbox, Box } from '@mui/material';
import { AddCircleRounded, Clear, Done, DeleteOutlined, SaveOutlined } from '@mui/icons-material';
import { TextButton, OutlineButton, CustomDialog, TextFieldInput, SelectInput } from '@/core/component';
import { LibraryRow } from './components/LibraryRow';

export const LibrariesManager = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [onAddWordForNewLibrary, setOnAddWordForNewLibrary] = useState(false);

  return (
    <Stack spacing={3}>
      <Stack direction={'row'}>
        <Stack className="flex-1">
          <h1 className="text-xl font-bold">Libraries Management</h1>
          <span className="text-gray-500">Manage libraries here</span>
        </Stack>
        <OutlineButton
          title="New Library"
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
            <Stack flex={0.5} direction={'row'} spacing={1} alignItems={'center'}>
              <Checkbox checked={false} className="h-6 w-6" />
              <span>Library Name</span>
            </Stack>
            <Stack flex={1} direction={'row'} justifyContent={'space-between'} spacing={2}>
              <span className="flex-1 whitespace-nowrap">Description</span>
              <span className="flex-1">Word Quantity</span>
              <span className="flex-1">Created User</span>
              <span className="flex-1">Status</span>
            </Stack>
          </Stack>

          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item}>
              <LibraryRow />
              {item < 5 && <Divider />}
            </div>
          ))}
        </Stack>
      </Stack>

      {/* New Library form */}
      <CustomDialog isOpenModal={openDialog} setIsOpenModal={() => setOpenDialog(false)} maxWidth="md">
        <Box className="text-black pb-3">
          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'start'}>
            <h1 className="font-bold text-[16px] ">New Library</h1>
            <TextButton startIcon={<Clear />} width={'35px'} fontSize={23} height={'20px'} handleClick={() => setOpenDialog(false)} color="red" />
          </Stack>
          {/* Library info */}
          <Stack direction={'row'} spacing={3} className="p-3">
            <Stack spacing={2} flex={1}>
              <Box>
                <span className="font-medium">Library Name</span>
                <TextFieldInput value={''} setValue={() => {}} roundedWidth={3} height={'30px'} />
              </Box>
              <Box>
                <span className="font-medium">Description</span>
                <TextFieldInput value={''} setValue={() => {}} roundedWidth={3} height={'30px'} />
              </Box>
            </Stack>
            {/* Word Box*/}
            <Divider orientation="vertical" flexItem />
            <span className="self-start font-medium">Word</span>
            <Stack flex={2} spacing={1} direction={'column'} justifyContent={'center'} alignItems={'center'} className="rounded-xl pt-2">
              {/* New word */}
              {onAddWordForNewLibrary ? (
                <Stack direction={'row'} spacing={2} alignItems={'center'} justifyContent={'center'} className="p-2 rounded-xl w-full">
                  <SelectInput title="New Word" value={[]} onChange={() => {}} width={'50%'} />
                  <TextButton width={'25px'} startIcon={<Clear />} color="#ff0000" handleClick={() => setOnAddWordForNewLibrary(false)} />
                  <TextButton width={'25px'} startIcon={<Done />} handleClick={() => setOnAddWordForNewLibrary(false)} />
                </Stack>
              ) : (
                <OutlineButton
                  title=""
                  width={'80%'}
                  handleClick={() => {
                    setOnAddWordForNewLibrary(true);
                  }}
                  height={'30px'}
                  icon={<AddCircleRounded />}
                />
              )}
              <Box className="rounded-2xl flex-1 w-full p-2 shadow-xl">
                {/* Header Word table */}
                <Stack direction={'row'} alignItems={'center'} className="bg-gray-200 h-10 px-3 rounded-t-xl font-semibold">
                  <Stack flex={1.2} direction={'row'} spacing={1} alignItems={'center'}>
                    <Checkbox checked={false} className="h-6 w-6" />
                    <span>Word</span>
                  </Stack>
                  <Stack flex={1} direction={'row'} justifyContent={'space-between'} spacing={2}>
                    <span className="flex-1 whitespace-nowrap">Vietnamese</span>
                    <span className="flex-1">CEFR</span>
                  </Stack>
                </Stack>
                {/* Word table */}
                <Stack
                  className="overflow-y-auto h-64 "
                  sx={{
                    scrollBehavior: 'smooth',
                    '&::-webkit-scrollbar': {
                      width: '4px',
                    },
                    '&::-webkit-scrollbar-track': {
                      backgroundColor: '#f1f1f1',
                      borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: '#b3b3b3',
                      borderRadius: '10px',
                    },
                  }}
                >
                  {[1, 2, 3, 4, 5].map((item, index) => (
                    <div key={item}>
                      <Stack direction={'row'} alignItems={'center'} className="hover:bg-gray-100 min-h-16 rounded-md cursor-pointer p-4 relative">
                        <Stack flex={1.2} direction={'row'} spacing={1} alignItems={'end'}>
                          <Checkbox checked={false} className="h-6 w-6" />
                          <span>Road</span>
                          <i className="bg-[#e5e2e2] text-[12px] rounded-2xl px-1 size-fit">noun</i>
                        </Stack>
                        <Stack flex={1} direction={'row'} justifyContent={'space-between'} spacing={2} alignItems={'center'}>
                          <span className="flex-1">Con duong</span>
                          <Stack direction={'row'} spacing={2} className="flex-1" justifyContent={'space-around'} alignItems={'center'}>
                            <span className="">C1</span>
                            <TextButton startIcon={<DeleteOutlined />} width={'20px'} color="red" />
                          </Stack>
                        </Stack>
                        <span className="absolute top-0 left-1 text-[9px]">{++index}</span>
                      </Stack>
                      {item < 5 && <Divider />}
                    </div>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Stack>
          {/* buttons */}
          <Box className="flex justify-end mr-3">
            <OutlineButton title="Save" icon={<SaveOutlined />} handleClick={() => {}} width={'120px'} height={'30px'} />
          </Box>
        </Box>
      </CustomDialog>
    </Stack>
  );
};
