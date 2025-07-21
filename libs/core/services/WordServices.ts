import { WordModel } from "@/core/models/WordModel";

export const ReadDefaultFile = async (fileName: string): Promise<WordModel[]> => {
    try {
        const res = await fetch(`/files/${fileName}`);
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
