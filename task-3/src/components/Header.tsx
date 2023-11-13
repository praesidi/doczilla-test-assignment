import { AppBar, Toolbar, styled, alpha, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SearchResultsList from './SearchResultsList';
import { useEffect, useState } from 'react';
import { ITask } from '../types';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  marginLeft: 0,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

function Header({ onClick }: { onClick: (arg0: ITask) => void }) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResult, setSearchResult] = useState<ITask[] | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (searchQuery !== '') {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }

    fetchDataByQuery(searchQuery);
  }, [searchQuery]);

  function fetchDataByQuery(query: string) {
    const limit = 10;
    const url = `/api/todos/find?q=${query}&limit=${limit}`;

    async function getData() {
      try {
        let response;
        if (query === '' || query === ' ') {
          return;
        } else {
          response = await fetch(url);
        }
        const data = await response.json();
        setSearchResult(data);
      } catch (error) {
        let errorMessage = 'Failed to fetch data from the server';
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        console.log(errorMessage);
      }
    }
    getData();
  }

  return (
    <AppBar position='sticky' sx={{ position: 'relative' }}>
      <Toolbar>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder='Search…'
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        {isOpen ? (
          <SearchResultsList items={searchResult} onClick={onClick} />
        ) : (
          <></>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
