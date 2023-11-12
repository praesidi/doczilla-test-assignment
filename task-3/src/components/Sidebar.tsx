import { Box, Button, FormControlLabel, Switch } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';

function Sidebar({
  isShowUnfinished,
  onToggle,
  onToday,
  onThisWeek,
  date,
}: {
  isShowUnfinished: boolean;
  onToggle: () => void;
  onToday: () => void;
  onThisWeek: () => void;
  date: Dayjs;
}) {
  // const [day, setDay] = useState(dayjs(new Date()))

  function onDateChange() {}

  return (
    <Box
      sx={{
        width: '320px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
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
      <DateCalendar value={date} onChange={onDateChange} />
      <FormControlLabel
        control={<Switch />}
        checked={isShowUnfinished}
        onChange={onToggle}
        label='Только невыполненные'
      />
    </Box>
  );
}

export default Sidebar;
