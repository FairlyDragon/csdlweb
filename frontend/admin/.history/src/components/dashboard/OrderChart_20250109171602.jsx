import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Box, Card, Typography, Select, MenuItem, Button } from "@mui/material";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { dashboardService } from "../../services/DashBoardService";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { Download, PictureAsPdf } from "@mui/icons-material";

const OrderChart = () => {
  const [period, setPeriod] = useState("daily");
  const [data, setData] = useState([]);

  const fetchData = useCallback(async (periodicity) => {
    try {
      const validPeriodicity = periodicity || "daily";
      const response = await dashboardService.getTotalOrders(validPeriodicity);

      let formattedData;
      switch (validPeriodicity) {
        case "daily":
          formattedData = response.map((value, index) => ({
            name: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index],
            orders: value,
          }));
          break;

        case "weekly":
          formattedData = response.map((value, index) => ({
            name: `Week ${index + 1}`,
            orders: value,
          }));
          break;

        case "monthly":
          formattedData = response.map((value, index) => ({
            name: new Date(2024, index, 1).toLocaleDateString("en-US", {
              month: "short",
            }),
            orders: value,
          }));
          break;

        default:
          formattedData = [];
      }

      setData(formattedData);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData(period);
  }, [period, fetchData]);

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
  };

  const handleSavePDF = () => {
    const doc = new jsPDF();
    doc.text("Total Orders Report", 14, 10);
    autoTable(doc, {
      head: [["Period", "Orders"]],
      body: data.map((item) => [item.name, item.orders]),
    });
    doc.save(`total_orders_${period}.pdf`);
  };

  const handleSaveExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Total Orders");
    XLSX.writeFile(workbook, `total_orders_${period}.xlsx`);
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
            Total Orders
          </Typography>
          <Typography
            sx={{
              fontSize: "13px",
              color: "#6B7280",
              lineHeight: 1.5,
            }}
          >
            The number of orders by {period}
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
                borderColor: "#2563EB",
                borderRadius: "8px",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#2563EB",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#2563EB",
              },
              color: "#2563EB",
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
              minWidth: 40,
              height: 36,
              borderColor: "#2563EB",
              color: "#2563EB",
              borderRadius: "8px",
              padding: "8px",
              "&:hover": {
                borderColor: "#2563EB",
                backgroundColor: "rgba(37, 99, 235, 0.08)",
              },
            }}
            PDF
          />

          <Button
            variant="outlined"
            size="small"
            startIcon={<Download />}
            onClick={handleSaveExcel}
            sx={{
              minWidth: 40,
              height: 36,
              borderColor: "#2563EB",
              color: "#2563EB",
              borderRadius: "8px",
              padding: "8px",
              "&:hover": {
                borderColor: "#2563EB",
                backgroundColor: "rgba(37, 99, 235, 0.08)",
              },
            }}
          />
        </Box>
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
              type="monotone"
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

OrderChart.propTypes = {};

export default OrderChart;
