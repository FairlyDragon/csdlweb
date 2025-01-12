import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export default function CustomerReport() {
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState(null);

  const handleReset = () => {
    setSearch('');
    setDateRange(null);
  };

  return (
    <>
      {/* Search and Filter */}
      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        mb: 3,
        alignItems: 'center'
      }}>
        <TextField
          placeholder="Search by ID/Name/Phone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: 1 }}
          size="small"
        />
        <DatePicker 
          label="Select Date"
          value={dateRange}
          onChange={(newValue) => setDateRange(newValue)}
          sx={{ width: 200 }}
          slotProps={{ textField: { size: 'small' } }}
        />
        <Button 
          onClick={handleReset}
          sx={{ 
            color: '#00A76F',
            borderColor: '#00A76F',
            '&:hover': {
              borderColor: '#00A76F',
              backgroundColor: 'rgba(0, 167, 111, 0.08)'
            }
          }}
          variant="outlined"
        >
          Reset
        </Button>
        <Button
          startIcon={<FileDownloadIcon />}
          sx={{
            bgcolor: '#00A76F',
            color: 'white',
            '&:hover': {
              bgcolor: '#00875C'
            }
          }}
          variant="contained"
        >
          Save Report
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#F4F6F8' }}>
              <TableCell>ID</TableCell>
              <TableCell>NAME</TableCell>
              <TableCell>ADDRESS</TableCell>
              <TableCell>DATE</TableCell>
              <TableCell>Total Order</TableCell>
              <TableCell>Total Purchase</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Sample data - replace with your actual data */}
            <TableRow>
              <TableCell>C0001</TableCell>
              <TableCell>Nguyen Van A</TableCell>
              <TableCell>334 Nguyen Trai</TableCell>
              <TableCell>04 Sep 2024</TableCell>
              <TableCell>31</TableCell>
              <TableCell>$100</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Summary */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'flex-end', 
        gap: 4, 
        mt: 2,
        p: 2
      }}>
        <Typography>
          Total Order: <strong>100</strong>
        </Typography>
        <Typography>
          Total Purchase: <strong>$999999</strong>
        </Typography>
      </Box>
    </>
  );
}
