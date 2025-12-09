'use client';
import { NotificationProvider, I18nProvider, ThemeProvider, ConfirmationProvider, FadeTransitionProvider } from '@/vocab/providers';
import { Notification } from '@/core/component/Notification/Notification';
import { UserProvider } from '@/vocab/providers/UserProvider';
import { Confirmation } from '@/core/component/Confirm/Confirmation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <I18nProvider>
          <UserProvider>
            <ConfirmationProvider>
              <NotificationProvider>
                <FadeTransitionProvider>
                  {children}
                  <Notification />
                  <Confirmation />
                </FadeTransitionProvider>
              </NotificationProvider>
            </ConfirmationProvider>
          </UserProvider>
        </I18nProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
