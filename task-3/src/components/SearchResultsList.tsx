import { Box, Typography } from '@mui/material';
import SearchResultItem from './SearchResultItem';
import { ITask } from '../types';

function SearchResultsList({
  items,
  onClick,
}: {
  items: ITask[] | null;
  onClick: (arg0: ITask) => void;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'start',
        gap: '5px',
        maxHeight: '300px',
        minHeight: '64px',
        position: 'absolute',
        width: '95%',
        background: 'whitesmoke',
        top: '64px',
        boxShadow: 3,
        boxSizing: 'border-box',
        overflowY: 'auto',
        p: 1,
        borderRadius: 1,
      }}
    >
      {items && items?.length > 0 ? (
        items?.map((item: ITask) => (
          <SearchResultItem key={item.id} props={item} onClick={onClick} />
        ))
      ) : (
        <Typography sx={{ color: 'black', fontSize: 18 }}>
          Nothing Found
        </Typography>
      )}
    </Box>
  );
}

export default SearchResultsList;
