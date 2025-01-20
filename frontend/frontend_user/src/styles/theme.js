import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#D4A054', // Màu vàng đồng
      dark: '#C4904A',
      light: '#E3B76E'
    },
    secondary: {
      main: '#AE1C28', // Màu đỏ truyền thống
      dark: '#8B1621',
      light: '#C82432'
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFF9F0'
    }
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    h1: {
      fontFamily: 'Dancing Script, cursive',
    },
    h2: {
      fontFamily: 'Dancing Script, cursive',
    },
    h3: {
      fontFamily: 'Dancing Script, cursive',
    },
  },
  palette: {
    primary: {
      main: '#dd1d1d',
    },
  },
});

export default theme;