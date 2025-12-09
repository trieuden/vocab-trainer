import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { Box, InputAdornment, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

type DateInputProps = {
  title?: string;
  date: Date | string;
  setDate: (date: Date | string) => void;
  width?: string | number;
  disabled?: boolean;
  minDate?: Date | string;
  maxDate?: Date | string;
  isValid?: boolean;
  setIsValid?: (value: boolean) => void;
  handleBlur?: () => void;
  roundedWidth?: string | number;
};

export const DateInput = ({
  title,
  date,
  setDate,
  width,
  disabled,
  minDate,
  maxDate,
  isValid = true,
  setIsValid,
  handleBlur,
  roundedWidth,
}: DateInputProps) => {
  const [hover, setHover] = useState(false);

  const value = date ? (typeof date === 'string' ? dayjs(date, ['YYYY-MM-DD', 'DD/MM/YYYY']) : dayjs(date)) : null;

  const handleChange = (value: unknown, context: any) => {
    if (dayjs.isDayjs(value) && value.isValid()) {
      const adjustedDate = dayjs(value).add(7, 'hour').toDate();
      setDate(adjustedDate);
      setIsValid && setIsValid(true);
    } else {
      setDate('');
      setIsValid && setIsValid(false);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDate('');
    setIsValid && setIsValid(false);
  };

  return (
    <Box sx={{ width: width || '100%', bgcolor: 'white' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={title}
          value={value}
          onChange={handleChange}
          format="DD/MM/YYYY"
          minDate={minDate ? dayjs(minDate) : undefined}
          maxDate={maxDate ? dayjs(maxDate) : undefined}
          disabled={disabled}
          sx={{ width: '100%' }}
          slotProps={{
            textField: {
              size: 'small',
              sx: {
                width: '100%',
                bgcolor: 'white',
                placeholder: '',

                '& fieldset': { borderRadius: roundedWidth || 1 },
              },
              error: !isValid,
              onBlur: handleBlur,
              onMouseEnter: () => setHover(true),
              onMouseLeave: () => setHover(false),
              InputProps: {
                endAdornment:
                  hover && value && value.isValid() ? (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={handleClear} tabIndex={-1} sx={{ p: 0 }}>
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ) : null,
              },
            },
          }}
        />
      </LocalizationProvider>
    </Box>
  );
};
