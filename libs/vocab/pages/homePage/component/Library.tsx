import { LibraryModel } from "@/core/models/LibraryModel";
import { Stack, Box, Checkbox } from "@mui/material";
import { TextButton } from "@/core/component";
import { Article } from "@mui/icons-material";
import Cookies from "js-cookie";
import { useTheme } from "@mui/material/styles";

type LibraryProps = {
    library: LibraryModel;
    isChecked: boolean;
    setIsChecked: (checked: boolean) => void;
    handleOpenLibrary: (library: LibraryModel) => void;
};

export const Library = ({ library, isChecked, setIsChecked, handleOpenLibrary }: LibraryProps) => {
    const theme = useTheme();

    const handleChange = (checked: boolean) => {
        setIsChecked(checked);

        const cookieKey = "libraries";
        const current = Cookies.get(cookieKey);
        let list: string[] = [];

        if (current) {
            try {
                list = JSON.parse(current);
            } catch {
                list = [];
            }
        }

        const title = library.title;

        if (checked) {
            if (!list.includes(title)) {
                list.push(title);
            }
        } else {
            list = list.filter((item) => item !== title);
        }

        Cookies.set(cookieKey, JSON.stringify(list));
    };

    return (
        <Stack
            direction={"row"}
            className="justify-between items-center py-2 cursor-pointer border-b-2 border-[#444]"
            sx={{
                bgcolor: theme.palette.background.paper,
                borderColor: theme.palette.divider,
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                    borderColor: "rgba(117, 26, 255, 0.5)",
                },
            }}
        >
            <Stack direction={"row"} className="items-center" spacing={1} onClick={() => handleChange(!isChecked)}>
                <Checkbox
                    sx={{
                        color: "#1a8cff",
                        "&.Mui-checked": {
                            color: "#1a8cff",
                        },
                        "& .MuiSvgIcon-root": {
                            fontSize: 25,
                        },
                    }}
                    checked={isChecked}
                    onChange={(e) => handleChange(e.target.checked)}
                    onClick={(e) => e.stopPropagation()}
                />
                <Box component={"img"} src={library.image} className="rounded-full h-[32px] w-[32px] object-cover" />
                <span className="font-bold" style={{ color: theme.palette.text.primary }}>
                    {library.title}
                </span>
            </Stack>
            <TextButton color={theme.palette.text.secondary} icon={<Article />} handleClick={() => handleOpenLibrary(library)} />
        </Stack>
    );
};
