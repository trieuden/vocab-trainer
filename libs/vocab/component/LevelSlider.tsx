"use client";
import { Slider, Box, Stack, colors } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { t } from "i18next";

// Custom Slider
const ColoredSlider = styled(Slider)<{ value: number }>(({ theme, value }) => ({
    height: 8,
    padding: "15px 0",

    // Nền (rail)
    "& .MuiSlider-rail": {
        height: 8,
        borderRadius: 4,
        background: `linear-gradient(
        to right,
        #ffcdd2 0%,
        ${value === 100 ? "#e57373" : value > 49 ? "#80bfff" : "#80ffaa"} 50%,
        ${value === 100 ? "#b71c1c" : value > 49 ? "#0073e6" : "#00cc44"} 100%
      )`,
        opacity: 1,
    },

    // Track (vạch được chọn)
    "& .MuiSlider-track": {
        backgroundColor: "transparent",
        color: "transparent",
    },

    // Thumb (nút kéo)
    "& .MuiSlider-thumb": {
        position: "absolute",
        top: "0px",
        height: 24,
        width: 16,
        backgroundColor: theme.palette.primary.main,
        border: "2px solid white",
        borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
        clipPath: "polygon(50% 100%, 0 50%, 100% 50%)",
        "&:focus, &:hover, &.Mui-active": {
            boxShadow: "0 0 0 8px rgba(211, 47, 47, 0.2)",
        },
    },

    // Label (text dưới mốc)
    "& .MuiSlider-markLabel": {
        color: theme.palette.text.primary,
        fontWeight: "bold",
        fontSize: "0.85rem",
        marginTop: 6,
    },
}));

type LevelSliderProps = {
    mark: number | undefined;
    setMark: (value: number) => void;
    marks: { value: number; label: string }[];
    title?: string;
    textColor?: string;
};

export const LevelSlider = ({ mark = 0, setMark, marks, title, textColor }: LevelSliderProps) => {
    const theme = useTheme();

    const handleChange = (event: Event, newValue: number | number[], activeThumb: number) => {
        if (Array.isArray(newValue)) {
            setMark(newValue[0]);
        } else {
            setMark(newValue);
        }
    };

    return (
        <Stack className="mt-4">
            <span className="text-center font-bold" style={{ color: textColor }}>{title}</span>
            <Box sx={{width:'100%', mt: 2 }}>
                <ColoredSlider value={mark} onChange={handleChange} step={null} marks={marks} min={0} max={100} valueLabelDisplay="off" />
            </Box>
        </Stack>
    );
};
