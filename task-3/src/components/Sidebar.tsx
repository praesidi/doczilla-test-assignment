import { Box, Button, FormControlLabel, Switch } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { IDate, IDateRange } from '../types';

function Sidebar({
  areUnfinishedShown,
  onToggle,
  onToday,
  onThisWeek,
  onDateRange,
  dateRange,
}: {
  areUnfinishedShown: boolean;
  onToggle: () => void;
  onToday: () => void;
  onThisWeek: () => void;
  dateRange: IDateRange;
  onDateRange: (arg0: IDateRange) => void;
}) {
  return (
    <Box
      sx={{
        width: '320px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        px: '20px',
        borderRight: '1px solid lightgrey',
      }}
    >
      <Button fullWidth variant='outlined' onClick={onToday}>
        Сегодня
      </Button>
      <Button fullWidth variant='outlined' onClick={onThisWeek}>
        На неделю
      </Button>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <DatePicker
          label='От'
          format='DD.MM.YYYY'
          onChange={(newValue: Date | null) => {
            const newV = newValue ? new Date(`${newValue}`) : undefined;
            onDateRange({
              ...dateRange,
              from: newV,
            });
          }}
          slotProps={{
            field: {
              clearable: true,
            },
          }}
        />
        <DatePicker
          label='До'
          format='DD.MM.YYYY'
          onChange={(newValue: IDate | null) => {
            const newV = newValue ? new Date(`${newValue}`) : undefined;
            onDateRange({
              ...dateRange,
              to: newV,
            });
          }}
          slotProps={{
            field: {
              clearable: true,
            },
          }}
        />
      </Box>
      <FormControlLabel
        control={<Switch />}
        checked={areUnfinishedShown}
        onChange={onToggle}
        label='Только невыполненные'
      />
    </Box>
  );
}

export default Sidebar;
