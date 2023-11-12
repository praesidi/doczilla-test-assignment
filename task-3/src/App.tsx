import { useEffect, useState } from 'react';
import { ITask } from './types';
import dayjs from 'dayjs';
import {
  Box,
  CircularProgress,
  Container,
  Pagination,
  Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import getUnfinishedTasks from './utils/getUnfinishedTasks';
import useFetch from './hooks/useFetch';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TaskList from './components/TaskList';
import Popup from './components/Popup';
import getTasksSortedByDate from './utils/getTasksSortedByDate';
import getIndexesByPage from './utils/getIndexesByPage';

// TODO: Поиск по дате с помощью календаря (API). ~

// TODO: * Вывод задач по диапазону дат (API). ~
// TODO: * Поиск с выпадающим списком. ~~~

function App() {
  const [APIParameters, setAPIParameters] = useState<string>('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isShowUnfinished, setIsShowUnfinished] = useState<boolean>(false); //TODO: rename
  const [currentSortOption, setCurrentSortOption] = useState<string>('none');
  const [popupTask, setPopupTask] = useState<ITask | undefined>(); //FIXME: get rid of the state

  const { data, isLoading, error } = useFetch(APIParameters); // data from api don't mutate it
  const [currentData, setCurrentData] = useState<ITask[] | null>(null); //data to show aka page
  // const [sortedData, setSortedData] = useState<ITask[] | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1); // current page
  const [pageQty, setPageQty] = useState<number>(1); // total number of pages

  useEffect(() => {
    if (data) {
      setCurrentData(data);
    }
  }, [data]);

  useEffect(() => {
    if (data && !isShowUnfinished) setPageQty(Math.ceil(data?.length / 20));
  }, [data, isShowUnfinished]);

  useEffect(() => {
    const [firstItemIndex, lastItemIndex] = getIndexesByPage(currentPage, 20);
    const pageData = data?.slice(firstItemIndex, lastItemIndex);

    if (pageData) setCurrentData(pageData);
  }, [data, currentPage]);

  if (error) {
    return (
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          width: '100wv',
        }}
      >
        <Typography variant='h4' color={'#B00020'}>
          Something went wrong ;( <br /> Try again
        </Typography>
      </Container>
    );
  }

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  function handlePopupClose() {
    setIsPopupOpen(false);
  }

  function handleSortByDate(option: string) {
    setCurrentSortOption(option);
    setCurrentPage(1); // resets current page
    if (option === 'none' && !isShowUnfinished) {
      setCurrentData(data);
    }

    if (data && option !== 'none' && !isShowUnfinished) {
      const sortedByDate = getTasksSortedByDate(data, option);
      setCurrentData(sortedByDate);
    }
  }

  function handleToggle() {
    setCurrentPage(1);
    setCurrentData(data); //TODO: fix
    if (!isShowUnfinished) getUnfinishedTasks(data);
    setIsShowUnfinished(!isShowUnfinished);
  }

  function handleShowTodayTasks() {
    const todayStart = new Date();
    const todayEnd = new Date();

    todayStart.setHours(0, 0, 0, 1);
    todayEnd.setHours(23, 59, 59, 999);

    const query = `/date?from=${new Date(todayStart).getTime()}to${new Date(
      todayEnd
    ).getTime()}`;

    setAPIParameters(query);
  }

  function handleShowWeekTasks() {
    const today = new Date();
    const dayWeekAgo = new Date();
    dayWeekAgo.setDate(today.getDate() - 7);

    dayWeekAgo.setHours(0, 0, 0, 1);
    today.setHours(23, 59, 59, 999);

    const query = `/date?from=${new Date(dayWeekAgo).getTime()}to${new Date(
      today
    ).getTime()}`;

    setAPIParameters(query);
  }

  function handleShowAll() {
    setAPIParameters('');
  }

  function handleTaskCardClick(task: ITask) {
    setIsPopupOpen(true);
    setPopupTask(task);
  }

  // function handleOnSelectedDay() {}

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container disableGutters={true} sx={{ height: '100vh', width: '100%' }}>
        <Header onSearch={setAPIParameters} />
        <Container disableGutters sx={{ display: 'flex', py: '30px' }}>
          <Sidebar
            isShowUnfinished={isShowUnfinished}
            onToggle={handleToggle}
            onToday={handleShowTodayTasks}
            onThisWeek={handleShowWeekTasks}
            date={dayjs(new Date())}
          />
          {isLoading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                flex: 1,
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <TaskList
                tasks={currentData}
                sortOption={currentSortOption}
                onSortByDate={handleSortByDate}
                onShowAll={handleShowAll}
                handleTaskCardClick={handleTaskCardClick}
              />
              <Pagination
                count={pageQty}
                page={currentPage}
                onChange={(e, page) => handlePageChange(page)}
                sx={{
                  mt: '30px',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              />
            </Box>
          )}
        </Container>
      </Container>
      <Popup open={isPopupOpen} onClose={handlePopupClose} task={popupTask} />
    </LocalizationProvider>
  );
}

export default App;
