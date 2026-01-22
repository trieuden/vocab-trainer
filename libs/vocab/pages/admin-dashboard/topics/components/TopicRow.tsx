import { Stack, Dialog, Menu, MenuItem, Checkbox, Divider, Box } from '@mui/material';
import React, { useState } from 'react';
import { MoreVert, DeleteForeverOutlined, AssessmentOutlined } from '@mui/icons-material';
import { TextButton, CustomTextField, CustomDialog, TextFieldInput } from '@/core/component';
import { TopicDetail } from './TopicDetail';
import { TopicModel } from '@/core/models/TopicModel';
import { useNotification, useConfirmation } from '@/vocab/providers';
import { deleteTopic } from '@/core/services/TopicServices';
import { useQueryClient } from '@tanstack/react-query';

type TopicRowProps = {
  topic: TopicModel;
};
export const TopicRow = ({ topic }: TopicRowProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { setNotification } = useNotification();
  const { setConfirmation } = useConfirmation();
  const queryClient = useQueryClient();

  const [openDialog, setOpenDialog] = useState(false);
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteTopic = async () => {
    if (await setConfirmation('Delete Topic', `Are you sure you want to delete the topic "${topic.topicName}"?`)) {
      await deleteTopic(topic.id);
      setNotification('Delete topic successfully', 'success');
      await queryClient.invalidateQueries({ queryKey: ['topics'] });
      handleClose();
    }
  };
  return (
    <Stack direction={'row'} alignItems={'center'} className="p-3 flex-1">
      <Stack flex={1.2} direction={'row'} spacing={1} alignItems={'center'}>
        <Box
          component="img"
          src={topic.imageURL || '/images/default.png'}
          alt="avatar"
          className="rounded-full h-10 w-10 object-cover cursor-pointer hover:opacity-80 transition"
        />
        <span>{topic.topicName}</span>
      </Stack>
      <Stack flex={1} direction={'row'} justifyContent={'space-between'} spacing={2} alignItems={'center'}>
        <span className="flex-1">{topic.description}</span>
        <Stack direction={'row'} spacing={2} className="flex-1" justifyContent={'space-around'} alignItems={'center'}>
          <span className="">{topic.topicWords.length}</span>
          <TextButton startIcon={<MoreVert />} width={'30px'} fontSize={'20px'} color="black" handleClick={handleOpen} />
        </Stack>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              setOpenDialog(true);
            }}
            className="gap-2"
          >
            <AssessmentOutlined sx={{ height: 16, width: 16, color: 'green' }} />
            <span className="font-[550] text-[14px]">Detail</span>
          </MenuItem>

          <MenuItem onClick={handleDeleteTopic} className="gap-2">
            <DeleteForeverOutlined sx={{ height: 16, width: 16, color: 'red' }} />
            <span className="font-[550] text-[14px]">Delete</span>
          </MenuItem>
        </Menu>
      </Stack>
      {/* Dialog */}
      <CustomDialog isOpenModal={openDialog} setIsOpenModal={() => setOpenDialog(false)} maxWidth="md">
        <TopicDetail setOpenDialog={setOpenDialog} topic={topic} />
      </CustomDialog>
    </Stack>
  );
};
