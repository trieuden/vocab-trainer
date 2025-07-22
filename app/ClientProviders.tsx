"use client";
import { NotificationProvider } from "@/vocab/providers/NotificationProvider";
import { Notification } from "@/core/component/Notification/Notification";
import { I18nProvider } from "@/vocab/providers/I18nProvider";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <I18nProvider>
            <NotificationProvider>
                {children}
                <Notification />
            </NotificationProvider>
        </I18nProvider>
    );
}