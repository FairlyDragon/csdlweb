import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Box, Card, Typography, Select, MenuItem, Button } from "@mui/material";
import { Download, PictureAsPdf } from "@mui/icons-material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";
import { dashboardService } from "../../services/DashBoardService";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const RevenueChart = () => {
  const [period, setPeriod] = useState("daily");
  const [data, setData] = useState([]);

  const fetchData = useCallback(async (periodicity) => {
    try {
      const validPeriodicity = periodicity || "daily";
      const response = await dashboardService.getTotalRevenue(validPeriodicity);

      let formattedData;
      switch (validPeriodicity) {
        case "daily":
          formattedData = response.map((value, index) => ({
            date: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index],
            revenue: value,
          }));
          break;

        case "weekly":
          formattedData = response.map((value, index) => ({
            date: `Week ${index + 1}`,
            revenue: value,
          }));
          break;

        case "monthly":
          formattedData = response.map((value, index) => ({
            date: new Date(2024, index, 1).toLocaleDateString("en-US", {
              month: "short",
            }),
            revenue: value,
          }));
          break;

        default:
          formattedData = [];
      }

      setData(formattedData);
    } catch (error) {
      console.error("Error fetching revenue data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData(period);
  }, [period, fetchData]);

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
  };

  const getYAxisTickFormatter = (value) => {
    return `$${value}`;
  };

  const getYAxisDomain = () => {
    switch (period) {
      case "daily":
        return [0, 1000];
      case "weekly":
        return [500, 5000];
      case "monthly":
        return [2000, 15000];
      default:
        return [0, 1000];
    }
  };

  const handleSavePDF = () => {
    const doc = new jsPDF();
    doc.text("Total Revenue Report", 14, 10);
    autoTable(doc, {
      head: [["Period", "Revenue ($)"]],
      body: data.map((item) => [item.date, item.revenue]),
    });
    doc.save(`total_revenue_${period}.pdf`);
  };

  const handleSaveExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Total Revenue");
    XLSX.writeFile(workbook, `total_revenue_${period}.xlsx`);
  };

  return (
    <Card
      sx={{
        p: 3,
        borderRadius: "24px",
        bgcolor: "#FFFFFF",
        boxShadow:
          "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 3,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 600,
              color: "#111827",
              mb: 0.5,
            }}
          >
            Total Revenue
          </Typography>
          <Typography
            sx={{
              fontSize: "13px",
              color: "#6B7280",
              lineHeight: 1.5,
            }}
          >
            The total revenue by {period}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Select
            size="small"
            value={period}
            onChange={handlePeriodChange}
            sx={{
              minWidth: 100,
              height: 36,
              fontSize: "14px",
              bgcolor: "#FFFFFF",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FF4842",
                borderRadius: "8px",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FF4842",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FF4842",
              },
              color: "#FF4842",
            }}
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
          </Select>

          <Button
            variant="outlined"
            size="small"
            startIcon={<PictureAsPdf />}
            onClick={handleSavePDF}
            sx={{
              height: 32,
              borderColor: "#FF4842",
              color: "#FF4842",
              "&:hover": {
                borderColor: "#FF4842",
                backgroundColor: "rgba(255, 72, 66, 0.08)",
              },
            }}
          >
            PDF
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Download />}
            onClick={handleSaveExcel}
            sx={{
              height: 32,
              borderColor: "#FF4842",
              color: "#FF4842",
              "&:hover": {
                borderColor: "#FF4842",
                backgroundColor: "rgba(255, 72, 66, 0.08)",
              },
            }}
          >
            Excel
          </Button>
        </Box>
      </Box>

      <Box sx={{ height: 320, mx: -3 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF4842" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#FF4842" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(145, 158, 171, 0.2)"
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#919EAB", fontSize: 11 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#919EAB", fontSize: 11 }}
              dx={-10}
              tickFormatter={getYAxisTickFormatter}
              domain={getYAxisDomain()}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#FF4842"
              strokeWidth={2}
              dot={{
                r: 4,
                fill: "#FF4842",
                strokeWidth: 2,
                stroke: "#fff",
              }}
              activeDot={{
                r: 6,
                fill: "#FF4842",
                strokeWidth: 2,
                stroke: "#fff",
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="none"
              fill="url(#colorRevenue)"
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        p: "8px 12px",
        boxShadow:
          "0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)",
        borderRadius: "8px",
        border: "1px solid #F2F4F7",
      }}
    >
      <Typography
        sx={{
          fontSize: "13px",
          fontWeight: 500,
          color: "#111827",
          mb: 0.25,
        }}
      >
        {`$${payload[0].value}`}
      </Typography>
      <Typography
        sx={{
          fontSize: "11px",
          color: "#6B7280",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
    })
  ),
  label: PropTypes.string,
};

CustomTooltip.defaultProps = {
  active: false,
  payload: null,
  label: "",
};

export default RevenueChart;
