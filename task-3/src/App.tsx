import { useEffect, useState } from 'react';
import { IDateRange, ITask } from './types';
import {
  Box,
  CircularProgress,
  Container,
  Pagination,
  // Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import getUnfinishedTasks from './utils/getUnfinishedTasks';
import useFetch from './hooks/useFetch';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TaskList from './components/TaskList';
import Popup from './components/Popup';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import getTasksSortedByDate from './utils/getTasksSortedByDate';
import getIndexesByPage from './utils/getIndexesByPage';

function App() {
  const [APIParameters, setAPIParameters] = useState<string>('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [areUnfinishedShown, setAreUnfinishedShown] = useState<boolean>(false);
  const [currentSortOption, setCurrentSortOption] = useState<string>('none');
  const [popupTask, setPopupTask] = useState<ITask | undefined>();
  const [dateRange, setDateRange] = useState<IDateRange>({
    from: undefined,
    to: undefined,
  });
  const { data, isLoading } = useFetch(APIParameters); // data from api. don't mutate it
  const [currentData, setCurrentData] = useState<ITask[] | null>(null); // data to show. aka page
  const [sortedData, setSortedData] = useState<ITask[] | null>(null); // data sorted on our side

  const [currentPage, setCurrentPage] = useState<number>(1); // current page num
  const [pageQty, setPageQty] = useState<number>(1); // total number of pages

  useEffect(() => {
    if (data) setSortedData(data);
  }, [data]);

  useEffect(() => {
    if (sortedData) setPageQty(Math.ceil(sortedData.length / 10));
  }, [sortedData]);

  useEffect(() => {
    const [firstItemIndex, lastItemIndex] = getIndexesByPage(currentPage, 10);
    const pageData = sortedData?.slice(firstItemIndex, lastItemIndex);

    if (pageData) setCurrentData(pageData);
  }, [currentPage, sortedData]);

  useEffect(() => {
    setCurrentPage(1);

    if (currentSortOption === 'none' && !areUnfinishedShown) {
      setSortedData(data);
    }

    if (currentSortOption === 'none' && areUnfinishedShown) {
      setSortedData(getUnfinishedTasks(data));
    }

    if (currentSortOption !== 'none' && areUnfinishedShown) {
      setSortedData(
        getTasksSortedByDate(getUnfinishedTasks(data), currentSortOption)
      );
    }

    if (currentSortOption !== 'none' && !areUnfinishedShown) {
      setSortedData(getTasksSortedByDate(data, currentSortOption));
    }
  }, [currentSortOption, areUnfinishedShown, data]);

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  function handlePopupClose() {
    setIsPopupOpen(false);
  }

  function handleSortByDate(option: string) {
    setCurrentSortOption(option);
  }

  function handleToggle() {
    setAreUnfinishedShown(!areUnfinishedShown);
  }

  function handleShowTodayTasks() {
    const todayStart = new Date();
    const todayEnd = new Date();

    todayStart.setHours(0, 0, 0, 1);
    todayEnd.setHours(23, 59, 59, 999);

    const query = `/date?from=${new Date(todayStart).getTime()}&to=${new Date(
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

    const query = `/date?from=${new Date(dayWeekAgo).getTime()}&to=${new Date(
      today
    ).getTime()}`;

    setAPIParameters(query);
  }

  function handleShowTaskInRange(dateRange: IDateRange) {
    setDateRange(dateRange);

    let fromDate = new Date(
      new Date().setFullYear(new Date().getFullYear() - 5)
    );
    fromDate.setHours(0, 0, 0, 1); // default value

    let toDate = new Date();
    toDate.setHours(23, 59, 59, 999); // default value

    if (dateRange.from) {
      fromDate = new Date(dateRange.from);
      fromDate.setHours(0, 0, 0, 1);
    }

    if (dateRange.to) {
      toDate = new Date(dateRange.to);
      toDate.setHours(23, 59, 59, 999);
    }

    const query = `/date?from=${new Date(fromDate).getTime()}&to=${new Date(
      toDate
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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container disableGutters={true} sx={{ height: '100vh', width: '100%' }}>
        <Header onClick={handleTaskCardClick} />
        <Container disableGutters sx={{ display: 'flex', py: '30px' }}>
          <Sidebar
            areUnfinishedShown={areUnfinishedShown}
            onToggle={handleToggle}
            onToday={handleShowTodayTasks}
            onThisWeek={handleShowWeekTasks}
            onDateRange={handleShowTaskInRange}
            dateRange={dateRange}
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
                onChange={(_, page) => handlePageChange(page)}
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
