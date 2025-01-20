import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import banner from '../../assets/slidebar/banner.svg';
const AddMenuContainer = styled(Box)({
  width: '100%',
  height: 135, // Reduced from 149px
  background: '#00B074',
  boxShadow: '0px 15px 20px rgba(70.31, 6.17, 80.75, 0.12)',
  borderRadius: 10,
  position: 'relative',
  padding: '19px 27px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const AddMenuButton = styled(Button)({
  width: 116,
  height: 37,
  background: '#F2F5F3',
  borderRadius: 5,
  color: '#464255',
  fontSize: 15,
  fontFamily: 'Barlow, sans-serif',
  fontWeight: 500,
  lineHeight: '24px',
  textTransform: 'none',
  '&:hover': {
    background: '#E5E8E6',
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
          maxWidth: 149,
        }}
      >
        Please, organize your<br />
        menus through button<br />
        bellow!
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <AddMenuButton>
          +Add Menus
        </AddMenuButton>
        <Box
          component="img"
          src={banner}
          alt="Menu illustration"
          sx={{
            width: 70,
            height: 85,
            position: 'absolute',
            right: 20,
            bottom: 27,
          }}
        />
      </Box>
    </AddMenuContainer>
  );
}

