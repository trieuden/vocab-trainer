import { LibraryModel } from "@/core/models/LibraryModel";
import { Stack, Box, Checkbox } from "@mui/material";

type LibraryProps = {
    library: LibraryModel;
    isChecked: boolean;
    setIsChecked: (id: boolean) => void;
};
export const Library = ({ library, isChecked, setIsChecked }: LibraryProps) => {
    return (
        <Stack direction={"row"} className="items-center gap-2 py-2 cursor-pointer border-b-2 border-[#444]" onClick={() => setIsChecked(!isChecked)}>
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
                onChange={(e) => {
                    setIsChecked(e.target.checked);
                }}
            />
            <Box component={"img"} src={library.image} className="rounded-full h-[32px] w-[32px] object-cover" />
            <span className="font-bold">{library.title}</span>
        </Stack>
    );
};
