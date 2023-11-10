import {
  ThemeProvider,
  CssBaseline,
  createTheme,
  Container,
  Box,
  Button,
  Switch,
  FormControlLabel,
} from '@mui/material';
import Header from './components/Header';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container disableGutters={true} sx={{ height: '100vh', width: '100%' }}>
        <Header />
      </Container>
    </ThemeProvider>
  );
}

export default App;
