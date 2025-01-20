import { useState, useEffect, useCallback } from "react";
import { Box, Card, Typography, Select, MenuItem, Button } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { dashboardService } from "../../services/DashBoardService";
import { Download, PictureAsPdf } from "@mui/icons-material";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import PropTypes from "prop-types";

const CustomerMap = () => {
  const [period, setPeriod] = useState("weekly");
  const [data, setData] = useState([]);

  const fetchData = useCallback(async (periodicity) => {
    try {
      const validPeriodicity = periodicity || "weekly";
      const response = await dashboardService.getCustomersMap(validPeriodicity);

      let formattedData;
      switch (validPeriodicity) {
        case "daily":
          formattedData = response.map((value, index) => ({
            name: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index],
            customers: value,
          }));
          break;

        case "weekly":
          formattedData = response.map((value, index) => ({
            name: `Week ${index + 1}`,
            customers: value,
          }));
          break;

        case "monthly":
          formattedData = response.map((value, index) => ({
            name: new Date(2024, index, 1).toLocaleDateString("en-US", {
              month: "short",
            }),
            customers: value,
          }));
          break;

        default:
          formattedData = [];
      }

      setData(formattedData);
    } catch (error) {
      console.error("Error fetching customer map data:", error);
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
    doc.text("Customer Map Report", 14, 10);
    autoTable(doc, {
      head: [["Period", "Customers"]],
      body: data.map((item) => [item.name, item.customers]),
    });
    doc.save(`customer_map_${period}.pdf`);
  };

  const handleSaveExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customer Map");
    XLSX.writeFile(workbook, `customer_map_${period}.xlsx`);
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
            Customer Map
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Select
            size="small"
            value={period}
            onChange={handlePeriodChange}
            sx={{
              minWidth: 75,
              height: 36,
              fontSize: "14px",
              bgcolor: "#FFFFFF",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#10B981",
                borderRadius: "8px",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#10B981",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#10B981",
              },
              color: "#10B981",
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
              minWidth: 25,
              height: 36,
              borderColor: "#10B981",
              color: "#10B981",
              borderRadius: "8px",
              padding: "8px",
              "&:hover": {
                borderColor: "#10B981",
                backgroundColor: "rgba(16, 185, 129, 0.08)",
              },
            }}
          />

          <Button
            variant="outlined"
            size="small"
            startIcon={<Download />}
            onClick={handleSaveExcel}
            sx={{
              minWidth: 25,
              height: 36,
              borderColor: "#10B981",
              color: "#10B981",
              borderRadius: "8px",
              padding: "8px",
              "&:hover": {
                borderColor: "#10B981",
                backgroundColor: "rgba(16, 185, 129, 0.08)",
              },
            }}
          />
        </Box>
      </Box>

      <Box sx={{ height: 320, mx: -3 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
          >
            <XAxis
              dataKey="name"
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
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(16, 185, 129, 0.08)" }}
            />
            <Bar
              dataKey="customers"
              fill="#10B981"
              radius={[4, 4, 0, 0]}
              barSize={40}
            />
          </BarChart>
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
        {`${payload[0].value} Customers`}
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

export default CustomerMap;
