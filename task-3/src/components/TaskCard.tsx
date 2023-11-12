import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Checkbox,
  Typography,
} from '@mui/material';
import { ITask } from '../types';

function TaskCard({
  props,
  onClick,
}: {
  props: ITask;
  onClick: (arg0: ITask) => void;
}) {
  const newDate = new Date(props.date);

  return (
    <Card sx={{ boxShadow: 3 }}>
      <CardActionArea onClick={() => onClick(props)}>
        <CardContent
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography fontWeight={600} fontSize={18}>
              {props.name}
            </Typography>
            <Typography fontSize={14}>{newDate.toLocaleString()}</Typography>
            <Typography paragraph my={1}>
              {props.shortDesc}
            </Typography>
          </Box>
          <Box>
            <Checkbox
              disabled
              checked={props.status}
              sx={{ '& .MuiSvgIcon-root': { fontSize: 32 } }}
            />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default TaskCard;
