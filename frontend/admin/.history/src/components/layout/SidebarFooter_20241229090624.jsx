import { Box, Typography } from '@mui/material';

export default function SidebarFooter() {
  return (
    <Box sx={{ width: '100%', textAlign: 'center', mt: 2 }}>
      <Typography sx={{ fontSize: 10, color: '#454F5B', mb: 0.5 }}>
        FairyDragon Restaurant Admin Dashboard
      </Typography>
      <Typography sx={{ fontSize: 10, color: '#637381' }}>
        © 2024 All Rights Reserved
      </Typography>
      <Typography sx={{ fontSize: 10, color: '#637381', mt: 0.5 }}>
        Made by FairyDragon team
      </Typography>
    </Box>
  );
}

