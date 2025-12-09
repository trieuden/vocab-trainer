'use client';
import React from 'react';
import { Autocomplete, TextField, Box } from '@mui/material';

type Option = {
  code?: string;
  id?: string;
  [key: string]: any;
};

type SelectInputProps = {
  title?: string;
  value: Option[];
  onChange?: (name: string) => void;
  onSelectId?: (id: string) => void;
  selectedValue?: string;
  isValid?: boolean;
  setIsValid?: (value: boolean) => void;
  disabled?: boolean;
  width?: string | number;
  labelField?: string;
  noBorder?: boolean;
  roundedWidth?: number | string;
};

export const SelectInput = ({
  title,
  value,
  onChange,
  onSelectId,
  selectedValue,
  isValid = true,
  setIsValid,
  disabled,
  width,
  labelField = 'name',
  noBorder,
  roundedWidth,
}: SelectInputProps) => {
  const selectedOption = value.find((option) => option[labelField] === selectedValue) || null;

  const handleChange = (_: any, newValue: Option | null) => {
    if (newValue && newValue[labelField]) {
      onChange && onChange(newValue[labelField]);
      if (onSelectId) {
        const idOrCode = newValue.id ?? newValue.code ?? '';
        onSelectId(idOrCode);
      }
    } else {
      onChange && onChange('');
      if (onSelectId) onSelectId('');
    }

    if (setIsValid) setIsValid(true);
  };

  const handleBlur = () => {
    if (selectedValue && !value.some((option) => option[labelField] === selectedValue)) {
      onChange && onChange('');
      if (onSelectId) onSelectId('');
      if (setIsValid) setIsValid(false);
    }
  };

  return (
    <Box
      display="flex"
      width="100%"
      flexDirection="column"
      sx={{ backgroundColor: 'white', width: width || '100%', borderRadius: roundedWidth || 1 }}
    >
      <Autocomplete
        size="small"
        disabled={disabled}
        options={value}
        value={selectedOption}
        onChange={handleChange}
        onBlur={handleBlur}
        getOptionLabel={(option) => option[labelField] || ''}
        renderInput={(params) => <TextField {...params} label={title} error={!isValid} />}
        isOptionEqualToValue={(option, val) => option[labelField] === val[labelField]}
        freeSolo={false}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: roundedWidth || 1,
          },
        }}
      />
    </Box>
  );
};
