import React from "react";
import { Stack, useMediaQuery } from "@mui/material";
import { LibraryModel, WordModel } from "@/core/models";
import { useTheme } from "@mui/material/styles";
import Cookies from "js-cookie";
import { WordLine } from "@/vocab/component/WordLine";

type WordListProps = {
    library?: LibraryModel;
};

export const WordList = ({ library }: WordListProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const isDarkMode = Cookies.get("darkMode") === "dark";
    return (
        <>
            <Stack direction="row" spacing={2} alignItems="center">
                <h1 className="text-xl font-bold text-[#6666ff]">{library?.title}</h1>
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
                        backgroundColor: isDarkMode ? "#333" : "#f1f1f1",
                        borderRadius: "10px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: isDarkMode ? "#f1f1f1" : "#b3b3b3",
                        borderRadius: "10px",
                    },
                }}
            >
                {library?.wordList.map((word, index) => (
                    <WordLine key={index} word={word} />
                ))}
            </Stack>
        </>
    );
};
