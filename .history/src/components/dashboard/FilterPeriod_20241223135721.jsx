import { useState } from 'react'
import { Button } from '@mui/material'
import { CalendarToday, KeyboardArrowDown } from '@mui/icons-material'

export default function FilterPeriod() {
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
      Filter Period
    </Button>
  )
}

