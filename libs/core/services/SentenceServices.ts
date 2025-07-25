import { WordModel } from "../models";

export const getSentence = async (word: string) => {
    try {
        const response = await fetch("/api/getGroqAI", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: `Write a short, simple English sentence using the word "${word}". Use the base form of the word without any tense changes. Only return the sentence. Replace the word in the sentence with "______".`,
            }),
        });

        if (response.ok) {
            const contentType = response.headers.get("content-type");
            let data;

            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
                return data;
            } else {
                // Nếu response là text thuần
                const textData = await response.text();
                return textData;
            }
        } else {
            console.log("Error fetching sentence:", response.statusText);
        }
    } catch (error) {
        console.error("Error calling API:", error);
    }
};
export const getPassage = async (word: WordModel) => {
    try {
        const response = await fetch("/api/getGroqAI", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: `Write a short English paragraph (about 3 to 4 sentences) using the word: '${word.eng}'. The paragraph should be appropriate for a ${word.level} English learner. Use simple grammar and vocabulary that match this level. Make sure the word '${word.eng}' appears in the paragraph and is used in its base form if possible.`,
            }),
        });

        if (response.ok) {
            const contentType = response.headers.get("content-type");
            let data;

            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
                return data;
            } else {
                // Nếu response là text thuần
                const textData = await response.text();
                return textData;
            }
        } else {
            console.log("Error fetching sentence:", response.statusText);
        }
    } catch (error) {
        console.error("Error calling API:", error);
    }
};
export const getTranslationScore = async (englishText: string, vietnameseText: string) => {
    try {
        const response = await fetch("/api/getGroqAI", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: `Score the quality of the following English-to-Vietnamese translation from 0 to 100, based on accuracy, fluency, and completeness. Only return the number. English: "${englishText}" Vietnamese: "${vietnameseText}" `,
            }),
        });

        if (response.ok) {
            const contentType = response.headers.get("content-type");
            let data;

            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
                return data;
            } else {
                // Nếu response là text thuần
                const textData = await response.text();
                return textData;
            }
        } else {
            console.log("Error fetching sentence:", response.statusText);
        }
    } catch (error) {
        console.error("Error calling API:", error);
    }
};
