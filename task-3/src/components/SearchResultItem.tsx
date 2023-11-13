import { Box, Typography } from '@mui/material';
import { ITask } from '../types';

function searchResultItem({
  props,
  onClick,
}: {
  props: ITask;
  onClick: (arg0: ITask) => void;
}) {
  return (
    <Box
      onClick={() => onClick(props)}
      sx={{
        border: '1px solid darkgray',
        boxShadow: 1,
        background: 'whitesmoke',
        width: '100%',
        height: '30px',
        boxSizing: 'border-box',
        borderRadius: 1,
        cursor: 'pointer',
        p: '5px 10px',
        ':hover': {
          background: 'white',
        },
      }}
    >
      <Typography
        sx={{
          fontWeight: 600,
          color: 'black',
          fontSize: 14,
          m: 0,
          letterSpacing: 1,
        }}
      >
        {props.name}
      </Typography>
    </Box>
  );
}

export default searchResultItem;
