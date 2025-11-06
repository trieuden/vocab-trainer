import React, { useState, useRef } from 'react';
import { TextField, Popover, Typography, TextFieldProps } from '@mui/material';

export type CustomTextFieldProps = TextFieldProps & {
  value?: string;
};

export const CustomTextField = ({ value, ...props }: CustomTextFieldProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const textFieldRef = useRef<HTMLInputElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, 200);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(false);
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleBlur = () => {
    setIsOpen(false);
  };

  return (
    <>
      <TextField
        {...props}
        value={value}
        inputRef={textFieldRef} // gắn ref tại đây
        InputProps={{
          sx: {
            '& .MuiInputBase-input': {
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              padding: '1px',
            },
          },
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        sx={{
          '& .MuiInputBase-root': {
            cursor: 'pointer',
            border: 'none',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
          ...props.sx,
        }}
      />
      <Popover
        open={isOpen}
        anchorEl={textFieldRef.current}
        onClose={handleMouseLeave}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        disableRestoreFocus
        sx={{ pointerEvents: 'none' }}
      >
        <Typography
          sx={{
            p: 2,
            maxWidth: '400px',
            wordBreak: 'break-word',
            pointerEvents: 'auto',
          }}
          onMouseEnter={() => clearTimeout(timeoutRef.current || undefined)}
          onMouseLeave={handleMouseLeave}
        >
          {value}
        </Typography>
      </Popover>
    </>
  );
};
