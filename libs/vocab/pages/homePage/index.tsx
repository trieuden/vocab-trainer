"use client";
import { useEffect, useState } from "react";
import { Box, Stack, Typography, TextField, Dialog, useMediaQuery, useTheme, Checkbox } from "@mui/material";
import { Check, HighlightOutlined, VolumeUpOutlined, KeyboardVoiceOutlined, FiberManualRecord } from "@mui/icons-material";
import { PrimaryButton, TextButton } from "../../../core/component";
import { LevelSlider } from "../../component/LevelSlider";
import { Library, GuideModal, Header } from "@/vocab/pages";
import { GetMiloLibraries, GetTrieudenLibraries } from "@/core/services/WordServices";
import { getPhoneticsByWord } from "@/core/services/DictionaryServices";
import { getSentence } from "@/core/services/SentenceServices";
import { WordModel } from "@/core/models/WordModel";
import { LibraryModel } from "@/core/models/LibraryModel";
import { UserModel } from "@/core/models/UserModel";
import { useNotification } from "@/vocab/providers/NotificationProvider";

import { useTranslation } from "react-i18next";

type InputModeType = "enToVi" | "viToEn";
type PageStateType = "match" | "synonyms" | "fill" | "translate";
type ModalStateType = "settings" | "library" | "guide";

type HomePageProps = {
    setIsOpenAccMenu: (isOpen: boolean) => void;
    currentUser: UserModel;
};

