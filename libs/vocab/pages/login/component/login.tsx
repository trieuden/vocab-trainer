import { useState } from 'react';
import { OutlineButton, PrimaryButton, SelectInput, TextFieldInput } from '@/core/component';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { AccountCircle, Https, Google, Facebook } from '@mui/icons-material';
import { useThemeMode, useNotification } from '@/vocab/providers';
import { Login } from '@/core/services/AuthServices';
import { validPassword } from '@/vocab/utils';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export const LoginForm = () => {
  const theme = useTheme();
  const { isDarkMode } = useThemeMode();
  const { setNotification } = useNotification();
  const router = useRouter();

  const [username, setUsername] = useState('user123');
  const [password, setPassword] = useState('Trieu123');

  const handleLogin = async () => {
    try {
      if (!validPassword(password)) {
        setNotification('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.', 'error');
        return;
      }
      const res = await Login({ username, password });
      Cookies.set('accessToken', res);
      router.replace('/');
    } catch (error) {
      if (error.response.statusCode === 401) {
        setNotification('Invalid username or password.', 'error');
        return;
      }
      if (error.response.statusCode === 403) {
        setNotification('Your account is locked. Please contact support.', 'error');
        return;
      }
    }
  };

  return (
    <Stack className=" items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-34 h-34 bg-primary rounded-full mb-3">
            <Box component="img" src="/images/logo.png" />
          </div>
          <h1 className="text-3xl font-bold text-[#248f24]">Welcome Back</h1>
          <p className="text-muted-foreground mt-2 text-pretty">Continue your vocabulary learning journey</p>
        </div>

        <Stack spacing={2} className="shadow-2xl rounded-1xl p-6 backdrop-blur-sm">
          <Stack className="space-y-1">
            <h1 className="text-2xl font-semibold">Sign In</h1>
            <h3 className="text-gray-500">Enter your credentials to access your account</h3>
          </Stack>
          <Stack spacing={2}>
            <Stack spacing={2}>
              <Stack>
                <Typography className="text-gray-800">Username</Typography>
                <TextFieldInput
                  icon={<AccountCircle />}
                  value={username}
                  setValue={(v) => {
                    setUsername(v.toString());
                  }}
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
                />
              </Stack>
            </Stack>
            <Stack alignItems={'end'}>
              <a href="/forgot-password" className="text-sm text-gray-500 hover:text-black transition-colors">
                <i>Forgot password?</i>
              </a>
            </Stack>

            <Stack>
              <PrimaryButton title="Sign In" handleClick={handleLogin} disabled={!username || !password} bgColor="#45bf45" />
            </Stack>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase ">
                <span className={`bg-card px-2`} style={{ backgroundColor: theme.palette.background.default }}>
                  Or continue with
                </span>
              </div>
            </div>

            <Stack direction="row" spacing={2} justifyContent="center" className="px-4">
              <OutlineButton title="Google" icon={<Google />} />
              <OutlineButton title="Facebook" icon={<Facebook />} />
            </Stack>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {"Don't have an account? "}
                <a href="/register" className="font-medium text-[#33cc33] hover:text-primary/80 transition-colors">
                  Sign up here
                </a>
              </p>
            </div>
          </Stack>
        </Stack>

        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            By signing in, you agree to our{' '}
            <a href="/terms" className="underline hover:text-foreground">
              Terms of Service{' '}
            </a>
            and{' '}
            <a href="/privacy" className="underline hover:text-foreground">
              Privacy Policy{' '}
            </a>
          </p>
        </div>
      </div>
    </Stack>
  );
};
