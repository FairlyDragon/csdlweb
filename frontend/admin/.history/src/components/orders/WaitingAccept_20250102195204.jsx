import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Chip } from '@mui/material'

export function WaitingAccept({ onOrderSelect }) {
  // Mock data - replace with actual data fetching
  const waitingOrders = [
    { order_id: '00001', status: 'waiting' },
    { order_id: '00002', status: 'waiting' }
  ]

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="h2">
          Waiting to Accept
        </Typography>
        <Chip
          label={waitingOrders.length}
          color="error"
          size="small"
          sx={{ ml: 2 }}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {waitingOrders.map((order) => (
              <TableRow
                key={order.order_id}
                hover
                onClick={() => onOrderSelect(order)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>{order.order_id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

