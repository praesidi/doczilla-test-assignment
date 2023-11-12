import { Box, Checkbox, Modal, Typography } from '@mui/material';
import { ITask } from '../types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid lightgrey',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4,
};

function Popup({
  task,
  open,
  onClose,
}: {
  task: ITask | undefined;
  open: boolean;
  onClose: () => void;
}) {
  const formattedDate = task ? new Date(task?.date).toLocaleString() : '';
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...style }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant='h5'>{task?.name}</Typography>
          <Checkbox
            disabled
            checked={task?.status}
            sx={{ '& .MuiSvgIcon-root': { fontSize: 32 } }}
          />
        </Box>
        <Typography fontSize={14}>{formattedDate}</Typography>
        <Typography paragraph mt={1}>
          {task?.fullDesc}
        </Typography>
      </Box>
    </Modal>
  );
}

export default Popup;
