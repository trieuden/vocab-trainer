'use client';
import React, { createContext, useContext, useState } from 'react';

interface ConfirmationContextType {
  isOpen: boolean;
  title: string;
  message: string;
  isProcessing: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  setConfirmation: (title: string, message: string) => Promise<boolean>;
}

const ConfirmationContext = createContext<ConfirmationContextType | undefined>(undefined);

export const useConfirmation = () => {
  const context = useContext(ConfirmationContext);
  if (!context) {
    throw new Error('useConfirmation must be used within a ConfirmationProvider');
  }
  return context;
};

export const ConfirmationProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [resolveCallback, setResolveCallback] = useState<((value: boolean) => void) | null>(null);

  const setConfirmation = (title: string, message: string): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      setTitle(title);
      setMessage(message);
      setIsOpen(true);
      setResolveCallback(() => resolve);
    });
  };

  const onConfirm = () => {
    setIsProcessing(true);
    try {
      if (resolveCallback) {
        resolveCallback(true);
      }
    } finally {
      setIsProcessing(false);
      setIsOpen(false);
      setResolveCallback(null);
    }
  };

  const onCancel = () => {
    if (resolveCallback) {
      resolveCallback(false);
      setResolveCallback(null);
    }
    setIsOpen(false);
  };

  return (
    <ConfirmationContext.Provider
      value={{
        isOpen,
        title,
        message,
        isProcessing,
        onConfirm,
        onCancel,
        setConfirmation,
      }}
    >
      {children}
    </ConfirmationContext.Provider>
  );
};
