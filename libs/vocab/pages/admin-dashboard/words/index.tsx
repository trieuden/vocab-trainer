'use client';
import { useState } from 'react';
import { Stack, Divider, Box } from '@mui/material';
import { CheckBox, Clear, DeleteOutline, AddOutlined } from '@mui/icons-material';
import { useThemeMode } from '@/vocab/providers';
import { CustomDialog, OutlineButton, SelectInput, TextButton, TextFieldInput } from '@/core/component';
import { WordRow } from './components/WordRow';

export const WordsManagement = () => {
  const { isDarkMode } = useThemeMode();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);

  return (
    <Stack spacing={3}>
      <Stack direction={'row'}>
        <Stack className="flex-1">
          <h1 className="text-xl font-bold">Words Management</h1>
          <span className="text-gray-500">Manage words here</span>
        </Stack>
        <OutlineButton
          title="Add Word"
          width={'100px'}
          handleClick={() => {
            setIsOpenModal(true);
          }}
        />
      </Stack>
      <Divider />
      <Stack spacing={2} direction={'row'}>
        <Stack className="flex-1">
          <span className="text-md font-semibold">CEFR B1</span>
          <span className="text-xs text-gray-500">Manage words</span>
        </Stack>
        <Stack className="flex-3 border border-gray-300 rounded-xl">
          <Stack
            direction={'row'}
            alignItems={'center'}
            className="bg-gray-200 h-10 px-3 rounded-t-xl
            font-semibold"
          >
            <Stack flex={0.5} direction={'row'} spacing={1} alignItems={'center'}>
              <CheckBox />
              <span>Word</span>
            </Stack>
            <Stack flex={1} direction={'row'} justifyContent={'space-between'} spacing={2}>
              <span className="flex-1 whitespace-nowrap">Word Type</span>
              <span className="flex-1">Pronunciation</span>
              <span className="flex-1">Vietnamese</span>
            </Stack>
          </Stack>

          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item}>
              <WordRow />
              {item < 5 && <Divider />}
            </div>
          ))}
        </Stack>
      </Stack>
      <CustomDialog isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}>
        <Stack spacing={1} className="text-black px-2">
          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <h1 className="font-bold text-[18px] pl-3">New Word</h1>
            <TextButton startIcon={<Clear />} width={'35px'} fontSize={23} handleClick={() => setIsOpenModal(false)} />
          </Stack>
          <Stack direction={'row'} spacing={1}>
            <TextFieldInput title="Word" value={''} roundedWidth={3} />
            <SelectInput value={[]} selectedValue="" onChange={() => {}} width={'90px'} title="CEFR" roundedWidth={3} />
          </Stack>
          <Stack direction={'row'} spacing={1}>
            <TextFieldInput title="UK Pronunciation" value={''} roundedWidth={3} />
            <TextFieldInput title="US Pronunciation" value={''} roundedWidth={3} />
          </Stack>
          {/* box entry */}
          <Stack direction={'row'} className="relative border-dashed border-1 rounded-2xl p-4 bg-white" alignItems={'center'}>
            <Box className="items-start w-[20%]">
              <span className="border-1 rounded-md px-2">Noun</span>
            </Box>
            <Stack className="flex-3">
              <span>Con đường</span>
              <Stack direction={'row'} spacing={1} alignItems="center">
                <i className="text-[15px] text-[#a6a6a6]">The road was long and winding.</i>
              </Stack>
            </Stack>
            <Box className="absolute top-0 right-5">
              <TextButton startIcon={<DeleteOutline />} width={'10px'} fontSize={'20px'} color="red" />
            </Box>
          </Stack>
          <Box className="flex-1" alignItems={'center'}>
            <OutlineButton title="" icon={<AddOutlined />} handleClick={() => setIsOpenAddModal(true)} height={'30px'} />
          </Box>
          {/* New entry box */}
          <CustomDialog isOpenModal={isOpenAddModal} setIsOpenModal={setIsOpenAddModal}>
            <Stack spacing={1} className="text-black">
              <h1 className="font-bold text-[18px] pl-3">New Entry</h1>
              <Stack direction={'row'} spacing={2}>
                <SelectInput value={[]} selectedValue="" onChange={() => {}} width={'170px'} title="Word type" />
                <TextFieldInput value={''} setValue={() => {}} roundedWidth={3} title="Vietnamese" />
              </Stack>
              <TextFieldInput value={''} setValue={() => {}} roundedWidth={3} title="Example" />
              <Stack direction={'row'} spacing={2} justifyContent={'flex-end'}>
                <TextButton title="Exit" width={'70px'} handleClick={() => setIsOpenAddModal(false)} />
                <OutlineButton title="Save" width="120px" />
              </Stack>
            </Stack>
          </CustomDialog>
          {/* Button */}
          <Stack direction={'row'} spacing={2} justifyContent={'flex-end'} className="pt-3">
            <TextButton title="Cancel" handleClick={() => setIsOpenModal(false)} />
            <OutlineButton title="Add Word" handleClick={() => setIsOpenModal(false)} width={'120px'} />
          </Stack>
        </Stack>
      </CustomDialog>
    </Stack>
  );
};
