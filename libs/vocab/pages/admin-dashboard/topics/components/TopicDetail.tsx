import { Stack, Divider, Checkbox, Box, Tooltip } from '@mui/material';
import { Clear, EditOutlined, Done, DeleteOutlined, AddOutlined, AddCircleOutline, AddCircleRounded } from '@mui/icons-material';
import { OutlineButton, SelectInput, TextButton, TextFieldInput } from '@/core/component';
import React, { useEffect, useState } from 'react';
import { TopicModel, UpdateTopic } from '@/core/models/TopicModel';
import { useNotification, useConfirmation } from '@/vocab/providers';
import { useQueryClient } from '@tanstack/react-query';
import { updateTopic, deleteTopic } from '@/core/services/TopicServices';
import { WordModel } from '@/core/models';
import { getAllWords } from '@/core/services/WordServices';
import { deleteTopicWord, addTopicWord } from '@/core/services/TopicWordServices';
import { PaginationFooter } from '@/vocab/component';

type TopicDetailProps = {
  topic: TopicModel;
  setOpenDialog: (open: boolean) => void;
};

export const TopicDetail = ({ topic, setOpenDialog }: TopicDetailProps) => {
  const { setNotification } = useNotification();
  const { setConfirmation } = useConfirmation();
  const queryClient = useQueryClient();

  const [editTopicName, setEditTopicName] = useState(topic.topicName);
  const [editDescription, setEditDescription] = useState(topic.description || '');

  const [allWords, setAllWords] = useState<WordModel[]>([]);
  const [newWordId, setNewWordId] = useState<string>('');

  useEffect(() => {
    const fetchWords = async () => {
      const res = await getAllWords();
      const words = res.filter((w) => !topic.topicWords.find((tw) => tw.word.id === w.id));
      setAllWords(words);
    };
    fetchWords();
  }, [topic]);

  const handleUpdate = async (t: UpdateTopic, title: string) => {
    if (await setConfirmation('Update Topic', title)) {
      if (t) {
        await updateTopic(topic.id, t);
        queryClient.invalidateQueries({ queryKey: ['topics'] });
        setNotification('Update topic successfully', 'success');
      }
    }
  };

  const handleDeleteTopic = async () => {
    if (await setConfirmation('Delete Topic', `Are you sure you want to delete the topic "${topic.topicName}"?`)) {
      await deleteTopic(topic.id);
      setNotification('Delete topic successfully', 'success');
      await queryClient.invalidateQueries({ queryKey: ['topics'] });
      setOpenDialog(false);
    }
  };

  const handleAddWordToTopic = async (wordId: string) => {
    if (wordId) {
      if (await setConfirmation('Add Word', 'Are you sure you want to add this word to the topic?')) {
        await addTopicWord({ topicId: topic.id, wordId });
        setNotification('Add word to topic successfully', 'success');
        await queryClient.invalidateQueries({ queryKey: ['topics'] });
      }
    }
  };

  const handleDeleteWordFromTopic = async (topicWordId: string) => {
    if (await setConfirmation('Delete Word', 'Are you sure you want to remove this word from the topic?')) {
      await deleteTopicWord(topicWordId);
      setNotification('Remove word from topic successfully', 'success');
      await queryClient.invalidateQueries({ queryKey: ['topics'] });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const updatedTopic: UpdateTopic = {
        imageURL: file,
      };
      handleUpdate(updatedTopic, 'Are you sure you want to update the topic image?');
    }
  };

  const [isEditTopicName, setIsEditTopicName] = useState(false);
  const [isEditDescription, setIsEditDescription] = useState(false);
  const [onAddNewWord, setOnAddNewWord] = useState(false);

  return (
    <Stack className="text-black" spacing={2}>
      {/* Header */}
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <h1 className="font-bold text-[16px] pl-3">Topic Detail</h1>
        <TextButton startIcon={<Clear />} width={'35px'} fontSize={23} handleClick={() => setOpenDialog(false)} color="red" />
      </Stack>
      {/* Info */}
      <Stack direction={'row'} flex={1}>
        {/* Avatar */}
        <Stack direction="row" className=" relative items-center">
          <label htmlFor="avatar-upload">
            <Box
              component="img"
              src={topic.imageURL || '/images/default.png'}
              alt="avatar"
              className="rounded-full h-28 w-28 object-cover cursor-pointer hover:opacity-80 transition"
            />
          </label>
          <Box className="absolute top-0 right-0">
            <TextButton
              startIcon={<Clear />}
              width={'8px'}
              color="red"
              fontSize={'16px'}
              handleClick={() => {
                handleUpdate({ isDeleteAvatar: true }, 'Are you sure you want to delete the topic image?');
              }}
            />
          </Box>
          <input id="avatar-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
        </Stack>
        <Stack spacing={1} direction={'column'} boxShadow={2} className="flex-1 bg-[#e8e8e8] rounded-xl mt-2 mx-6 py-4 self-center">
          {/* Topic Name */}
          <Stack direction={'row'} spacing={8} alignItems={'center'} className="px-4 " justifyContent={'space-between'}>
            <span className="text-[14px] text-black font-semibold ">Topic Name</span>
            <Stack direction={'row'} spacing={2} alignItems="center">
              {isEditTopicName ? (
                <TextFieldInput
                  value={editTopicName}
                  setValue={(v) => {
                    setEditTopicName(v.toString());
                  }}
                  roundedWidth={3}
                  height={'30px'}
                />
              ) : (
                <i className="text-[17px] text-[#151414] ">{editTopicName}</i>
              )}
              {isEditTopicName ? (
                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                  <TextButton
                    width={'25px'}
                    startIcon={<Clear />}
                    color="#ff0000"
                    handleClick={() => {
                      setEditTopicName(topic.topicName);
                      setIsEditTopicName(false);
                    }}
                  />
                  <TextButton
                    width={'25px'}
                    startIcon={<Done />}
                    handleClick={() => {
                      handleUpdate({ topicName: editTopicName }, 'Are you sure you want to update the topic name?');
                      setIsEditTopicName(false);
                    }}
                  />
                </Stack>
              ) : (
                <TextButton startIcon={<EditOutlined />} handleClick={() => setIsEditTopicName(true)} />
              )}
            </Stack>
          </Stack>
          {/* Description */}
          <Stack direction={'row'} spacing={8} alignItems={'center'} className="px-4" justifyContent={'space-between'}>
            <span className="text-[14px] text-black font-semibold ">Description</span>
            <Stack direction={'row'} spacing={2} alignItems="center">
              {isEditDescription ? (
                <TextFieldInput
                  value={editDescription}
                  setValue={(v) => {
                    setEditDescription(v.toString());
                  }}
                  roundedWidth={3}
                  height={'30px'}
                />
              ) : (
                <span className="text-[14px] text-[#737373] text-end">{editDescription}</span>
              )}
              {isEditDescription ? (
                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                  <TextButton
                    width={'25px'}
                    startIcon={<Clear />}
                    color="#ff0000"
                    handleClick={() => {
                      setIsEditDescription(false);
                      setEditDescription(topic.description || '');
                    }}
                  />
                  <TextButton
                    width={'25px'}
                    startIcon={<Done />}
                    handleClick={() => {
                      setIsEditDescription(false);
                      handleUpdate({ description: editDescription }, 'Are you sure you want to update the topic description?');
                    }}
                  />
                </Stack>
              ) : (
                <TextButton startIcon={<EditOutlined />} handleClick={() => setIsEditDescription(true)} />
              )}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      {/* Buttons */}
      <Stack direction={'row'} spacing={2} className="mx-6" justifyContent={'center'}>
        <OutlineButton
          title="Add Word"
          handleClick={() => {
            setOnAddNewWord(true);
          }}
          width={'160px'}
          height={'30px'}
        />
        <OutlineButton
          title="Delete Topic"
          handleClick={() => {
            handleDeleteTopic;
          }}
          width={'160px'}
          height={'30px'}
          bgColor="red"
        />
      </Stack>
      {/* Add new word */}
      {onAddNewWord && (
        <Stack direction={'row'} spacing={2} alignItems={'center'} justifyContent={'center'} className="p-2 rounded-xl" boxShadow={1}>
          <SelectInput title="New Word" value={allWords} labelField="english" onSelectId={(v) => setNewWordId(v)} width={'50%'} />
          <TextButton width={'25px'} startIcon={<Clear />} color="#ff0000" handleClick={() => setOnAddNewWord(false)} />
          <TextButton
            width={'25px'}
            startIcon={<Done />}
            handleClick={() => {
              handleAddWordToTopic(newWordId);
            }}
          />
        </Stack>
      )}
      {/* Word */}
      <Box className="mx-6 shadow-md rounded-2xl">
        {/* Header Word table */}
        <Stack direction={'row'} alignItems={'center'} className="bg-gray-200 h-10 px-3 rounded-t-xl font-semibold">
          <Stack flex={2} direction={'row'} spacing={1} alignItems={'center'}>
            <Checkbox checked={false} className="h-6 w-6" />
            <span>Word</span>
          </Stack>
          <span className="flex-2 whitespace-nowrap">Vietnamese</span>
          <span className="flex-1">CEFR</span>
        </Stack>
        {/* Word table */}
        <Stack className="custom-scrollbar h-60">
          {/* Word Map */}
          {topic.topicWords.map((topicWord, i) => (
            <Stack key={topicWord.id}>
              <Stack
                direction={'row'}
                component={'section'}
                spacing={2}
                className="relative hover:bg-gray-100 min-h-16 rounded-md cursor-pointer pl-3 pr-2"
              >
                {/* Word Name */}
                <Stack direction={'row'} spacing={1} alignItems={'center'} flex={2} className="min-w-28">
                  <Checkbox checked={false} className="h-6 w-6" />
                  <span>{topicWord.word.english}</span>
                </Stack>
                {/* Entry map */}
                <Stack direction={'column'} flex={2} className="w-full" justifyContent={'center'}>
                  {topicWord.word.entries?.map((entry) => {
                    return (
                      <Stack spacing={2} key={entry.id} direction={'row'} alignItems={'center'} className=" flex-1">
                        <span>{entry.vietnamese}</span>
                        <i className="bg-[#e5e2e2] text-[12px] px-1 rounded-2xl size-fit">{entry.wordType}</i>
                      </Stack>
                    );
                  })}
                </Stack>
                <Stack direction={'row'} flex={1} justifyContent={'space-between'} alignItems={'center'}>
                  <span className="">{topicWord.word.CEFRLevel}</span>
                  <TextButton
                    startIcon={<DeleteOutlined />}
                    width={'50px'}
                    color="red"
                    handleClick={() => {
                      handleDeleteWordFromTopic(topicWord.id);
                    }}
                  />
                </Stack>
                <span className="absolute top-1 -left-1 text-[9px]">{i}</span>
              </Stack>
              <Divider />
            </Stack>
          ))}
          <PaginationFooter pageSize={5} setPageSize={() => {}} offset={2} setOffset={() => {}} totalItems={topic.topicWords.length} />
        </Stack>
      </Box>
    </Stack>
  );
};
