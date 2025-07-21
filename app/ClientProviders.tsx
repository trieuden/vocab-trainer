"use client";
import { NotificationProvider } from "@/vocab/providers/NotificationProvider";
import { Notification } from "@/core/component/Notification/Notification";
export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <NotificationProvider>
            {children}
            <Notification />
        </NotificationProvider>
    );
}
