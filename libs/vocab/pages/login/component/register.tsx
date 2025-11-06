import { useState } from 'react';
import { OutlineButton, PrimaryButton, SelectInput, TextFieldInput } from '@/core/component';
import { Box, Stack, Typography, useTheme, Checkbox } from '@mui/material';
import { AccountCircle, Https, Google, Facebook, Email } from '@mui/icons-material';
import { useThemeMode, useNotification } from '@/vocab/providers';
import { ValidPassword } from '@/vocab/utils';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export const Register = () => {
  const theme = useTheme();
  const { isDarkMode } = useThemeMode();
  const { setNotification } = useNotification();
  const router = useRouter();

  const [username, setUsername] = useState('user123');
  const [password, setPassword] = useState('Trieu123');

  return (
    <Stack className=" items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-34 h-34 bg-primary rounded-full mb-3">
            <Box component="img" src="/images/logo.png" />
          </div>
          <h1 className="text-3xl font-bold text-[#248f24]">Join Vocab Learn</h1>
          <p className="text-muted-foreground mt-2 text-pretty">Start building your vocabulary today</p>
        </div>

        <Stack spacing={2} className="shadow-2xl rounded-1xl p-6 backdrop-blur-sm">
          <Stack className="space-y-1">
            <h1 className="text-2xl font-semibold">Create Account</h1>
            <h3 className="text-gray-500">Fill in your details to get started</h3>
          </Stack>
          <Stack spacing={2}>
            <Stack spacing={2}>
              <Stack direction={'row'} spacing={2}>
                <Stack>
                  <Typography className="text-gray-800">First Name</Typography>
                  <TextFieldInput
                    icon={<AccountCircle />}
                    value={username}
                    setValue={(v) => {
                      setUsername(v.toString());
                    }}
                    variant="filled"
                  />
                </Stack>
                <Stack>
                  <Typography className="text-gray-800">Last Name</Typography>
                  <TextFieldInput
                    value={username}
                    setValue={(v) => {
                      setUsername(v.toString());
                    }}
                    variant="filled"
                  />
                </Stack>
              </Stack>
              <Stack>
                <Typography className="text-gray-800">Email Address</Typography>
                <TextFieldInput
                  icon={<Email />}
                  value={password}
                  setValue={(v) => {
                    setPassword(v.toString());
                  }}
                  variant="filled"
                />
              </Stack>
              <Stack>
                <Typography className="text-gray-800">Password</Typography>
                <TextFieldInput
                  icon={<Https />}
                  type="password"
                  value={password}
                  setValue={(v) => {
                    setPassword(v.toString());
                  }}
                  variant="filled"
                />
              </Stack>
              <Stack>
                <Typography className="text-gray-800">Confirm Password</Typography>
                <TextFieldInput
                  icon={<Https />}
                  type="password"
                  value={password}
                  setValue={(v) => {
                    setPassword(v.toString());
                  }}
                  variant="filled"
                />
              </Stack>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={1}>
              <Checkbox id="terms" className="mt-1" />
              <Typography className="text-sm leading-relaxed">
                I agree to the{' '}
                <a href="/terms" className="text-green-600 hover:text-gray-500 underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" className="text-green-600 hover:text-gray-500 underline">
                  Privacy Policy
                </a>
              </Typography>
            </Stack>

            <Stack>
              <PrimaryButton title="Create Account" disabled={!username || !password} bgColor="#45bf45" />
            </Stack>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {'Already have an account? '}
                <a href="/register" className="font-medium text-[#33cc33] hover:text-primary/80 transition-colors">
                  Sign in here
                </a>
              </p>
            </div>
          </Stack>
        </Stack>
      </div>
    </Stack>
  );
};
