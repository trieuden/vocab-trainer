import { TopicModel, UpdateTopic } from '../models/TopicModel';
import api from './api';

export const getAllTopics = async (): Promise<TopicModel[]> => {
  try {
    const res = await api.get<TopicModel[]>(`/topics`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteTopic = async (topicId: string): Promise<void> => {
  try {
    await api.delete(`/topics/${topicId}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateTopic = async (id: string, topic: UpdateTopic): Promise<TopicModel> => {
  try {
    const res = await api.patch<TopicModel>(`/topics/${id}`, topic, { headers: { 'Content-Type': 'multipart/form-data' } });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
