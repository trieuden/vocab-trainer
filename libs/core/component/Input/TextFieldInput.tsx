'use client';
import React, { useState } from 'react';
import { Box, TextField, InputAdornment, IconButton, FormHelperText, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

type InputProps = {
  type?: string;
  title?: string;
  value: string | number;
  setValue?: (value: string | number) => void;
  isValid?: boolean;
  setIsValid?: (value: boolean) => void;
  disabled?: boolean;
  width?: string | number;
  size?: 'medium';
  handleBlur?: () => void;
  errorMessage?: string;
  unitLabel?: string;
  isNumber?: boolean;
  isMoney?: boolean;
  icon?: React.ReactNode;
  variant?: 'standard' | 'filled' | 'outlined';
  roundedWidth?: number | string;
  height?: number | string;
  isBordered?: boolean;
};

const formatMoney = (value: number | string): string => {
  const number = Number(value);
  if (isNaN(number)) return '';
  return number.toLocaleString('vi-VN');
};

const unFormatMoney = (value: string): number => {
  return Number(value.replace(/\./g, '').replace(/[^0-9]/g, ''));
};

export const TextFieldInput = ({
  type,
  title,
  value,
  setValue,
  isValid = true,
  setIsValid,
  disabled,
  width,
  size,
  handleBlur,
  errorMessage,
  unitLabel,
  isNumber,
  isMoney,
  icon,
  variant = 'outlined',
  roundedWidth,
  height,
  isBordered = true,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const isPassword = type === 'password';

  const handleChange = (input: string) => {
    if (isMoney) {
      const raw = unFormatMoney(input);
      if (isNaN(raw)) {
        setIsValid?.(false);
        return;
      }
      setValue?.(raw);
      setIsValid?.(true);
      return;
    }

    if (isNumber && input !== '') {
      const numericValue = parseFloat(input);
      if (isNaN(numericValue)) {
        setIsValid?.(false);
        return;
      }
      setValue?.(numericValue);
      setIsValid?.(true);
      return;
    }

    setValue?.(input);
    setIsValid?.(true);
  };

  return (
    <Box display="flex" width="100%" flexDirection="column" sx={{ width: width || '100%' }}>
      <Box position="relative" display="flex" alignItems="center">
        <TextField
          label={title}
          variant={variant}
          size={size || 'small'}
          value={isMoney && typeof value === 'number' ? formatMoney(value) : value}
          error={!isValid}
          disabled={disabled}
          onChange={(e) => handleChange(e.target.value)}
          fullWidth
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          onFocus={() => {
            handleBlur?.();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
            handleBlur?.();
          }}
          sx={{
            height: height,
            '& .MuiOutlinedInput-root': {
              borderRadius: roundedWidth || 1,
              backgroundColor: disabled ? '#f5f5f5' : 'white',
              border: isBordered ? '' : 'none',
            },
          }}
          InputProps={{
            startAdornment: icon && (
              <InputAdornment position="start">
                <IconButton edge="start">{icon}</IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {isPassword && (
                  <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword((prev) => !prev)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                )}
                {unitLabel && ((value !== '' && value !== undefined) || isFocused) && <Typography sx={{ color: '#8c8c8c' }}>{unitLabel}</Typography>}
              </InputAdornment>
            ),
          }}
        />
        {!isValid && (
          <FormHelperText
            sx={{
              position: 'absolute',
              bottom: -19,
              left: 14,
              color: 'error.main',
              fontSize: '0.75rem',
            }}
          >
            {errorMessage}
          </FormHelperText>
        )}
      </Box>
    </Box>
  );
};
