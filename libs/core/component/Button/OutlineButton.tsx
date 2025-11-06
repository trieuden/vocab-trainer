import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

type ButtonProps = {
  title: string;
  handleClick?: () => Promise<void> | void;
  icon?: React.ReactNode;
  disabled?: boolean;
  width?: string | number;
  height?: string | number;
  bgColor?: string;
};

export const OutlineButton = ({ title, handleClick, icon, disabled, width, height, bgColor }: ButtonProps) => {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    if (!handleClick) return;

    try {
      setLoading(true);
      await handleClick();
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = !handleClick || loading || disabled;

  return (
    <Button
      variant="outlined"
      size="small"
      fullWidth
      disabled={isDisabled}
      onClick={onClick}
      sx={{
        width: width || '100%',
        height: height || '35px',
        backgroundColor: 'transparent',
        borderColor: isDisabled ? 'rgba(145, 158, 171, 0.32)' : bgColor || '#009933',
        color: isDisabled ? 'rgba(145, 158, 171, 0.32)' : bgColor || '#009933',
        textTransform: 'none',
        borderRadius: 2,
        '&:hover': {
          backgroundColor: isDisabled ? '#fff' : bgColor || '#009933',
          color: isDisabled ? 'rgba(145, 158, 171, 0.32)' : '#fff',
          borderColor: isDisabled ? 'rgba(145, 158, 171, 0.32)' : bgColor || '#009933',
        },
      }}
      startIcon={icon}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : <span className="font-bold text-sm">{title}</span>}
    </Button>
  );
};
