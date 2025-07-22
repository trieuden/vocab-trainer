import React from "react";
import { Stack, IconButton, Box, useMediaQuery, useTheme, Typography, colors } from "@mui/material";
import { Settings, LibraryBooks } from "@mui/icons-material";

type ModalStateType = "settings" | "library" | "guide";
type PageStateType = "match" | "synonyms" | "fill" | "translate";

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
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <Stack className="px-4 py-4 justify-between h-full items-center" direction={"row"}>
            <Stack direction="row" alignItems={'center'} spacing={1} borderRadius={'16px'}>
                <Box component={"img"} src={'/images/logo.PNG'} className="rounded-full h-[45px] w-[45px] object-cover cursor-pointer"/>
                <h1 className="font-bold">Vision</h1>
            </Stack>
            {!isMobile && (
                <Stack className=" p-2 px-4 rounded-3xl" boxShadow={2} direction={"row"} justifyContent="space-center" alignItems="center" spacing={8}>
                    <Typography fontWeight={550} fontSize={"18px"} className={`cursor-pointer ${pageState === "translate" && "text-blue-500"}`} onClick={() => setPageState("translate")}>
                        Nhập Nghĩa
                    </Typography>
                    <Typography fontWeight={550} fontSize={"18px"} className={`cursor-pointer ${pageState === "fill" && "text-blue-500"}`} onClick={() => setPageState("fill")}>
                        Điền Khuyết
                    </Typography>
                    <Typography fontWeight={550} fontSize={"18px"} className={`cursor-pointer ${pageState === "match" && "text-blue-500"}`} onClick={() => setPageState("match")}>
                        Nối Từ
                    </Typography>
                    <Typography fontWeight={550} fontSize={"18px"} className={`cursor-pointer ${pageState === "synonyms" && "text-blue-500"}`} onClick={() => setPageState("synonyms")}>
                        Từ Đồng Nghĩa
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
                <Box component={"img"} src={currentUser?.avatar} className="rounded-full h-[45px] w-[45px] object-cover cursor-pointer border-2 border-blue-600" onClick={() => setIsOpenAccMenu(true)} />
            </Stack>
        </Stack>
    );
};
