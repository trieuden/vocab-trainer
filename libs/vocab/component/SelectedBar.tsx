import { Stack, Button, Typography } from '@mui/material';
import { Delete, Close } from '@mui/icons-material';
import { PrimaryButton, TextButton } from '@/core/component';

interface SelectedRolesBarProps {
  checkedCount: number;
  onDelete?: () => void;
  onClear: () => void;
  onSave?: () => void;
  buttonDeleteTitle?: string;
  buttonDeleteIcon?: React.ReactNode;
  buttonDeleteColor?: string;
  buttonSaveTitle?: string;
  buttonSaveIcon?: React.ReactNode;
}

export const SelectedBar = ({
  checkedCount,
  onDelete,
  onClear,
  onSave,
  buttonDeleteTitle = 'Delete',
  buttonSaveTitle,
  buttonDeleteIcon = <Delete />,
  buttonSaveIcon,
  buttonDeleteColor = 'red',
}: SelectedRolesBarProps) => (
  <Stack
    direction="row"
    sx={{ backgroundColor: 'white', bottom: 14, position: 'absolute', left: '50%', transform: 'translateX(-50%)', zIndex: 100, color: 'black' }}
  >
    <Stack flex={1} alignItems={'center'}>
      {checkedCount > 0 && (
        <Stack direction="row" alignItems="center" height={'50px'} spacing={2} sx={{ boxShadow: 6, borderRadius: '10px' }}>
          <Button sx={{ bgcolor: 'blue', color: 'white', borderRadius: '10px 0 0 10px', height: '100%' }}>
            <Typography fontSize={18}>{checkedCount}</Typography>
          </Button>
          <Typography>selected data</Typography>
          <Button
            onClick={onDelete}
            startIcon={buttonDeleteIcon}
            variant="contained"
            sx={{
              textTransform: 'none',
              backgroundColor: buttonDeleteColor,
              color: buttonDeleteColor === 'red' ? 'white' : 'black',
              borderRadius: '10px',
            }}
          >
            {buttonDeleteTitle}
          </Button>
          {buttonSaveTitle && <PrimaryButton title={buttonSaveTitle} handleClick={onSave} icon={buttonSaveIcon} />}
          <TextButton startIcon={<Close />} handleClick={onClear} />
        </Stack>
      )}
    </Stack>
  </Stack>
);
