import { Stack, Divider, Checkbox, Box, Tooltip } from '@mui/material';
import { Clear, EditOutlined, Done, DeleteOutlined, AddOutlined, AddCircleOutline, AddCircleRounded } from '@mui/icons-material';
import { OutlineButton, SelectInput, TextButton, TextFieldInput } from '@/core/component';
import React, { useState } from 'react';
import { TopicRow } from './TopicRow';

type TopicDetailProps = {
  setOpenDialog: (open: boolean) => void;
};

export const TopicDetail = ({ setOpenDialog }: TopicDetailProps) => {
  const [isEditTopicName, setIsEditTopicName] = useState(false);
  const [isEditDescription, setIsEditDescription] = useState(false);
  const [onAddNewWord, setOnAddNewWord] = useState(false);

  return (
    <Stack className="text-black" spacing={2}>
      {/* Header */}
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <h1 className="font-bold text-[16px] pl-3">Topic Detail</h1>
        <TextButton icon={<Clear />} width={'35px'} fontSize={23} handleClick={() => setOpenDialog(false)} color="red" />
      </Stack>
      {/* Info */}
      <Stack spacing={1} direction={'column'} boxShadow={2} className=" bg-[#e8e8e8] rounded-xl mt-2 mx-6 py-4 w-[80%] self-center">
        {/* Topic Name */}
        <Stack direction={'row'} spacing={8} alignItems={'center'} className="px-4 " justifyContent={'space-between'}>
          <span className="text-[14px] text-black font-semibold w-[120px]">Topic Name</span>
          <Stack direction={'row'} spacing={2} alignItems="center">
            {isEditTopicName ? (
              <TextFieldInput value={'The road was long and winding.'} setValue={() => {}} roundedWidth={3} height={'30px'} />
            ) : (
              <i className="text-[17px] text-[#151414] ">Animal</i>
            )}
            {isEditTopicName ? (
              <Stack direction={'row'} spacing={1} alignItems={'center'}>
                <TextButton width={'25px'} icon={<Clear />} color="#ff0000" handleClick={() => setIsEditTopicName(false)} />
                <TextButton width={'25px'} icon={<Done />} handleClick={() => setIsEditTopicName(false)} />
              </Stack>
            ) : (
              <TextButton icon={<EditOutlined />} handleClick={() => setIsEditTopicName(true)} />
            )}
          </Stack>
        </Stack>
        {/* Description */}
        <Stack direction={'row'} spacing={8} alignItems={'center'} className="px-4" justifyContent={'space-between'}>
          <span className="text-[14px] text-black font-semibold w-[120px]">Description</span>
          <Stack direction={'row'} spacing={2} alignItems="center">
            {isEditDescription ? (
              <TextFieldInput value={'The road was long and winding.'} setValue={() => {}} roundedWidth={3} height={'30px'} />
            ) : (
              <span className="text-[14px] text-[#737373] text-end">Animal is animal animal animal</span>
            )}
            {isEditDescription ? (
              <Stack direction={'row'} spacing={1} alignItems={'center'}>
                <TextButton width={'25px'} icon={<Clear />} color="#ff0000" handleClick={() => setIsEditDescription(false)} />
                <TextButton width={'25px'} icon={<Done />} handleClick={() => setIsEditDescription(false)} />
              </Stack>
            ) : (
              <TextButton icon={<EditOutlined />} handleClick={() => setIsEditDescription(true)} />
            )}
          </Stack>
        </Stack>
      </Stack>
      <Stack direction={'row'} spacing={2} className="mx-6" justifyContent={'center'}>
        <OutlineButton
          title="Add Word"
          handleClick={() => {
            setOnAddNewWord(true);
          }}
          width={'160px'}
          height={'30px'}
        />
        <OutlineButton title="Delete Topic" handleClick={() => {}} width={'160px'} height={'30px'} bgColor="red" />
      </Stack>
      {/* Add new word */}
      {onAddNewWord && (
        <Stack direction={'row'} spacing={2} alignItems={'center'} justifyContent={'center'} className="p-2 rounded-xl" boxShadow={1}>
          <SelectInput title="New Word" value={[]} onChange={() => {}} width={'50%'} />
          <TextButton width={'25px'} icon={<Clear />} color="#ff0000" handleClick={() => setOnAddNewWord(false)} />
          <TextButton width={'25px'} icon={<Done />} handleClick={() => setOnAddNewWord(false)} />
        </Stack>
      )}
      {/* Word */}
      <Box className="mx-6 shadow-md rounded-2xl">
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
          className="overflow-y-auto h-60"
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
              <Stack direction={'row'} alignItems={'center'} className="hover:bg-gray-100 min-h-16 rounded-md cursor-pointer p-3 relative">
                <Stack flex={1.2} direction={'row'} spacing={1} alignItems={'end'}>
                  <Checkbox checked={false} className="h-6 w-6" />
                  <span>Road</span>
                  <i className="bg-[#e5e2e2] text-[12px] rounded-2xl px-1 size-fit">noun</i>
                </Stack>
                <Stack flex={1} direction={'row'} justifyContent={'space-between'} spacing={2} alignItems={'center'}>
                  <span className="flex-1">Con duong</span>
                  <Stack direction={'row'} spacing={2} className="flex-1" justifyContent={'space-around'} alignItems={'center'}>
                    <span className="">C1</span>
                    <TextButton icon={<DeleteOutlined />} width={'20px'} color="red" />
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
  );
};
