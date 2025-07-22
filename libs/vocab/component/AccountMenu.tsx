import { CustomSwitch, TextButton } from "@/core/component";
import { Stack, Box, Radio, RadioGroup, Dialog, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import { UserModel } from "@/core/models/UserModel";

import { SunIcon, MoonIcon, VIEIcon, ENGIcon } from "@/core/icons";

type AccountMenuModalProps = {
    isOpenAccMenu: boolean;
    setIsOpenAccMenu: (isOpen: boolean) => void;
    currentUser: UserModel;
    setCurrentUser: (user: UserModel) => void;
};
export const AccountMenu = ({ isOpenAccMenu, setIsOpenAccMenu, setCurrentUser, currentUser }: AccountMenuModalProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [user, setUser] = useState(currentUser?.id);
    const [language, setLanguage] = useState("vie");
    const [darkMode, setDarkMode] = useState(false);

    const handleChooseUser = (user: string) => {
        setUser(user);
        const userModel = {
            id: user,
            name: user,
            avatar: user === "milo" ? "/images/milo.jpg" : user === "trieuden" ? "/images/trieuden.jpg" : "/images/default.png",
        };
        localStorage.removeItem("currentUser");
        localStorage.setItem("currentUser", JSON.stringify(userModel));
        setCurrentUser(userModel);
    };

    return (
        <Dialog
            open={isOpenAccMenu}
            onClose={() => setIsOpenAccMenu(false)}
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
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                    },
                },
            }}
        >
            <Stack direction="column" alignItems="center" spacing={2} className={`overflow-y-auto ${isMobile && "h-[400px]"}`}>
                <span className="text-2xl font-semibold text-[#b3b3ff]">Who Are You</span>
                <RadioGroup className="w-full" value={user}>
                    <Stack direction={"row"} className={`w-full`} spacing={2}>
                        <Stack direction={`${isMobile ? "column" : "row"}`} spacing={2} boxShadow={2} className="bg-[#444] flex-1 cursor-pointer p-2 hover:bg-gray-700 rounded-lg">
                            <Radio value={"milo"} onChange={() => handleChooseUser("milo")} />
                            <Stack direction="column" alignItems="center" spacing={1}>
                                <Box component={"img"} src={"/images/milo.jpg"} className="rounded-full h-[35px] w-[35px] object-cover" />
                                <span className="text-center text-[14px] font-semibold">Super MiLo</span>
                            </Stack>
                        </Stack>
                        <Stack direction={`${isMobile ? "column" : "row"}`} spacing={2} boxShadow={2} className="bg-[#444] flex-1 cursor-pointer p-2 hover:bg-gray-700 rounded-lg">
                            <Radio value={"trieuden"} onChange={() => handleChooseUser("trieuden")} />
                            <Stack direction="column" alignItems="center" spacing={1}>
                                <Box component={"img"} src={"/images/trieuden.jpg"} className="rounded-full h-[35px] w-[35px] object-cover" />
                                <span className="text-center text-[14px] font-semibold">Road to B1</span>
                            </Stack>
                        </Stack>
                        <Stack direction={`${isMobile ? "column" : "row"}`} spacing={2} boxShadow={2} className="bg-[#444] flex-1 cursor-pointer p-2 hover:bg-gray-700 rounded-lg">
                            <Radio value={"guest"} onChange={() => handleChooseUser("guest")} />
                            <Stack direction="column" alignItems="center" spacing={1}>
                                <Box component={"img"} src={"/images/default.png"} className="rounded-full h-[35px] w-[35px] object-cover" />
                                <span className="text-center text-[14px] font-semibold">Khách</span>
                            </Stack>
                        </Stack>
                    </Stack>
                </RadioGroup>
                <Stack className="w-full px-5" mt={2} spacing={2}>
                    <Stack direction="row" spacing={2} className="w-full items-center justify-between border-b border-gray-600 pb-2">
                        <span>Giao diện</span>
                        <CustomSwitch checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} checkedIcon={MoonIcon} unCheckedIcon={SunIcon} />
                    </Stack>
                    <Stack direction="row" spacing={2} className="w-full items-center justify-between border-b border-gray-600 pb-2">
                        <span>Ngôn ngữ</span>
                        <CustomSwitch
                            checked={language === "vie" ? true : false}
                            onChange={(e) => setLanguage(e.target.checked ? "vie" : "eng")}
                            checkedIcon={VIEIcon}
                            unCheckedIcon={ENGIcon}
                            customColor="#0066ff"
                        />
                    </Stack>
                </Stack>
                <Stack mt={2} className="flex items-end w-full">
                    <TextButton title="Thoát" handleClick={() => setIsOpenAccMenu(false)} fontSize={"16px"} color="#999" />
                </Stack>
            </Stack>
        </Dialog>
    );
};
