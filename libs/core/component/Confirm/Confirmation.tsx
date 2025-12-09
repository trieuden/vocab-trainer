'use client';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { useConfirmation } from '@/vocab/providers/ConfirmationProvider';
import { PrimaryButton } from '../Button/PrimaryButton';
import { TextButton } from '../Button/TextButton';

export const Confirmation = () => {
  const { isOpen, title, message, onConfirm, onCancel, isProcessing } = useConfirmation();

  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
    if (!isProcessing) {
      onCancel();
    }
  };

  return (
    <Dialog
      open={isOpen}
      maxWidth="sm"
      fullWidth
      disableEscapeKeyDown={isProcessing}
      onClose={(event, reason) => {
        if (isProcessing && reason === 'backdropClick') return;
        handleCancel();
      }}
      className="rounded-3xl"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <TextButton title="Hủy" handleClick={handleCancel} width={'100px'} fontSize={16} color="black" />
        <PrimaryButton title="Xác nhận" handleClick={handleConfirm} width={'138px'} bgColor="var(--bgButtonPrimary)" />
      </DialogActions>
    </Dialog>
  );
};
