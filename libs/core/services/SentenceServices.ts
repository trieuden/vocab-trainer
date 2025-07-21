export const getSentence = async ( word: string) => {
    try {
        const response = await fetch("api/getGroqAI", {
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
                return data
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
