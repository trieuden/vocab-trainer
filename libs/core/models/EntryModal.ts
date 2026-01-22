import { WordType } from '../enums/WordEnum';
import { WordModel } from './WordModel';

export type EntryModel = {
  id: string;
  wordType: WordType;
  vietnamese: string;
  example: string;
  word: WordModel;
};
