'use client';
import { NotificationProvider, I18nProvider, ThemeProvider } from '@/vocab/providers';
import { Notification } from '@/core/component/Notification/Notification';
import { UserProvider } from '@/vocab/providers/UserProvider';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <I18nProvider>
        <UserProvider>
          <NotificationProvider>
            {children}
            <Notification />
          </NotificationProvider>
        </UserProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
