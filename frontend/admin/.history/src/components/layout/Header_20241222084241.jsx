import { Box, InputBase, Badge, Avatar, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const SearchWrapper = styled('div')({
  position: 'relative',
  width: '100%',
  maxWidth: 480,
});

const SearchIconWrapper = styled('div')({
  position: 'absolute',
  left: 16,
  top: '50%',
  transform: 'translateY(-50%)',
  pointerEvents: 'none',
  color: '#919EAB',
  display: 'flex',
});

const StyledInputBase = styled(InputBase)({
  width: '100%',
  '& .MuiInputBase-input': {
    padding: '12px 16px 12px 44px',
    backgroundColor: '#F4F6F8',
    borderRadius: 8,
    fontSize: 14,
    width: '100%',
    '&::placeholder': {
      color: '#919EAB',
      opacity: 1,
    },
  },
});

const IconButton = styled(Box)({
  width: 40,
  height: 40,
  borderRadius: 8,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  color: '#637381',
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: '#F4F6F8',
  },
});

const FilterButton = styled(Button)({
  backgroundColor: '#fff',
  color: '#212B36',
  border: '1px solid #E5E8EB',
  borderRadius: 8,
  padding: '6px 12px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#F4F6F8',
  },
});

export default function Header(dateRange) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        py: 2,
        px: 3,
        backgroundColor: '#F8F9FD',
      }}
    >
      <SearchWrapper>
        <SearchIconWrapper>
          <SearchIcon sx={{ fontSize: 20 }} />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search in here"
          inputProps={{ 'aria-label': 'search' }}
        />
      </SearchWrapper>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <FilterButton
          startIcon={<CalendarTodayIcon sx={{ fontSize: 20 }} />}
          endIcon={<KeyboardArrowDownIcon />}
        >
          {dateRange.start} - {dateRange.end}
        </FilterButton>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton>
            <Badge 
              badgeContent={2} 
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: '#2065D1',
                  color: '#fff',
                  minWidth: 20,
                  height: 20,
                }
              }}
            >
              <EmailOutlinedIcon sx={{ fontSize: 20 }} />
            </Badge>
          </IconButton>
          
          <IconButton>
            <Badge 
              badgeContent={3}
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: '#2065D1',
                  color: '#fff',
                  minWidth: 20,
                  height: 20,
                }
              }}
            >
              <NotificationsNoneIcon sx={{ fontSize: 20 }} />
            </Badge>
          </IconButton>
          
          <IconButton>
            <Badge 
              badgeContent={5}
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: '#FF4842',
                  color: '#fff',
                  minWidth: 20,
                  height: 20,
                }
              }}
            >
              <ShoppingCartOutlinedIcon sx={{ fontSize: 20 }} />
            </Badge>
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ textAlign: 'right' }}>
            <Box sx={{ fontSize: 14, fontWeight: 600, color: '#212B36' }}>
              Hello, Admin
            </Box>
          </Box>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: '#919EAB',
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            A
          </Avatar>
        </Box>
      </Box>
    </Box>
  );
}

