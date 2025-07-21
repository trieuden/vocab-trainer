import { WordModel } from "./WordModel";

export type LibraryModel = {
    id: string;
    title: string;
    image: string;
    wordList: WordModel[];
};