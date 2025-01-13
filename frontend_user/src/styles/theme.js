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
    fontFamily: '"Montserrat", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
    },
    // ... other typography settings
  },
});

export default theme;