export const HomePage = ({ setIsOpenAccMenu, currentUser }: HomePageProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const { t } = useTranslation();

    const { setNotification } = useNotification();

    const [libraries, setLibraries] = useState<LibraryModel[]>([]);
    const [checkedLibraries, setCheckedLibraries] = useState<string[]>([]);

    const [currentWord, setCurrentWord] = useState<WordModel>();
    const [currentSentence, setCurrentSentence] = useState<string>("");
    const [currentAudio, setCurrentAudio] = useState<string>();
    const [currentPhonetic, setCurrentPhonetic] = useState<string>("");

    const [wordList, setWordList] = useState<WordModel[]>([]);

    const [answer, setAnswer] = useState("");
    const [resultText, setResultText] = useState("");

    const [wrongState, setWrongState] = useState(false);
    const [showResultState, setShowResultState] = useState(false);

    const [correctCount, setCorrectCount] = useState(0);
    const [wrongCount, setWrongCount] = useState(0);

    const [isListening, setIsListening] = useState(false);

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [modalState, setModalState] = useState<ModalStateType>("guide");
    const [pageState, setPageState] = useState<PageStateType>("translate");

    const [level, setLevel] = useState(100);
    const [onlyThisLevel, setOnlyThisLevel] = useState(false);
    const [reverse, setReverse] = useState(0);
    const [inputMode, setInputMode] = useState<InputModeType>("enToVi");

    const refreshData = () => {
        setCheckedLibraries([]);
        setLibraries([]);
        setWordList([]);
        setCurrentWord(undefined);
        setCurrentSentence("");
        setCurrentAudio("");
        setCurrentPhonetic("");
        setAnswer("");
        setResultText("");
    };

    useEffect(() => {
        refreshData();
        const fetchData = async () => {
            if (currentUser.id === "guest") {
                const milo = await GetMiloLibraries();
                const trieu = await GetTrieudenLibraries();
                const res = [...milo, ...trieu];
                setLibraries(res);
            }
            if (currentUser.id === "milo") {
                const res = await GetMiloLibraries();
                setLibraries(res);
            }
            if (currentUser.id === "trieuden") {
                const res = await GetTrieudenLibraries();
                setLibraries(res);
            }
        };
        fetchData();
    }, [currentUser]);

    useEffect(() => {
        setCurrentWord(undefined);
        setCurrentSentence("");
        setCurrentAudio("");
        setCurrentPhonetic("");
        setAnswer("");
        if (libraries.length === 0) return;
        const newWords: WordModel[] = [];

        checkedLibraries.forEach((libraryId) => {
            const library = libraries.find((lib) => lib.id === libraryId);
            if (library) {
                newWords.push(
                    ...library.wordList.filter((word) => {
                        switch (level) {
                            case 0:
                                return word.level === "A";
                            case 25:
                                return onlyThisLevel ? word.level === "B1" : word.level === "B1" || word.level === "A";
                            case 50:
                                return onlyThisLevel ? word.level === "B2" : word.level === "B2" || word.level === "B1" || word.level === "A";
                            case 75:
                                return onlyThisLevel ? word.level === "C1" : word.level === "C1" || word.level === "B2" || word.level === "B1" || word.level === "A";
                            case 100:
                                return onlyThisLevel ? word.level === "C2" : word.level === "C2" || word.level === "C1" || word.level === "B2" || word.level === "B1" || word.level === "A";
                        }
                    })
                );
            }
        });
        // Shuffle bằng Fisher–Yates
        for (let i = newWords.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newWords[i], newWords[j]] = [newWords[j], newWords[i]];
        }
        setWordList(newWords);
        setCurrentWord(newWords[0]);
    }, [checkedLibraries, level, onlyThisLevel, libraries]);

    useEffect(() => {
        if (!currentWord) return;

        switch (reverse) {
            case 0:
                setInputMode("enToVi");
                break;
            case 50:
                setInputMode("viToEn");
                break;
            case 100:
                setInputMode(Math.random() < 0.5 ? "enToVi" : "viToEn");
                break;
            default:
                break;
        }

        const fetchPhonetics = async () => {
            if (inputMode === "enToVi") {
                const phonetics = await getPhoneticsByWord(currentWord.eng);
                setCurrentAudio(phonetics[0]?.audio || "");
                setCurrentPhonetic(phonetics[0]?.text || "");
            }

            if (pageState === "fill") {
                const sentence = await getSentence(currentWord.eng);
                setCurrentSentence(sentence);
            }
        };

        fetchPhonetics();
    }, [pageState, reverse, currentWord]);

    // ...existing code...

    useEffect(() => {
        if (!isMobile) {
            const handleKeyDown = (event: KeyboardEvent) => {
                // Ctrl: Đọc (phát âm)
                if (event.ctrlKey && !event.shiftKey && event.key !== "Enter") {
                    event.preventDefault();
                    handleSpeak();
                }

                // Shift: Hiện kết quả
                else if (event.shiftKey && !event.ctrlKey && event.key !== "Enter") {
                    event.preventDefault();
                    handleShowResult();
                }

                // Enter: Kiểm tra đáp án
                else if (event.key === "Enter" && !event.ctrlKey && !event.shiftKey) {
                    event.preventDefault();
                    handleCheckAnswer();
                }
            };

            // Thêm event listener
            document.addEventListener("keydown", handleKeyDown);
        }
    }, [currentWord]);

    // ...existing code...

    const handleCheckAnswer = () => {
        if (!currentWord) return;
        let answerToCheck = "";
        switch (pageState) {
            case "fill":
                answerToCheck = currentWord.eng;
                break;
            case "translate":
                if (inputMode === "enToVi") {
                    answerToCheck = currentWord.vie;
                }
                if (inputMode === "viToEn") {
                    answerToCheck = currentWord.eng;
                }
                break;
            default:
                break;
        }
        const normalizedAnswerToCheck = answerToCheck.trim().toLocaleLowerCase();
        const meanings = answer.split("/").map((part) => part.trim().toLocaleLowerCase());

        const isCorrect = meanings.filter((part) => part === normalizedAnswerToCheck);
        if (isCorrect) {
            const nextIndex = wordList.indexOf(currentWord) + 1;
            if (nextIndex < wordList.length) {
                setCurrentWord(wordList[nextIndex]);
            } else {
                setCurrentWord(wordList[0]);
            }

            if (!showResultState) {
                setCorrectCount(correctCount + 1);
            }
            setAnswer("");
            setShowResultState(false);
            setResultText(``);
        } else {
            setResultText(`Sai rồi cưng ơi, cưng còn non lắm`);
            setWrongState(true);
        }
    };

    const handleShowResult = () => {
        if (!currentWord) return;
        switch (pageState) {
            case "fill":
                setAnswer(currentWord.eng);
                break;
            case "translate":
                if (inputMode === "enToVi") {
                    const meanings = currentWord.vie.split("/")[0];
                    setAnswer(meanings);
                    setResultText(currentWord.vie);
                }
                if (inputMode === "viToEn") {
                    setAnswer(currentWord.eng);
                    setResultText("Nhớ kĩ cho tao: " + currentWord.eng);
                }
                break;
            default:
                break;
        }
        if (!showResultState) {
            setWrongCount(wrongCount + 1);
            setShowResultState(true);
        }
    };

    const handleSpeak = async () => {
        if (!currentWord) return;

        // Ưu tiên audio gốc
        if (currentAudio) {
            const audio = new Audio(currentAudio);
            audio.play();
        } else {
            if ("speechSynthesis" in window) {
                speechSynthesis.cancel();

                const utterance = new SpeechSynthesisUtterance(currentWord.eng);
                utterance.lang = "en-US";
                utterance.rate = 0.8;
                utterance.pitch = 1;
                utterance.volume = 1;

                // Tìm giọng tiếng Anh tốt nhất
                const voices = speechSynthesis.getVoices();
                const englishVoice = voices.find((voice) => voice.lang.startsWith("en") && voice.name.includes("Female")) || voices.find((voice) => voice.lang.startsWith("en"));

                if (englishVoice) {
                    utterance.voice = englishVoice;
                }

                speechSynthesis.speak(utterance);
            } else {
                setNotification("Không hỗ trợ phát âm trên trình duyệt này", "error");
            }
        }
    };

    const handleSpeechRecognition = () => {
        if (isListening) {
            setIsListening(false);
            return;
        }
        if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
            return;
        }

        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.lang = "vi-VN";
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event: any) => {
            let transcript = event.results[0][0].transcript;
            transcript = transcript.replace(/\.$/, "");
            setAnswer(transcript);
            setIsListening(false);
        };

        recognition.onerror = () => {
            setIsListening(false);
        };

        recognition.start();
    };

    const Setting = () => {
        return (
            <>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <h1 className="text-xl font-bold">{t("advanced_customization")}</h1>
                </Stack>
                {pageState === "translate" && (
                    <Stack className="mt-6 px-10 bg-[#444] rounded-2xl shadow-lg">
                        <LevelSlider
                            mark={reverse}
                            setMark={setReverse}
                            marks={[
                                { value: 0, label: "Tiếng Anh" },
                                { value: 50, label: "Tiếng Việt" },
                                { value: 100, label: "Ngẫu nhiên" },
                            ]}
                            title="Đảo chiều"
                            textColor="#0073e6"
                        />
                    </Stack>
                )}
                <Stack className="mt-6 px-10 bg-[#444] rounded-2xl shadow-lg">
                    <LevelSlider
                        mark={level}
                        setMark={setLevel}
                        marks={[
                            { value: 0, label: "A" },
                            { value: 25, label: "B1" },
                            { value: 50, label: "B2" },
                            { value: 75, label: "C1" },
                            { value: 100, label: "C2" },
                        ]}
                        title="Cấp độ từ vựng"
                        textColor="#ff9800"
                    />
                    <Stack direction="row" className="items-center justify-center">
                        <Checkbox
                            sx={{
                                color: "#1a8cff",
                                "&.Mui-checked": {
                                    color: "#1a8cff",
                                },
                                "& .MuiSvgIcon-root": {
                                    fontSize: 22,
                                },
                            }}
                            size="small"
                            checked={onlyThisLevel}
                            onChange={(e) => {
                                setOnlyThisLevel(e.target.checked);
                            }}
                        />
                        <span className="text-sm text-gray-400">Chỉ học cấp độ này</span>
                    </Stack>
                </Stack>
            </>
        );
    };

    const Libraries = () => {
        return (
            <>
                <Stack direction="row" spacing={2} alignItems="center">
                    <h1 className="text-xl font-bold">Thư viện</h1>
                </Stack>
                <Stack
                    mt={2}
                    spacing={1.5}
                    className={`overflow-y-auto ${isMobile ? "h-[300px]" : "h-[calc(100vh-90px)]"}`}
                    sx={{
                        scrollBehavior: "smooth",
                        "&::-webkit-scrollbar": {
                            width: "4px",
                        },
                        "&::-webkit-scrollbar-track": {
                            backgroundColor: "#f1f1f1",
                            borderRadius: "10px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "#888",
                            borderRadius: "10px",
                        },
                    }}
                >
                    {libraries.map((library, index) => (
                        <Library
                            key={index}
                            library={library}
                            isChecked={checkedLibraries.includes(library.id)}
                            setIsChecked={(checked) => {
                                if (checked) {
                                    setCheckedLibraries([...checkedLibraries, library.id]);
                                } else {
                                    setCheckedLibraries(checkedLibraries.filter((id) => id !== library.id));
                                }
                            }}
                        />
                    ))}
                </Stack>
            </>
        );
    };

    return (
        <Box className="h-100vh shadow-2xl p-1 text-white bg-[#000]">
            {/* Header */}
            <Header setIsOpenModal={setIsOpenModal} setModalState={setModalState} currentUser={currentUser} setIsOpenAccMenu={setIsOpenAccMenu} setPageState={setPageState} pageState={pageState} />

            <Stack direction={"row"} className="justify-between items-center p-2 mt-1" spacing={2} sx={{ height: "calc(100vh - 89px)" }}>
                {/* Settings Sidebar - Hidden on mobile */}
                {!isMobile && (
                    <Stack flex={1} className={`bg-[#333] p-4 rounded-3xl h-full`}>
                        <Setting />
                    </Stack>
                )}

                {/* Main Content */}
                <Stack spacing={2} flex={isMobile ? 1 : 2} className={`bg-[#333] p-4 rounded-3xl h-full items-center`}>
                    <span className="text-xl font-bold ">
                        {(() => {
                            switch (pageState) {
                                case "match":
                                    return "Nối từ";
                                case "fill":
                                    return "Điền khuyết";
                                case "synonyms":
                                    return "Từ đồng nghĩa";
                                case "translate":
                                    return "Nhập nghĩa";
                                default:
                                    return "";
                            }
                        })()}
                    </span>
                    <Stack alignItems={"center"} justifyContent={"center"} className="bg-[#444] w-full text-center min-h-[120px] py-4 rounded-3xl">
                        <span className={`${isMobile ? "text-2xl" : "text-3xl"} font-bold text-[#9999e6] `}>
                            {pageState === "fill" ? currentSentence : inputMode === "enToVi" ? currentWord?.eng : currentWord?.vie}
                        </span>
                        <i>{pageState === "translate" && currentWord?.type}</i>
                        <span>{pageState === "translate" && currentPhonetic}</span>
                    </Stack>
                    <Box>
                        <TextField
                            fullWidth
                            placeholder="..."
                            value={answer}
                            onChange={(e) => {
                                setAnswer(e.target.value);
                                setWrongState(false);
                                setResultText("");
                            }}
                            variant="standard"
                            sx={{
                                input: {
                                    color: "#fff",
                                    textAlign: "center",
                                    fontSize: isMobile ? "20px" : "28px",
                                },
                                mb: 2,
                                width: "auto",
                                ml: 4,
                            }}
                        />
                        <HighlightOutlined className={`transform rotate-[-135deg] rounded-full animate-bounce  ${wrongState === true ? "text-red-500" : "text-yellow-500"}`} />
                    </Box>
                    <Stack spacing={2} className={`${isMobile ? "px-4" : "px-16"} w-full flex`} direction={"column"}>
                        <Stack direction={isMobile ? "column" : "row"} spacing={2} alignItems="center" className="flex w-full">
                            <PrimaryButton width={isMobile ? "100%" : "60%"} title="Kiểm tra" handleClick={handleCheckAnswer} bgColor="success" icon={<Check />} />
                            <PrimaryButton width={isMobile ? "100%" : "40%"} title="Hiện kết quả" handleClick={handleShowResult} bgColor="#33cc33" />
                        </Stack>
                        <Stack direction={isMobile ? "column" : "row"} spacing={2} justifyContent="center" alignItems="center" width={"100%"}>
                            <PrimaryButton width={isMobile ? "100%" : "40%"} title="Phát âm" handleClick={handleSpeak} icon={<VolumeUpOutlined />} bgColor="#ffb31a" />
                            <PrimaryButton
                                width={isMobile ? "100%" : "60%"}
                                title={`${isListening ? "Đang lắng nghe" : "Nói"}`}
                                handleClick={handleSpeechRecognition}
                                icon={isListening ? <FiberManualRecord sx={{ color: "#800000" }} /> : <KeyboardVoiceOutlined />}
                                bgColor="#ff1a1a"
                                isTransform
                            />
                        </Stack>
                    </Stack>

                    <Typography color="error" fontWeight="bold">
                        {resultText}
                    </Typography>
                    <Typography mt={2} color="gray">
                        Đúng: <b style={{ color: "lightgreen" }}>{correctCount}</b> | Sai: <b style={{ color: "salmon" }}>{wrongCount}</b>
                    </Typography>

                    {isMobile && (
                        <Stack className="flex-1" direction={"row"} width={"100%"} justifyContent="end" spacing={2}>
                            <Stack width={"100%"} justifyContent={"end"} spacing={2}>
                                <TextButton title="Nối từ" color={pageState === "match" ? "#0000ff" : "#ccc"} />
                                <TextButton
                                    title="Nhập nghĩa"
                                    handleClick={() => {
                                        setPageState("translate");
                                    }}
                                    color={pageState === "translate" ? "#0000ff" : "#ccc"}
                                />
                            </Stack>
                            <Stack width={"100%"} justifyContent={"end"} spacing={2}>
                                <TextButton
                                    title="Điền khuyết"
                                    handleClick={() => {
                                        setPageState("fill");
                                    }}
                                    color={pageState === "fill" ? "#0000ff" : "#ccc"}
                                />
                                <TextButton title="Từ đồng nghĩa" color={pageState === "synonyms" ? "#0000ff" : "#ccc"} />
                            </Stack>
                        </Stack>
                    )}
                </Stack>

                {/* Library Sidebar - Hidden on mobile */}
                {!isMobile && (
                    <Stack flex={1} className="bg-[#333] p-4 rounded-3xl h-full">
                        <Libraries />
                    </Stack>
                )}
            </Stack>

            <Dialog
                open={isOpenModal}
                onClose={() => setIsOpenModal(false)}
                maxWidth="sm"
                fullWidth
                slotProps={{
                    paper: {
                        sx: {
                            bgcolor: "#333",
                            color: "white",
                            borderRadius: "16px",
                            padding: "16px",
                            boxShadow: "0px 4px 2px rgba(0, 0, 0, 0.2)",
                        },
                    },
                    backdrop: {
                        sx: {
                            backgroundColor: "rgba(0, 0, 0, 0.8)", // Đậm hơn mặc định
                        },
                    },
                }}
            >
                {modalState === "settings" && <Setting />}
                {modalState === "library" && <Libraries />}
                {modalState === "guide" && <GuideModal />}
            </Dialog>
        </Box>
    );
};
