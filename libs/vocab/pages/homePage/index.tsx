'use client'
import { useEffect, useRef, useState } from "react";
import { Box, Button, Container, Stack, Typography, TextField, Checkbox, FormControlLabel, Tooltip, IconButton } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

type SpeechRecognition = typeof window.webkitSpeechRecognition;

export const HomePage = () => {
    const [data, setData] = useState<Record<string, string>>({});
    const [keys, setKeys] = useState<string[]>([]);
    const [currentWord, setCurrentWord] = useState("");
    const [answer, setAnswer] = useState("");
    const [resultText, setResultText] = useState("");
    const [correctCount, setCorrectCount] = useState(0);
    const [wrongCount, setWrongCount] = useState(0);
    const [isReverse, setIsReverse] = useState(false);
    const [fileNameDisplay, setFileNameDisplay] = useState("Chưa chọn file");
    const [isRecording, setIsRecording] = useState(false);
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const showVocRef = useRef(false);

    useEffect(() => {
        if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.lang = "vi-VN";
            recognition.continuous = false;
            recognition.interimResults = false;

            recognition.onresult = function (event: any) {
                let transcript = event.results[0][0].transcript;
                transcript = transcript.replace(/\.$/, "");
                setAnswer(transcript);
                stopRecording();
            };

            recognition.onerror = recognition.onend = () => stopRecording();
            recognitionRef.current = recognition;
        }
    }, []);

    const normalize = (text: string) =>
        text
            .replace(/\([^)]*\)/g, "")
            .replace(/\/[^/]*\//g, "")
            .replace(/\s+/g, " ")
            .trim()
            .toLowerCase();

    const pickRandomWord = (dataset = data) => {
        const keysArray = Object.keys(dataset);
        const randomKey = keysArray[Math.floor(Math.random() * keysArray.length)];
        setCurrentWord(randomKey);
        setAnswer("");
        setResultText("");
    };

    const speakWord = () => {
        if (!currentWord) return;
        const textToSpeak = isReverse ? data[currentWord].split("/")[0] : currentWord;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = isReverse ? "vi-VN" : "en-US";
        utterance.rate = 0.8;
        window.speechSynthesis.speak(utterance);
    };

    const checkAnswer = () => {
        const userInput = normalize(answer);
        let correct = false;

        if (isReverse) {
            const correctAns = normalize(currentWord);
            correct = userInput === correctAns;
        } else {
            const correctAns = data[currentWord]
                .toLowerCase()
                .split("/")
                .map((x) => normalize(x));
            correct = correctAns.includes(userInput);
        }

        if (correct) {
            if (!showVocRef.current) setCorrectCount((c) => c + 1);
            showVocRef.current = false;
            pickRandomWord();
        } else {
            setResultText("Sai rồi! Bớt ngu lại con chó.");
        }
    };

    const showResult = () => {
        if (!currentWord) return;
        if (!showVocRef.current) setWrongCount((w) => w + 1);
        showVocRef.current = true;

        if (isReverse) {
            const result = normalize(currentWord);
            setAnswer(result);
            setResultText(`Từ đúng là: "${result}"`);
        } else {
            const result = data[currentWord];
            const meaning = result.split("/")[0];
            setAnswer(meaning);
            setResultText(`Nhớ kĩ cho tao: "${result}"`);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setFileNameDisplay(file.name);

        const reader = new FileReader();
        reader.onload = (event) => {
            const lines = (event.target?.result as string).split("\n");
            const tempData: Record<string, string> = {};
            lines.forEach((line) => {
                const [key, value] = line.split(":");
                if (key && value) tempData[key.trim()] = value.trim();
            });
            setData(tempData);
            setKeys(Object.keys(tempData));
            pickRandomWord(tempData);
        };
        reader.readAsText(file);
    };

    const startRecording = () => {
        setIsRecording(true);
        recognitionRef.current?.start();
    };

    const stopRecording = () => {
        setIsRecording(false);
        recognitionRef.current?.stop();
    };

    const toggleVoiceRecognition = () => {
        if (!recognitionRef.current) {
            alert("Trình duyệt không hỗ trợ nhận diện giọng nói.");
            return;
        }
        isRecording ? stopRecording() : startRecording();
    };

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <Box sx={{ bgcolor: "#333", color: "#fff", p: 3, borderRadius: 2, boxShadow: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="caption">@trieuden</Typography>
                    <Tooltip
                        title={
                            <ul>
                                <li>
                                    <kbd>Ctrl</kbd> để phát âm
                                </li>
                                <li>
                                    <kbd>Shift</kbd> để hiện kết quả
                                </li>
                            </ul>
                        }
                    >
                        <IconButton size="small" sx={{ color: "#fff" }}>
                            <HelpOutlineIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>

                <Typography variant="h4" gutterBottom>
                    {isReverse ? data[currentWord]?.split("/")[0] : currentWord || "..."}
                </Typography>

                <TextField
                    fullWidth
                    placeholder="Nhập nghĩa"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    sx={{ mb: 2, bgcolor: "#fff", borderRadius: 1 }}
                    inputProps={{ style: { color: "#000" } }}
                />

                <Stack spacing={1} mb={2}>
                    <Button variant="contained" onClick={checkAnswer} color="success">
                        Kiểm tra
                    </Button>
                    <Button variant="contained" onClick={showResult} color="info">
                        Hiện kết quả
                    </Button>
                    <Button variant="contained" onClick={speakWord} color="warning">
                        🔊 Phát âm
                    </Button>
                    <Button variant="contained" onClick={toggleVoiceRecognition} color={isRecording ? "error" : "secondary"}>
                        {isRecording ? "🔴 Đang nghe..." : "🎤 Nói"}
                    </Button>
                </Stack>

                <FormControlLabel control={<Checkbox checked={isReverse} onChange={(e) => setIsReverse(e.target.checked)} />} label="Advance" />

                <Typography color="error" fontWeight="bold">
                    {resultText}
                </Typography>
                <Typography mt={2} color="gray">
                    Đúng: <b style={{ color: "lightgreen" }}>{correctCount}</b> | Sai: <b style={{ color: "salmon" }}>{wrongCount}</b>
                </Typography>

                <Box mt={3}>
                    <Button variant="outlined" component="label">
                        Import file
                        <input hidden type="file" accept=".txt" onChange={handleFileUpload} />
                    </Button>
                    <Typography variant="caption" display="block" mt={1}>
                        {fileNameDisplay}
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};
