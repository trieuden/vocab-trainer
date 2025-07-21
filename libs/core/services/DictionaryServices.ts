export interface Phonetic {
    text: string;
    audio?: string;
}

export interface Meaning {
    partOfSpeech: string;
    definitions: Array<{
        definition: string;
        example?: string;
        synonyms?: string[];
        antonyms?: string[];
    }>;
}

export interface DictionaryEntry {
    word: string;
    phonetic?: string;
    phonetics: Phonetic[];
    meanings: Meaning[];
    sourceUrls?: string[];
}

const baseUrl = "https://api.dictionaryapi.dev/api/v2/entries/en";

export const getPhoneticsByWord = async (word: string): Promise<Phonetic[]> => {
    try {
        const response = await fetch(`${baseUrl}/${encodeURIComponent(word)}`);

        if (!response.ok) {
            throw new Error(`Dictionary API error: ${response.status}`);
        }

        const data: DictionaryEntry[] = await response.json();

        if (!data || data.length === 0) {
            return [];
        }

        // Extract phonetics from the first entry
        return data[0].phonetics || [];
    } catch (error) {
        console.error("Error fetching phonetics:", error);
        return [];
    }
};

export const getDictionaryEntry = async (word: string): Promise<DictionaryEntry | null> => {
    try {
        const response = await fetch(`${baseUrl}/${encodeURIComponent(word)}`);

        if (!response.ok) {
            throw new Error(`Dictionary API error: ${response.status}`);
        }

        const data: DictionaryEntry[] = await response.json();

        return data && data.length > 0 ? data[0] : null;
    } catch (error) {
        console.error("Error fetching dictionary entry:", error);
        return null;
    }
};


export const getMainPhonetic = async (word: string): Promise<string | null> => {
    try {
        const phonetics = await getPhoneticsByWord(word);

        // Return the first phonetic with text, prioritizing those with audio
        const phoneticWithAudio = phonetics.find((p) => p.text && p.audio);
        if (phoneticWithAudio) {
            return phoneticWithAudio.text;
        }

        const firstPhonetic = phonetics.find((p) => p.text);
        return firstPhonetic?.text || null;
    } catch (error) {
        console.error("Error fetching main phonetic:", error);
        return null;
    }
};
