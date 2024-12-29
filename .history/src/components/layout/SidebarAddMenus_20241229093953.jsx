import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import banner from '../../assets/slidebar/banner.svg';

const AddMenuContainer = styled(Box)({
  width: '95%',
  height: 110,
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
  width: 95,
  height: 30,
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
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Typography
          sx={{
            color: 'white',
            fontSize: 12,
            fontFamily: 'Barlow, sans-serif',
            fontWeight: 500,
            lineHeight: '20px',
            maxWidth: 120,
            mb: 1,
            pr: 1
          }}
        >
          Please, organize your<br />
          menus through button<br />
          bellow!
        </Typography>
        <Box
          component="img"
          src={banner}
          alt="Menu illustration"
          sx={{
            width: 45,
            height: 55,
            mt: -0.5,
            mr: -1
          }}
        />
      </Box>
      <AddMenuButton>
        +Add Menus
      </AddMenuButton>
    </AddMenuContainer>
  );
}

