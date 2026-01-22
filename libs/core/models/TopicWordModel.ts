import { TopicModel } from './TopicModel';
import { WordModel } from './WordModel';

export type TopicWordModel = {
  id: string;
  word: WordModel;
  topic: TopicModel;
};
export type CreateTopicWord = {
  topicId: string;
  wordId: string;
};
