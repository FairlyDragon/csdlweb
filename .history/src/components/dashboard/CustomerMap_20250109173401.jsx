import { useState } from "react";
import PropTypes from "prop-types";
import { Box, Card, Typography, Select, MenuItem } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const generateData = (period) => {
  switch (period) {
    case "day":
      return [
        { name: "Sun", customers: 20 },
        { name: "Mon", customers: 35 },
        { name: "Tue", customers: 25 },
        { name: "Wed", customers: 35 },
        { name: "Thu", customers: 45 },
        { name: "Fri", customers: 30 },
        { name: "Sat", customers: 20 },
      ];
    case "week":
      return Array.from({ length: 4 }, (_, i) => ({
        name: `Week ${i + 1}`,
        customers: Math.floor(Math.random() * 30) + 20,
      }));
    case "month":
      return Array.from({ length: 12 }, (_, i) => ({
        name: new Date(2024, i, 1).toLocaleDateString("en-US", {
          month: "short",
        }),
        customers: Math.floor(Math.random() * 40) + 15,
      }));
    default:
      return [];
  }
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.[0]) {
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
          {payload[0].payload.name}
        </Typography>
      </Box>
    );
  }
  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      payload: PropTypes.shape({
        name: PropTypes.string,
      }),
    })
  ),
};

CustomTooltip.defaultProps = {
  active: false,
  payload: [],
};

export default function CustomerMap() {
  const [period, setPeriod] = useState("week");
  const data = generateData(period);

  return (
    <Card
      sx={{
        p: 3,
        height: "100%",
        width: "100%",
        borderRadius: "24px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: 18,
            fontWeight: 600,
            color: "#212B36",
          }}
        >
          Customer Map
        </Typography>

        <Select
          size="small"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
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
              borderColor: "#4ADE80",
            },
          }}
        >
          <MenuItem value="day">Daily</MenuItem>
          <MenuItem value="week">Weekly</MenuItem>
          <MenuItem value="month">Monthly</MenuItem>
        </Select>
      </Box>

      <Box sx={{ height: 240, width: "100%", mt: 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
            barSize={24}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(145, 158, 171, 0.2)"
            />
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
              tickCount={5}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(74, 222, 128, 0.1)" }}
            />
            <Bar dataKey="customers" fill="#4ADE80" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
}
