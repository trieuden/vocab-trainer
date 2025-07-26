import React from "react";
import { Stack, IconButton, Box, useMediaQuery, useTheme, Typography } from "@mui/material";
import { Settings, LibraryBooks } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

type ModalStateType = "settings" | "library" | "guide";
type PageStateType = "translate_passage" | "synonyms" | "fill" | "translate";

type HeaderProps = {
    setIsOpenModal: (isOpen: boolean) => void;
    setModalState: (state: ModalStateType) => void;
    currentUser: { avatar: string } | null;
    setIsOpenAccMenu: (isOpen: boolean) => void;
    setPageState: (state: PageStateType) => void;
    pageState: PageStateType;
};

export const Header = ({ setIsOpenModal, setIsOpenAccMenu, currentUser, setModalState, setPageState, pageState }: HeaderProps) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <Stack className="w-full fixed p-3 z-10">
            <Stack className="p-3 justify-between items-center rounded-4xl " sx={{ bgcolor: theme.palette.background.paper }} direction={"row"}>
                <Stack direction="row" alignItems={"center"} spacing={1} borderRadius={"16px"}>
                    <Box component={"img"} src={"/images/logo.PNG"} className="rounded-full h-[45px] w-[45px] object-cover cursor-pointer" />
                    <h1 className="font-bold" style={{ color: theme.palette.text.primary,  }}>
                        Vision
                    </h1>
                </Stack>
                {!isMobile && (
                    <Stack className=" p-2 px-4" direction={"row"} justifyContent="space-center" alignItems="center" spacing={8}>
                        <Typography
                            fontWeight={550}
                            fontSize={"18px"}
                            className={`cursor-pointer`}
                            sx={{
                                color: pageState === "translate" ? "#3b82f6" : theme.palette.text.primary,
                            }}
                            onClick={() => setPageState("translate")}
                        >
                            {t("input_meaning")}
                        </Typography>
                        <Typography
                            fontWeight={550}
                            fontSize={"18px"}
                            className="cursor-pointer"
                            sx={{
                                color: pageState === "fill" ? "#3b82f6" : theme.palette.text.primary,
                            }}
                            onClick={() => setPageState("fill")}
                        >
                            {t("fill_in_blank")}
                        </Typography>
                        <Typography
                            fontWeight={550}
                            fontSize={"18px"}
                            className={`cursor-pointer`}
                            sx={{
                                color: pageState === "translate_passage" ? "#3b82f6" : theme.palette.text.primary,
                            }}
                            onClick={() => setPageState("translate_passage")}
                        >
                            {t("translate_passage")}
                        </Typography>
                        <Typography
                            fontWeight={550}
                            fontSize={"18px"}
                            className={`cursor-pointer`}
                            sx={{
                                color: pageState === "synonyms" ? "#3b82f6" : theme.palette.text.primary,
                            }}
                            // onClick={() => setPageState("synonyms")}
                        >
                            {t("synonym")}
                        </Typography>
                    </Stack>
                )}
                <Stack direction="row" spacing={1} alignItems="center">
                    {isMobile && (
                        <>
                            <IconButton
                                onClick={() => {
                                    setIsOpenModal(true);
                                    setModalState("settings");
                                }}
                                className="text-white"
                            >
                                <Settings color="primary" />
                            </IconButton>
                            <IconButton
                                onClick={() => {
                                    setIsOpenModal(true);
                                    setModalState("library");
                                }}
                                className="text-white"
                            >
                                <LibraryBooks color="primary" />
                            </IconButton>
                        </>
                    )}
                    <Box
                        component={"img"}
                        src={currentUser?.avatar}
                        className="rounded-full h-[45px] w-[45px] object-cover cursor-pointer border-2 border-blue-600"
                        onClick={() => setIsOpenAccMenu(true)}
                    />
                </Stack>
            </Stack>
        </Stack>
    );
};
