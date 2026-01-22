import { Box, Checkbox, Divider, Stack } from '@mui/material';
import { AddCircleRounded, Clear, Done, DeleteOutlined, SaveOutlined } from '@mui/icons-material';
import { OutlineButton, SelectInput, TextButton, TextFieldInput } from '@/core/component';
import { useEffect, useState } from 'react';
import { WordModel } from '@/core/models';
import { useNotification, useConfirmation } from '@/vocab/providers';
import { useQueryClient } from '@tanstack/react-query';
import { getAllWords } from '@/core/services/WordServices';

export const NewTopic = ({ setOpenDialog }: { setOpenDialog: (isOpen: boolean) => void }) => {
  const { setNotification } = useNotification();
  const { setConfirmation } = useConfirmation();
  const queryClient = useQueryClient();

  const [onAddWordForNewTopic, setOnAddWordForNewTopic] = useState(false);
  const [allWords, setAllWords] = useState<WordModel[]>([]);
  const [wordList, setWordList] = useState<WordModel[]>([]);

  useEffect(() => {
    const fetchWords = async () => {
      const res = await getAllWords();
      setAllWords(res);
    };
    fetchWords();
  }, []);

  const handleAddWordToTopic = async (wordId: string) => {
    if (wordId) {
      const wordToAdd = allWords.find((word) => word.id === wordId);
      if (wordToAdd && !wordList.find((word) => word.id === wordId)) {
        setWordList((prev) => [...prev, wordToAdd]);
      }
    }
  };

  const handleDeleteWordFromTopic = async (topicWordId: string) => {
    setWordList((prev) => prev.filter((word) => word.id !== topicWordId));
  };

  return (
    <Box className="text-black pb-3">
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'start'}>
        <h1 className="font-bold text-[16px] ">New Topic</h1>
        <TextButton startIcon={<Clear />} width={'35px'} fontSize={23} height={'20px'} handleClick={() => setOpenDialog(false)} color="red" />
      </Stack>
      {/* Topic info */}
      <Stack direction={'row'} spacing={3} className="p-3">
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
        {/* Word */}
        <Divider orientation="vertical" flexItem />
        <span className="self-start font-semibold">Word</span>
        <Stack flex={2} spacing={1} direction={'column'} justifyContent={'center'} alignItems={'center'} className="rounded-xl pt-2">
          <Stack direction={'row'} spacing={2} alignItems={'center'} justifyContent={'center'} className="p-2 rounded-xl w-full">
            <SelectInput
              title="New Word"
              value={allWords}
              labelField="english"
              onSelectId={(v) => {
                handleAddWordToTopic(v);
              }}
              width={'50%'}
            />
          </Stack>

          <Box className="rounded-2xl flex-1 w-full p-2 shadow-xl">
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
            <Stack className="custom-scrollbar h-64 ">
              {wordList.map((word, i) => (
                <Stack key={word.id}>
                  <Stack
                    direction={'row'}
                    component={'section'}
                    spacing={2}
                    className="relative hover:bg-gray-100 min-h-16 rounded-md cursor-pointer pl-3 pr-2"
                  >
                    {/* Word Name */}
                    <Stack direction={'row'} spacing={1} alignItems={'center'} flex={2} className="min-w-28">
                      <Checkbox checked={false} className="h-6 w-6" />
                      <span>{word.english}</span>
                    </Stack>
                    {/* Entry map */}
                    <Stack direction={'column'} flex={2} className="w-full" justifyContent={'center'}>
                      {word.entries?.map((entry) => {
                        return (
                          <Stack spacing={2} key={entry.id} direction={'row'} alignItems={'center'} className=" flex-1">
                            <span>{entry.vietnamese}</span>
                            <i className="bg-[#e5e2e2] text-[12px] px-1 rounded-2xl size-fit">{entry.wordType}</i>
                          </Stack>
                        );
                      })}
                    </Stack>
                    <Stack direction={'row'} flex={1} justifyContent={'space-between'} alignItems={'center'}>
                      <span className="">{word.CEFRLevel}</span>
                      <TextButton
                        startIcon={<DeleteOutlined />}
                        width={'50px'}
                        color="red"
                        handleClick={() => {
                          handleDeleteWordFromTopic(word.id);
                        }}
                      />
                    </Stack>
                    <span className="absolute top-1 -left-1 text-[9px]">{i}</span>
                  </Stack>
                  <Divider />
                </Stack>
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
  );
};
