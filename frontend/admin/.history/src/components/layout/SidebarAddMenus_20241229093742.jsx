import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import banner from '../../assets/slidebar/banner.svg';

const AddMenuContainer = styled(Box)({
  width: '95%',
  height: 120,
  background: '#00B074',
  boxShadow: '0px 15px 20px rgba(70.31, 6.17, 80.75, 0.12)',
  borderRadius: 10,
  position: 'relative',
  padding: '16px 20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const AddMenuButton = styled(Button)({
  width: 100,
  height: 32,
  background: '#F2F5F3',
  borderRadius: 5,
  color: '#464255',
  fontSize: 13,
  fontFamily: 'Barlow, sans-serif',
  fontWeight: 400,
  lineHeight: '20px',
  textTransform: 'none',
  opacity: 0.9,
  '&:hover': {
    background: '#E5E8E6',
    opacity: 1
  },
});

export default function SidebarAddMenus() {
  return (
    <AddMenuContainer>
      <Typography
        sx={{
          color: 'white',
          fontSize: 12,
          fontFamily: 'Barlow, sans-serif',
          fontWeight: 500,
          lineHeight: '20px',
          maxWidth: 130,
          mb: 1
        }}
      >
        Please, organize your<br />
        menus through button<br />
        bellow!
      </Typography>
      <Box sx={{ display: 'flex', position: 'relative' }}>
        <AddMenuButton>
          +Add Menus
        </AddMenuButton>
        <Box
          component="img"
          src={banner}
          alt="Menu illustration"
          sx={{
            width: 60,
            height: 75,
            position: 'absolute',
            right: 0,
            bottom: -16,
          }}
        />
      </Box>
    </AddMenuContainer>
  );
}

