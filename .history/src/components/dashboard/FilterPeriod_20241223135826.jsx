import { Button } from '@mui/material'
import { CalendarToday, KeyboardArrowDown } from '@mui/icons-material'

const formatDate = (date) => {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

const dateRange = {
  from: new Date(2024, 10, 20),
  to: new Date(2024, 11, 25)
}

export default function FilterPeriod() {
  return (
    <Button
      variant="outlined"
      startIcon={<CalendarToday />}
      endIcon={<KeyboardArrowDown />}
      sx={{
        color: '#212B36',
        borderColor: '#E5E8EB',
        '&:hover': {
          borderColor: '#B6BEC8',
          bgcolor: 'rgba(33, 43, 54, 0.08)',
        },
      }}
    >
      {`${formatDate(dateRange.from)} - ${formatDate(dateRange.to)}`}
    </Button>
  )
}

