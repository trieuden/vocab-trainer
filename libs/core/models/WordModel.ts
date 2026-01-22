import { CEFRLevel } from '../enums/WordEnum';
import { EntryModel } from './EntryModal';
import { TopicWordModel } from './TopicWordModel';

export type WordModel = {
  id: string;
  english: string;
  CEFRLevel: CEFRLevel;
  pronunciation_uk: string;
  pronunciation_us: string;
  entries: EntryModel[];
  topicWords?: TopicWordModel[];
};
