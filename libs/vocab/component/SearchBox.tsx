import { CustomTextField, TextButton, TextFieldInput } from '@/core/component';
import { SearchOutlined } from '@mui/icons-material';
import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';

type SearchBoxProps = {
  value: string;
  setValue: (value: string) => void;
  onChange?: (value: string) => void;
};

export const SearchBox = ({ value, setValue, onChange }: SearchBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseLeave = () => {
    if (value === '') setIsOpen(false);
  };

  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      spacing={1}
      sx={{
        borderRadius: '12px',
        backgroundColor: 'transparent',
      }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={handleMouseLeave}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && onChange) {
          onChange(value);
        }
      }}
    >
      <Stack
        sx={{
          flexGrow: 1,
          opacity: isOpen ? 1 : 0,
          transition: 'opacity 0.3s ease',
          width: isOpen ? '260px' : '0px',
          overflow: 'hidden',
          p: 1,
        }}
      >
        <TextFieldInput value={value} setValue={(v) => setValue(v.toString())} roundedWidth={5} />
      </Stack>

      <TextButton startIcon={<SearchOutlined />} width={'40px'} fontSize={'28px'} />
    </Stack>
  );
};
