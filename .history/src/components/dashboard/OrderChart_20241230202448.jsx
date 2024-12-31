import { useState } from "react";
import PropTypes from "prop-types";
import { Box, Card, Typography, Select, MenuItem } from "@mui/material";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";

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
        width: "100%",
        height: 300,
        p: 3,
        borderRadius: "14px",
        bgcolor: "#FFFFFF",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.04)",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 2,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: 700,
              color: "#464255",
              fontFamily: "Barlow",
              mb: 1,
            }}
          >
            Total Orders
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              color: "#B9BBBD",
              fontFamily: "Barlow",
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
            position: "absolute",
            top: 24,
            right: 24,
            height: 40,
            minWidth: 120,
            fontSize: "14px",
            fontFamily: "Inter",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#2D9CDB",
              borderRadius: "8px",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#2D9CDB",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#2D9CDB",
              borderWidth: 1,
            },
            "& .MuiSelect-select": {
              color: "#2D9CDB",
              fontWeight: 500,
            },
          }}
        >
          <MenuItem value="day">Daily</MenuItem>
          <MenuItem value="week">Weekly</MenuItem>
          <MenuItem value="month">Monthly</MenuItem>
        </Select>
      </Box>

      <Box
        sx={{
          height: 200,
          position: "relative",
          mx: -3,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 0, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2D9CDB" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity={1} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#464255",
                fontSize: 14,
                fontFamily: "Barlow",
                fontWeight: 400,
                lineHeight: "26px",
              }}
              dy={8}
              interval={0}
              tickMargin={5}
              padding={{ left: 30, right: 30 }}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Area
              type="natural"
              dataKey="orders"
              stroke="#2D9CDB"
              strokeWidth={3}
              fill="url(#colorOrders)"
              dot={{
                r: 6,
                fill: "#FFFFFF",
                stroke: "#2D9CDB",
                strokeWidth: 3,
              }}
              activeDot={{
                r: 8,
                fill: "#2D9CDB",
                stroke: "#FFFFFF",
                strokeWidth: 6,
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
