import { WordModel } from "@/core/models/WordModel";
import { LibraryModel } from "@/core/models/LibraryModel";
import Cookies from "js-cookie";
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
        const words = await ReadDefaultFile(`milo/milo${index}.json`);
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

export const GetDefaultLibraries = async () => {
    const langCookie = Cookies.get("lang");
    const lang = langCookie || "vi";
    const newLibraries: LibraryModel[] = [];

    const defaultLibraries = [
        { fileName: "animals.json", image: "https://icon-library.com/images/animal-icon-png/animal-icon-png-22.jpg", title: lang === "en" ? "Animals" : "Động vật" },
        {
            fileName: "businesses.json",
            image: "https://th.bing.com/th/id/R.c9c7da53b77bab6027884736657605ed?rik=0KC3BKVK%2fs8gPQ&pid=ImgRaw&r=0",
            title: lang === "en" ? "Businesses" : "Doanh nghiệp",
        },
        {
            fileName: "economy.json",
            image: "https://cdn2.iconfinder.com/data/icons/investors-skills/504/macroeconomics-global-capital-trade-gross-1024.png",
            title: lang === "en" ? "Economy" : "Kinh tế",
        },
        {
            fileName: "family.json",
            image: "https://tse2.mm.bing.net/th/id/OIP.yyq336ZWcN9cJctcL3U7nAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
            title: lang === "en" ? "Family" : "Gia đình",
        },
        {
            fileName: "schools.json",
            image: "https://th.bing.com/th/id/R.67c9d09384f3a0163f28c6754743dc50?rik=NtSKmzuJ1p0F8A&pid=ImgRaw&r=0",
            title: lang === "en" ? "Schools" : "Trường học",
        },
    ];
    await Promise.allSettled(
        defaultLibraries.map(async (lib) => {
            const words = await ReadDefaultFile(lib.fileName);
            if (words.length > 0) {
                const data: LibraryModel = {
                    id: crypto.randomUUID?.() || Math.random().toString(),
                    title: lib.title,
                    image: lib.image || defaultImage,
                    wordList: words,
                };
                newLibraries.push(data);
            }
        })
    );

    return newLibraries;
};
