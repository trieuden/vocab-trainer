'use client';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { HomePage, StartPage } from '@/vocab/pages';
import { AccountMenu } from '@/vocab/component';
import { UserModel } from '@/core/models/UserModel';
import { getMe } from '@/core/services/AuthServices';
import { useUser } from '@/vocab/providers/UserProvider';

const Pages = () => {
  const [isOpenAccMenu, setIsOpenAccMenu] = useState(false);
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
  const [isReady, setIsReady] = useState(false);
  const [isShortcutKeys, setIsShortcutKeys] = useState(true);
  const { userAuth, setUserAuth } = useUser();

  useEffect(() => {
    const cookieUser = Cookies.get('accessToken');
    setAccessToken(cookieUser);
    const cookieShortcutKeys = Cookies.get('isShortcutKeys');
    if (cookieUser) {
      const fetchUser = async () => {
        try {
          const decoded = await getMe();
          if (decoded) {
            setUserAuth(decoded);
          }
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      };
      fetchUser();
    }

    if (cookieShortcutKeys) {
      setIsShortcutKeys(cookieShortcutKeys === 'on');
    }

    setIsReady(true);
  }, []);

  if (!isReady) return null;

  return (
    <>
      {accessToken ? (
        <>
          <HomePage setIsOpenAccMenu={setIsOpenAccMenu} isShortcutKeys={isShortcutKeys} />
          <AccountMenu
            isOpenAccMenu={isOpenAccMenu}
            setIsOpenAccMenu={setIsOpenAccMenu}
            isShortcutKeys={isShortcutKeys}
            setIsShortcutKeys={setIsShortcutKeys}
          />
        </>
      ) : (
        <StartPage />
      )}
    </>
  );
};

export default Pages;
