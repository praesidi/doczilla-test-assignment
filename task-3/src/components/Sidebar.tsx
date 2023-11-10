import { Box, Button, FormControlLabel, Switch } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

function Sidebar() {
  return (
    <Box
      sx={{
        width: '320px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Button>Сегодня</Button>
      <Button>На неделю</Button>
      <DateCalendar defaultValue={dayjs('2022-04-17')} />
      <FormControlLabel
        control={<Switch defaultChecked />}
        label='Только невыполненные'
      />
    </Box>
  );
}

export default Sidebar;
