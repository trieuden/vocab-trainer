import { CreateTopicWord, TopicWordModel } from '../models/TopicWordModel';
import api from './api';

export const deleteTopicWord = async (topicWordId: string): Promise<void> => {
  try {
    await api.delete(`/topic-words/${topicWordId}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addTopicWord = async (topicWord: CreateTopicWord): Promise<TopicWordModel> => {
  try {
    const res = await api.post(`/topic-words/`, topicWord);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
