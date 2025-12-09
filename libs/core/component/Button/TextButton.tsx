import { useState } from 'react';
import { Button, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

type TextButtonProps = {
  title?: string;
  handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void> | void;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  color?: string;
  iconColor?: string;
  width?: string | number;
  disabled?: boolean;
  fontSize?: string | number;
  isHoverBgColor?: boolean;
  bgColor?: string;
  height?: string | number;
};

export const TextButton = ({
  title,
  handleClick,
  startIcon,
  endIcon,
  color,
  iconColor,
  width,
  disabled,
  fontSize,
  isHoverBgColor = false,
  bgColor,
  height = '35px',
}: TextButtonProps) => {
  const [loading, setLoading] = useState(false);

  const onClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!handleClick) return;

    try {
      setLoading(true);
      await handleClick(event);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box width={width || 'auto'} display="flex" justifyContent="center" alignItems="center" className="relative">
      <Button
        variant="text"
        onClick={onClick}
        disabled={loading || disabled}
        startIcon={!loading && startIcon}
        endIcon={!loading && endIcon}
        disableRipple
        disableTouchRipple
        sx={{
          textTransform: 'none',
          color: loading ? (color ? color : 'rgba(145, 158, 171, 0.32)') : color ? color : '#009933',
          fontWeight: 600,
          fontSize: fontSize,
          borderRadius: 3,
          bgcolor: bgColor,
          height: height,
          width: width || '100%',
          minWidth: 0,
          p: 0,
          transition: 'none',

          '& .MuiButton-startIcon': {
            '& svg': {
              fontSize: fontSize,
              color: iconColor ? iconColor : 'inherit',
            },
          },
          '& .MuiButton-endIcon': {
            '& svg': {
              fontSize: fontSize,
              color: iconColor ? iconColor : 'inherit',
            },
          },
          '&:hover': {
            backgroundColor: isHoverBgColor ? '#8c8c8c1A' : 'transparent',
            color: '#8c8c8c',
          },
        }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : title}
      </Button>
    </Box>
  );
};
