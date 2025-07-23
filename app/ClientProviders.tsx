"use client";
import { NotificationProvider, I18nProvider, ThemeProvider } from "@/vocab/providers";
import { Notification } from "@/core/component/Notification/Notification";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <I18nProvider>
                <NotificationProvider>
                    {children}
                    <Notification />
                </NotificationProvider>
            </I18nProvider>
        </ThemeProvider>
    );
}
