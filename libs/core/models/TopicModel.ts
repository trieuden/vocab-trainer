import { TopicStatus } from '../enums/TopicEnum';
import { TopicWordModel } from './TopicWordModel';

export type TopicModel = {
  id: string;
  topicName: string;
  description?: string;
  imageURL?: string;
  status: TopicStatus;
  createdAt: Date;
  topicWords: TopicWordModel[];
};

export type UpdateTopic = {
  topicName?: string;
  description?: string;
  imageURL?: File;
  isDeleteAvatar?: boolean;
};
