import { WordModel } from "@/core/models/WordModel";
import { LibraryModel } from "@/core/models/LibraryModel";
const defaultImage = "/images/default.png";

export const ReadDefaultFile = async (fileName: string): Promise<WordModel[]> => {
    try {
        
        const res = await fetch(`${window.location.origin}/files/${fileName}`);
        const json = await res.json();

        const mapped: WordModel[] = json.map((item: Partial<WordModel>) => ({
            id: crypto.randomUUID?.() || Math.random().toString(),
            eng: item.eng || "",
            vie: item.vie || "",
            type: item.type || "",
            level: item.level || "",
            complement: item.complement || "",
        }));

        return mapped;
    } catch (error) {
        console.error("Failed to fetch milo.json", error);
        return [];
    }
};


export const GetMiloLibraries = async () => {
    const newLibraries: LibraryModel[] = [];

    for (let index = 0; index < 8; index++) {
        const words = await ReadDefaultFile(`milo${index}.json`);
        if (words.length > 0) {
            const data = {
                id: crypto.randomUUID?.() || Math.random().toString(),
                title: "Milo" + index,
                image: defaultImage,
                wordList: words,
            };
            newLibraries.push(data);
        }
    }

    return newLibraries;
};
export const GetTrieudenLibraries = async () => {
    const newLibraries: LibraryModel[] = [];

    for (let index = 0; index < 1; index++) {
        const words = await ReadDefaultFile(`trieu${index}.json`);
        if (words.length > 0) {
            const data = {
                id: crypto.randomUUID?.() || Math.random().toString(),
                title: "Trieu" + index,
                image: defaultImage,
                wordList: words,
            };
            newLibraries.push(data);
        }
    }

    return newLibraries;
};
