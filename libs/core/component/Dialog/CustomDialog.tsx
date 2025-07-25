import React, { useState } from "react";
import { Dialog, useTheme } from "@mui/material";

type DialogCustomProps = {
    isOpenModal: boolean;
    setIsOpenModal: (isOpen: boolean) => void;
    children: React.ReactNode;
};

export const CustomDialog = ({ isOpenModal, setIsOpenModal, children }: DialogCustomProps) => {
    const theme = useTheme();

    return (
        <Dialog
            open={isOpenModal}
            onClose={() => setIsOpenModal(false)}
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
            {children}
        </Dialog>
    );
};
