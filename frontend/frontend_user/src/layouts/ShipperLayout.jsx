import { Box } from '@mui/material';
import Header from '../components/Header';

const ShipperLayout = ({ children }) => {
  return (
    <Box>
      <Header />
      {children}
    </Box>
  );
};

export default ShipperLayout;