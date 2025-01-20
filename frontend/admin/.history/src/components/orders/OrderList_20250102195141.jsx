import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Select,
  MenuItem,
  Button,
  Pagination
} from '@mui/material'
import { FilterList } from '@mui/icons-material'

export function OrderList({ onOrderSelect }) {
  // Mock data - replace with actual data fetching
  const orders = [
    { order_id: '00001', status: 'completed' },
    { order_id: '00002', status: 'processing' },
    { order_id: '00003', status: 'rejected' }
  ]

  return (
    <Box>
      <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
        Order List
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Select size="small" defaultValue="date" sx={{ minWidth: 120 }}>
          <MenuItem value="date">Date</MenuItem>
        </Select>
        <Select size="small" defaultValue="type" sx={{ minWidth: 120 }}>
          <MenuItem value="type">Order Type</MenuItem>
        </Select>
        <Select size="small" defaultValue="status" sx={{ minWidth: 120 }}>
          <MenuItem value="status">Order Status</MenuItem>
        </Select>
        <Button startIcon={<FilterList />} variant="outlined">
          Reset Filter
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
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
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination count={10} color="primary" />
      </Box>
    </Box>
  )
}

