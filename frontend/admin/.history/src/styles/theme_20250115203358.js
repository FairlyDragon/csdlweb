import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 600,
    },
    subtitle2: {
      fontWeight: 600,
    },
    body1: {
      fontSize: '0.875rem',
    },
    body2: {
      fontSize: '0.75rem',
    },
  },
  palette: {
    primary: {
      main: '#00A76F',
      light: '#3FC79A',
      dark: '#007867',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#65B741',
      light: '#84D965',
      dark: '#4C8B31',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#FF5630',
      light: '#FF8F73',
      dark: '#B71D18',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#FFAB00',
      light: '#FFD666',
      dark: '#B76E00',
      contrastText: '#212B36',
    },
    info: {
      main: '#00B8D9',
      light: '#61F3F3',
      dark: '#006C9C',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#36B37E',
      light: '#86E8AB',
      dark: '#1B806A',
      contrastText: '#FFFFFF',
    },
    grey: {
      100: '#F9FAFB',
      200: '#F4F6F8',
      300: '#DFE3E8',
      400: '#C4CDD5',
      500: '#919EAB',
      600: '#637381',
      700: '#454F5B',
      800: '#212B36',
      900: '#161C24',
    },
    background: {
      default: '#F8F9FD',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#212B36',
      secondary: '#637381',
      disabled: '#919EAB',
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0px 1px 2px rgba(145, 158, 171, 0.16)',
    '0px 1px 4px rgba(145, 158, 171, 0.16)',
    '0px 1px 8px rgba(145, 158, 171, 0.16)',
    '0px 2px 8px rgba(145, 158, 171, 0.16)',
    '0px 4px 16px rgba(145, 158, 171, 0.16)',
    '0px 8px 24px rgba(145, 158, 171, 0.16)',
    '0px 12px 32px rgba(145, 158, 171, 0.16)',
    '0px 16px 48px rgba(145, 158, 171, 0.16)',
    '0px 24px 64px rgba(145, 158, 171, 0.16)',
  ],
});

export default theme;