import { useState } from "react";
import { Button, Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

type TextButtonProps = {
    title?: string;
    handleClick?: () => Promise<void> | void;
    icon?: React.ReactNode;
    color?: string;
    width?: string | number;
    disabled?: boolean;
    fontSize? : string | number
};

export const TextButton = ({ title, handleClick, icon, color, width, disabled, fontSize }: TextButtonProps) => {
    const [loading, setLoading] = useState(false);

    const onClick = async () => {
        if (!handleClick) return;

        try {
            setLoading(true);
            await handleClick();
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box width={width || "auto"} display="flex" justifyContent="center" alignItems="center">
            <Button
                variant="text"
                onClick={onClick}
                disabled={loading || disabled}
                startIcon={!loading && icon}
                sx={{
                    textTransform: "none",
                    color: loading ? (color ? color : "rgba(145, 158, 171, 0.32)") : color ? color : "#2962FF",
                    fontWeight: 600,
                    fontSize: fontSize,
                    padding: 0,
                    "& .MuiButton-startIcon": {
                        "& svg": {
                            fontSize: fontSize,
                        },
                    },
                    "&:hover": {
                        backgroundColor: "transparent",
                        color: "#0039cb",
                    },
                }}
            >
                {loading ? <CircularProgress size={24} color="inherit" /> : title}
            </Button>
        </Box>
    );
};
