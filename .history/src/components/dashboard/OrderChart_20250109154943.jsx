import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  Typography,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { dashboardService } from "../../services/DashBoardService";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const OrderChart = () => {
  const [period, setPeriod] = useState("daily");
  const [data, setData] = useState([]);

  const fetchData = async (periodicity) => {
    try {
      const response = await dashboardService.getTotalOrders(periodicity);
      const formattedData = response.map((value, index) => ({
        name: getLabel(periodicity, index),
        orders: value,
      }));
      setData(formattedData);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  const getLabel = (periodicity, index) => {
    switch (periodicity) {
      case "daily":
        return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][index];
      case "weekly":
        return `Week ${index + 1}`;
      case "monthly":
        return new Date(2024, index, 1).toLocaleDateString("en-US", {
          month: "short",
        });
      default:
        return "";
    }
  };

  useEffect(() => {
    fetchData(period);
  }, [period]);

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
  };

  const handleSavePDF = () => {
    const doc = new jsPDF();
    doc.text("Total Orders", 14, 10);
    autoTable(doc, {
      head: [["Period", "Orders"]],
      body: data.map((item) => [item.name, item.orders]),
    });
    doc.save("total_orders.pdf");
  };

  const handleSaveExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Total Orders");
    XLSX.writeFile(workbook, "total_orders.xlsx");
  };

  return (
    <Card
      sx={{
        p: 3,
        borderRadius: "24px",
        bgcolor: "#FFFFFF",
        boxShadow:
const generateData = (period) => {
  switch (period) {
    case "day":
      return [
        { name: "Sun", orders: 320 },
        { name: "Mon", orders: 350 },
        { name: "Tue", orders: 456 },
        { name: "Wed", orders: 380 },
        { name: "Thu", orders: 410 },
        { name: "Fri", orders: 490 },
        { name: "Sat", orders: 430 },
      ];
    case "week":
      return Array.from({ length: 4 }, (_, i) => ({
        name: `Week ${i + 1}`,
        orders: Math.floor(Math.random() * 200) + 300,
      }));
    case "month":
      return Array.from({ length: 12 }, (_, i) => ({
        name: new Date(2024, i, 1).toLocaleDateString("en-US", {
          month: "short",
        }),
        orders: Math.floor(Math.random() * 300) + 200,
      }));
    default:
      return [];
  }
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
        {`${payload[0].value} Orders`}
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

const OrderChart = () => {
  const [period, setPeriod] = useState("day");
  const data = generateData(period);

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
  };

  return (
    <Card
      sx={{
        p: 3,
        borderRadius: "24px",
        bgcolor: "#FFFFFF",
        boxShadow:
          "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)",
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
            Total Orders
          </Typography>
          <Typography
            sx={{
              fontSize: "13px",
              color: "#6B7280",
              lineHeight: 1.5,
            }}
          >
            The number of orders by {period}.
          </Typography>
        </Box>

        <Select
          size="small"
          value={period}
          onChange={handlePeriodChange}
          sx={{
            minWidth: 100,
            height: 32,
            fontSize: "13px",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#E5E7EB",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#E5E7EB",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#2563EB",
            },
          }}
        >
          <MenuItem value="day">Daily</MenuItem>
          <MenuItem value="week">Weekly</MenuItem>
          <MenuItem value="month">Monthly</MenuItem>
        </Select>
      </Box>

      <Box sx={{ height: 120, mx: -3 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 25, left: 25, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#9CA3AF",
                fontSize: 11,
              }}
              dy={8}
              interval={0}
              tickMargin={5}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Area
              type="natural"
              dataKey="orders"
              stroke="#2563EB"
              strokeWidth={2}
              fill="url(#colorOrders)"
              dot={{
                r: 4,
                fill: "#FFFFFF",
                stroke: "#2563EB",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 6,
                fill: "#FFFFFF",
                stroke: "#2563EB",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
};

OrderChart.propTypes = {};

export default OrderChart;
