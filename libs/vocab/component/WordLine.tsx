import React from "react";
import { Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { WordModel } from "@/core/models";

type WordLineProps = {
    word: WordModel;
};
export const WordLine = ({ word }: WordLineProps) => {
    const theme = useTheme();

    return (
        <Stack
            direction={"row"}
            className="justify-between items-center py-2 cursor-pointer border-b-2 border-[#444]"
            sx={{ borderBottomColor: theme.palette.divider, borderColor: theme.palette.divider }}
        >
            <Stack direction={"row"} className="items-end justify-between w-full px-4">
                <Stack direction={"row"} className="items-end" spacing={0.5}>
                    <Typography fontSize={"18px"} sx={{ color: theme.palette.text.primary }}>
                        {word.eng}{" "}
                    </Typography>
                    <i className="text-[13px]" style={{ color: theme.palette.text.secondary }}>
                        {"(" + word.type + ")"}
                    </i>
                </Stack>
                <Typography fontSize={"16px"} sx={{ color: theme.palette.text.primary}}>
                    {word.vie}
                </Typography>
            </Stack>
        </Stack>
    );
};
