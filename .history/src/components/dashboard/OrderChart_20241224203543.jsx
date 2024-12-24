import { Box, Card, Typography, Button } from "@mui/material";
import { Download } from "@mui/icons-material";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Monday", orders: 380 },
  { name: "Tuesday", orders: 400 },
  { name: "Wednesday", orders: 456 },
  { name: "Thursday", orders: 390 },
  { name: "Friday", orders: 430 },
  { name: "Saturday", orders: 450 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          bgcolor: "#fff",
          p: 2,
          boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
          borderRadius: 2,
          minWidth: "120px",
        }}
      >
        <Typography
          sx={{
            color: "#464255",
            fontSize: "16px",
            fontFamily: "Barlow",
            fontWeight: 600,
          }}
        >
          {payload[0].value} Order
        </Typography>
        <Typography
          sx={{
            color: "#B9BBBD",
            fontSize: "14px",
            fontFamily: "Barlow",
            lineHeight: "21px",
          }}
        >
          Oct 18th, 2023
        </Typography>
      </Box>
    );
  }
  return null;
};

export default function OrderChart() {
  return (
    <Card
      sx={{
        p: 3,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.04)",
        borderRadius: "14px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box>
          <Typography
            sx={{
              color: "#464255",
              fontSize: 24,
              fontFamily: "Barlow",
              fontWeight: 600,
            }}
          >
            Chart Order
          </Typography>
          <Typography
            sx={{
              color: "#B9BBBD",
              fontSize: 16,
              fontFamily: "Barlow",
              fontWeight: 400,
            }}
          >
            The number of orders by day of the week.
          </Typography>
        </Box>

        <Button
          startIcon={<Download />}
          sx={{
            color: "#2D9CDB",
            fontSize: 18,
            fontFamily: "Barlow",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "rgba(45, 156, 219, 0.08)",
            },
          }}
        >
          Save Report
        </Button>
      </Box>

      <Box sx={{ height: 120, mt: 2 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 0, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2D9CDB" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#2D9CDB" stopOpacity={0.01} />
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
              }}
              dy={10}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="orders"
              stroke="#2D9CDB"
              strokeWidth={2}
              fill="url(#colorOrders)"
              dot={{
                r: 3,
                fill: "#fff",
                stroke: "#2D9CDB",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 5,
                fill: "#2D9CDB",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
}
