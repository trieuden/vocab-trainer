import React, { useState } from 'react';
import { Dialog, useTheme, Box } from '@mui/material';

type DialogCustomProps = {
  isOpenModal: boolean;
  setIsOpenModal: (isOpen: boolean) => void;
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
};

export const CustomDialog = ({ isOpenModal, setIsOpenModal, children, maxWidth = 'sm' }: DialogCustomProps) => {
  const theme = useTheme();

  return (
    <Dialog
      open={isOpenModal}
      onClose={() => setIsOpenModal(false)}
      maxWidth={maxWidth}
      fullWidth
      slotProps={{
        paper: {
          sx: {
            bgcolor: theme.palette.background.default,
            color: 'white',
            borderRadius: '16px',
            boxShadow: '0px 4px 2px rgba(0, 0, 0, 0.2)',
          },
        },
        backdrop: {
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          },
        },
      }}
    >
      <Box
        className="overflow-y-auto"
        sx={{
          padding: '16px',

          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f1f1f1',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#b3b3b3',
            borderRadius: '10px',
          },
        }}
      >
        {children}
      </Box>
    </Dialog>
  );
};
