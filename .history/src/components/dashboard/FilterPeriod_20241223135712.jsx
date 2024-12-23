import { useState } from 'react'
import { Button } from '@mui/material'
import { CalendarToday, KeyboardArrowDown } from '@mui/icons-material'

const formatDate = (date) => {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function FilterPeriod() {
  // setDate function is not used in this example, but would be used to update the date range
  const [date, setDate] = useState({
    from: new Date(2024, 10, 20),
    to: new Date(2024, 11, 25)
  })

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
      {`${formatDate(date.from)} - ${formatDate(date.to)}`}
    </Button>
  )
}

