import React, { useEffect, useState } from 'react';
import { Stack, Typography, Select, MenuItem, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface PaginationFooterProps {
  pageSize: number;
  setPageSize: (size: number) => void;
  offset: number;
  setOffset: (offset: number) => void;
  totalItems: number;
  stepOptions?: number[];
}

export const PaginationFooter = ({
  pageSize,
  setPageSize,
  offset,
  setOffset,
  totalItems,
  stepOptions = [1, 10, 20, 50, 100],
}: PaginationFooterProps) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const startItem = offset * pageSize + 1;
  const endItem = Math.min((offset + 1) * pageSize, totalItems);
  const [pageSizeState, setPageSizeState] = useState(pageSize);

  useEffect(() => {
    if (totalItems > 0) {
      if (totalItems < pageSize) {
        setPageSizeState(totalItems);
      } else setPageSizeState(pageSize);
    }
  }, [totalItems, pageSize]);

  const handlePrev = () => {
    if (offset > 0) {
      setOffset(offset - 1);
    }
  };

  const handleNext = () => {
    if (offset < totalPages - 1) {
      setOffset(offset + 1);
    }
  };

  return (
    <Stack
      direction="row"
      height="40px"
      justifyContent="end"
      alignItems="center"
      sx={{ position: 'sticky', bottom: 0, backgroundColor: 'transparent', color: 'black' }}
      component={'footer'}
    >
      <Select
        value={pageSizeState}
        size="medium"
        variant="standard"
        disableUnderline
        sx={{ fontSize: 16 }}
        onChange={(e) => {
          setOffset(0);
          setPageSize(Number(e.target.value));
        }}
      >
        {stepOptions.map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>

      <Typography sx={{ fontSize: 16, width: '120px', textAlign: 'center' }} className="italic text-gray-400">
        {startItem} - {endItem} of {totalItems}
      </Typography>

      <IconButton size="small" onClick={handlePrev} sx={{ cursor: 'pointer' }} disabled={offset <= 0}>
        <ArrowBackIosNewIcon fontSize="small" />
      </IconButton>

      <IconButton size="small" onClick={handleNext} sx={{ cursor: 'pointer' }} disabled={offset >= totalPages - 1}>
        <ArrowForwardIosIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
};
