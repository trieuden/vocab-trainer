"use client";
import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNotification } from "@/vocab/providers/NotificationProvider";

export const Notification = () => {
    const { message, isOpen, setIsOpen, type } = useNotification();
    const onClose = () => {
        setIsOpen(false);
    };
    return (
        <Snackbar open={isOpen} autoHideDuration={3000} onClose={onClose} anchorOrigin={{ vertical: "top", horizontal: "right"}}>
            <Alert
                onClose={onClose}
                severity={type}
                variant="filled"
                sx={{
                    fontSize: "1rem",
                }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};
