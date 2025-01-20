import { Box } from '@mui/material';
import Header from '../components/Header';

const CustomerLayout = ({ children }) => {
  return (
    <Box>
      <Header />
      {children}
    </Box>
  );
};

export default CustomerLayout;