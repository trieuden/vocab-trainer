'use-client';
import React, { useEffect, useState } from 'react';
import { Stack, Divider, Checkbox, Box } from '@mui/material';
import { AddCircleRounded, Clear, Done, DeleteOutlined, SaveOutlined } from '@mui/icons-material';
import { TextButton, OutlineButton, CustomDialog, TextFieldInput, SelectInput } from '@/core/component';
import { TopicRow } from './components/TopicRow';
import { TopicModel } from '@/core/models/TopicModel';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllTopics } from '@/core/services/TopicServices';
import { NewTopic } from './components/NewTopic';
import { PaginationFooter } from '@/vocab/component';

export const TopicsManagement = () => {
  const queryClient = useQueryClient();

  const [openDialog, setOpenDialog] = useState(false);

  const [topics, setTopics] = useState<TopicModel[]>([]);

  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);

  const { data: fetchTopics = [], isLoading: isLoadingTopics } = useQuery({
    queryKey: ['topics'],
    queryFn: async () => getAllTopics(),
    placeholderData: (previousData) => previousData,
  });

  useEffect(() => {
    if (fetchTopics) {
      const data = fetchTopics.slice(currentPage * pageSize, currentPage * pageSize + pageSize);
      setTopics(data);
    }
  }, [fetchTopics]);

  useEffect(() => {
    const data = fetchTopics.slice(currentPage * pageSize, currentPage * pageSize + pageSize);
    setTopics(data);
  }, [pageSize, currentPage]);

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
            <Checkbox checked={false} />
            <Stack flex={1.2} direction={'row'} alignItems={'center'}>
              <span>Name</span>
            </Stack>
            <Stack flex={1} direction={'row'} justifyContent={'space-between'} spacing={2}>
              <span className="flex-1 whitespace-nowrap">Description</span>
              <span className="flex-1">Word Quantity</span>
            </Stack>
          </Stack>

          {isLoadingTopics ? (
            <Box className="p-3">Loading...</Box>
          ) : (
            topics.map((topic: TopicModel, i) => (
              <Box key={topic.id} className="hover:bg-gray-100 relative">
                <Stack direction={'row'} alignItems={'center'} className="px-3">
                  <Checkbox checked={false} />
                  <TopicRow topic={topic} />
                </Stack>
                {i < topics.length - 1 && <Divider />}
              </Box>
            ))
          )}
          <PaginationFooter
            pageSize={pageSize}
            setPageSize={setPageSize}
            offset={currentPage}
            setOffset={setCurrentPage}
            totalItems={fetchTopics.length}
          />
        </Stack>
      </Stack>
      {/* New Topic form */}
      <CustomDialog isOpenModal={openDialog} setIsOpenModal={() => setOpenDialog(false)} maxWidth="md">
        <NewTopic setOpenDialog={setOpenDialog} />
      </CustomDialog>
    </Stack>
  );
};
