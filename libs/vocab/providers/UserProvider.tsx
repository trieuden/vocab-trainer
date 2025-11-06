'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getMe } from '@/core/services/AuthServices';
import { UserModel } from '@/core/models';
import Cookies from 'js-cookie';

type UserContextType = {
  userAuth: UserModel | null;
  setUserAuth: (user: UserModel | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userAuth, setUserAuth] = useState<UserModel | null>(null);
  const accessToken = Cookies.get('accessToken');

  useEffect(() => {
    if (accessToken) {
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
  }, [accessToken]);

  return <UserContext.Provider value={{ userAuth, setUserAuth }}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
