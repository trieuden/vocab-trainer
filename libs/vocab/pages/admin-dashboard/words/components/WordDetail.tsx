import { Divider, Stack } from '@mui/material';
import { Clear, EditOutlined, Done, DeleteOutline, AddOutlined } from '@mui/icons-material';
import { CustomDialog, OutlineButton, SelectInput, TextButton, TextFieldInput, PrimaryButton } from '@/core/component';
import { useState } from 'react';

type WordDetailProps = {
  setIsOpenModal: (value: boolean) => void;
};

export const WordDetail = ({ setIsOpenModal }: WordDetailProps) => {
  const [isEditExample, setIsEditExample] = useState(false);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  return (
    <Stack spacing={3} className="text-black">
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <h1 className="font-bold text-[18px] pl-3">Word Detail</h1>
        <TextButton startIcon={<Clear />} width={'35px'} fontSize={23} handleClick={() => setIsOpenModal(false)} />
      </Stack>
      <Stack spacing={4} direction={'row'} className="px-5">
        <Stack spacing={1} className="items-center">
          <span className="text-[28px] bg-[#d9d9d9] px-2 rounded-2xl flex-wrap">Road</span>
          <span className="border-[#39e600] border-2 rounded-3xl px-2 font-semibold text-[15px]">B1</span>
          <Stack className="items-center">
            <span className="text-[13px]">/rəʊd/</span>
            <span className="text-[13px]">/roʊd/</span>
          </Stack>
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack className="flex-1" spacing={3}>
          <Stack direction={'row'} className=" relative">
            <Stack className="flex-1 items-start">
              <span className="border-1 flex rounded-md px-2">Noun</span>
            </Stack>
            <Stack className="flex-3">
              <span>Con đường</span>
              <Stack direction={'row'} spacing={1} alignItems="center">
                {isEditExample ? (
                  <TextFieldInput value={'The road was long and winding.'} setValue={() => {}} roundedWidth={3} />
                ) : (
                  <i className="text-[15px] text-[#a6a6a6]">The road was long and winding.</i>
                )}
                {isEditExample ? (
                  <Stack direction={'row'} spacing={1} alignItems={'center'}>
                    <TextButton width={'25px'} startIcon={<Clear />} color="#ff0000" handleClick={() => setIsEditExample(false)} />
                    <TextButton width={'25px'} startIcon={<Done />} handleClick={() => setIsEditExample(false)} />
                  </Stack>
                ) : (
                  <TextButton startIcon={<EditOutlined />} handleClick={() => setIsEditExample(true)} />
                )}
              </Stack>
            </Stack>
            <Stack className="absolute top-0 right-0">
              <TextButton startIcon={<DeleteOutline />} width={'10px'} fontSize={'20px'} color="red" />
            </Stack>
          </Stack>
          <Stack className="flex-1" alignItems={'center'}>
            <OutlineButton title="" icon={<AddOutlined />} handleClick={() => setIsOpenAddModal(true)} width={'60%'} height={'30px'} />
          </Stack>
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack spacing={2} alignItems={'center'}>
          <Stack className="relative">
            <Stack className="absolute bottom-2 -right-2">
              <TextButton startIcon={<Clear />} width={'10px'} fontSize={'15px'} color="red" />
            </Stack>
            <span className="bg-[#d9d9d9] px-2 rounded-2xl flex-wrap">Travel</span>
          </Stack>
        </Stack>
      </Stack>
      <CustomDialog isOpenModal={isOpenAddModal} setIsOpenModal={setIsOpenAddModal}>
        <Stack spacing={2} className="text-black">
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
    </Stack>
  );
};
