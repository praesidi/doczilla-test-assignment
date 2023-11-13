import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import TaskCard from './TaskCard';
import { ITask } from '../types';

function TaskList({
  tasks,
  sortOption,
  onSortByDate,
  onShowAll,
  handleTaskCardClick,
}: {
  tasks: ITask[] | null;
  sortOption: string;
  onSortByDate: (arg0: string) => void;
  onShowAll: () => void;
  handleTaskCardClick: (arg0: ITask) => void;
}) {
  return (
    <Box sx={{ px: '20px', flex: 1 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          mb: '12px',
        }}
      >
        <FormControl sx={{ minWidth: 120 }} size='small'>
          <Select
            value={sortOption}
            onChange={(e) => onSortByDate(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value='none'>
              <em>None</em>
            </MenuItem>
            <MenuItem value={'from new'}>По дате (сначала новые)</MenuItem>
            <MenuItem value={'from old'}>По дате (сначала старые)</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
        }}
      >
        {tasks && tasks?.length < 1 ? (
          <Box>
            <Typography paragraph fontSize={24} mt={3}>
              Nothing has been found
            </Typography>
            <Button variant='outlined' onClick={onShowAll}>
              Show all
            </Button>
          </Box>
        ) : (
          tasks?.map((task) => {
            return (
              <TaskCard
                key={task.id}
                props={task}
                onClick={handleTaskCardClick}
              />
            );
          })
        )}
      </Box>
    </Box>
  );
}

export default TaskList;
