import { Button, Box, Stack } from '@mui/material';
import { PrimaryButton } from '@/core/component/Button/PrimaryButton';

export const StartPage = () => {
  return (
    <Stack className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-8">
        <div className="inline-flex items-center justify-center w-34 h-34 bg-primary rounded-full mb-6">
          <Box component="img" src="/images/logo.png" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-balance mb-4">Vocab Learn</h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-md mx-auto">Master new vocabulary with our interactive learning platform</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <PrimaryButton
            title="Get Started"
            handleClick={() => {
              location.href = '/register';
            }}
          />
          <PrimaryButton
            title="Login"
            handleClick={() => {
              location.href = '/login';
            }}
          />
        </div>
      </div>
    </Stack>
  );
};
