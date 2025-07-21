import React, { createContext, useContext, useState, ReactNode } from "react";

type NotificationType = "info" | "success" | "error";

interface NotificationContextType {
    message: string;
    setMessage: (newMessage: string) => void;
    type: NotificationType;
    setType: (newType: NotificationType) => void;
    isOpen: boolean;
    setIsOpen: (newIsOpen: boolean) => void;
    setNotification: (newMessage: string, newType?: NotificationType, newIsOpen?: boolean) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [message, setMessage] = useState("");
    const [type, setType] = useState<NotificationType>("info");
    const [isOpen, setIsOpen] = useState(false);

    const setNotification = (newMessage: string, newType: NotificationType = "info", newIsOpen: boolean = true) => {
        setMessage(newMessage);
        setType(newType);
        setIsOpen(newIsOpen);
    };

    return (
        <NotificationContext.Provider
            value={{
                message,
                setMessage,
                type,
                setType,
                isOpen,
                setIsOpen,
                setNotification,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotification must be used within a NotificationProvider");
    }
    return context;
};
