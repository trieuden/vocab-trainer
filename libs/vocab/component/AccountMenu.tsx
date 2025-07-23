"use client";
import React, { useEffect, useState } from "react";
import { CustomSwitch, TextButton } from "@/core/component";
import { Stack, Box, Radio, RadioGroup, Dialog, useMediaQuery, useTheme } from "@mui/material";
import { UserModel } from "@/core/models/UserModel";
import { SunIcon, MoonIcon, VIEIcon, ENGIcon } from "@/core/icons";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";

type AccountMenuModalProps = {
    isOpenAccMenu: boolean;
    setIsOpenAccMenu: (isOpen: boolean) => void;
    currentUser: UserModel;
    setCurrentUser: (user: UserModel) => void;
};

export const AccountMenu = ({ isOpenAccMenu, setIsOpenAccMenu, setCurrentUser, currentUser }: AccountMenuModalProps) => {
    const theme = useTheme();
    const { t } = useTranslation();

    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [user, setUser] = useState(currentUser?.id);
    const [language, setLanguage] = useState("vi");
    const [darkMode, setDarkMode] = useState(true);

    const handleChooseUser = (user: string) => {
        setUser(user);
        const userModel: UserModel = {
            id: user,
            name: user,
            avatar: user === "milo" ? "/images/milo.jpg" : user === "trieuden" ? "/images/trieuden.jpg" : "/images/default.png",
        };
        Cookies.set("currentUser", JSON.stringify(userModel));
        setCurrentUser(userModel);
    };

    useEffect(() => {
        const langCookie = Cookies.get("lang");
        const lang = langCookie || "vi";
        setLanguage(lang);

        const darkModeCookie = Cookies.get("darkMode");
        if(darkModeCookie) {
            setDarkMode(darkModeCookie === "en" ? false : true);
        }
    }, []);

    return (
        <Dialog
            open={isOpenAccMenu}
            onClose={() => setIsOpenAccMenu(false)}
            maxWidth="sm"
            fullWidth
            slotProps={{
                paper: {
                    sx: {
                        bgcolor: theme.palette.background.default,
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
                <span className="text-2xl font-semibold text-[#6666ff]">{t("who_are_you")}</span>
                <RadioGroup className="w-full" value={user}>
                    <Stack direction={"row"} className={`w-full`} spacing={2}>
                        {[
                            { id: "milo", name: "Super MiLo", avatar: "/images/milo.jpg" },
                            { id: "trieuden", name: "Road to B1", avatar: "/images/trieuden.jpg" },
                            { id: "guest", name: "Khách", avatar: "/images/default.png" },
                        ].map((u) => (
                            <Stack
                                key={u.id}
                                direction={`${isMobile ? "column" : "row"}`}
                                spacing={2}
                                boxShadow={2}
                                className="flex-1 cursor-pointer p-2 hover:bg-gray-700 rounded-lg"
                                sx={{ bgcolor: theme.palette.background.paper, color: theme.palette.text.primary }}
                                onClick={() => handleChooseUser(u.id)}
                            >
                                <Radio value={u.id} onChange={() => handleChooseUser(u.id)} />
                                <Stack direction="column" alignItems="center" spacing={1}>
                                    <Box component={"img"} src={u.avatar} className="rounded-full h-[35px] w-[35px] object-cover" />
                                    <span className="text-center text-[14px] font-semibold">{u.name}</span>
                                </Stack>
                            </Stack>
                        ))}
                    </Stack>
                </RadioGroup>

                <Stack className="w-full px-5" mt={2} spacing={2}>
                    <Stack direction="row" spacing={2} className="w-full items-center justify-between border-b border-gray-600 pb-2" sx={{ color: theme.palette.text.primary }}>
                        <span>{t("interface")}</span>
                        <CustomSwitch
                            checked={darkMode}
                            onChange={(e) => {
                                const newMode = e.target.checked;
                                setDarkMode(newMode);
                                Cookies.set("darkMode", String(newMode));
                                window.location.reload(); // để load lại theme
                            }}
                            checkedIcon={SunIcon}
                            unCheckedIcon={MoonIcon}
                        />
                    </Stack>
                    <Stack direction="row" spacing={2} className="w-full items-center justify-between border-b border-gray-600 pb-2" sx={{ color: theme.palette.text.primary }}>
                        <span>{t("language")}</span>
                        <CustomSwitch
                            checked={language === "vi"}
                            onChange={(e) => {
                                const lang = e.target.checked ? "vi" : "en";
                                setLanguage(lang);
                                Cookies.set("lang", lang, { expires: 7 });
                                window.location.reload(); // để load lại i18n
                            }}
                            checkedIcon={VIEIcon}
                            unCheckedIcon={ENGIcon}
                            customColor="#0066ff"
                        />
                    </Stack>
                </Stack>
            </Stack>
            <Stack mt={2} className="flex items-end w-full">
                <TextButton title={t("exit")} handleClick={() => setIsOpenAccMenu(false)} fontSize={"16px"} color="#999" />
            </Stack>
        </Dialog>
    );
};
