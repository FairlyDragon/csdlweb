import { Box, Card, Typography, Button } from "@mui/material";
import { Download } from "@mui/icons-material";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Monday", orders: 380 },
  { name: "Tuesday", orders: 456 },
  { name: "Wednesday", orders: 350 },
  { name: "Thursday", orders: 380 },
  { name: "Friday", orders: 400 },
  { name: "Saturday", orders: 400 },
  { name: "Sunday", orders: 380 },
];

const CustomTooltip = (active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          bgcolor: "#fff",
          p: 1.5,
          boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
          borderRadius: 2,
          border: "1px solid rgba(145, 158, 171, 0.12)",
        }}
      >
        <Typography sx={{ color: "#212B36", fontSize: 14, fontWeight: 600 }}>
          {payload[0].value} Order
        </Typography>
        <Typography sx={{ color: "#919EAB", fontSize: 12 }}>
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
        borderRadius: 4,
        bgcolor: "#fff",
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
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#212B36",
              fontSize: "1.25rem",
              mb: 0.5,
            }}
          >
            Chart Order
          </Typography>
          <Typography
            sx={{
              color: "#637381",
              fontSize: "0.875rem",
              fontWeight: 400,
            }}
          >
            The number of orders by day of the week
          </Typography>
        </Box>
        <Button
          startIcon={<Download sx={{ fontSize: 18 }} />}
          sx={{
            color: "#2065D1",
            bgcolor: "#fff",
            border: "1px solid #2065D1",
            "&:hover": {
              bgcolor: "rgba(32, 101, 209, 0.08)",
            },
            textTransform: "none",
            borderRadius: 1.5,
            px: 2,
            py: 0.75,
            fontSize: 13,
          }}
        >
          Save Report
        </Button>
      </Box>

      <Box
        sx={{
          height: 200,
          width: "100%",
        }}
      >
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2065D1" stopOpacity={0.16} />
                <stop offset="100%" stopColor="#2065D1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#919EAB",
                fontSize: 13,
                dy: 10,
                opacity: 0.6,
              }}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#919EAB",
                strokeDasharray: "4 4",
                strokeWidth: 1,
                opacity: 0.5,
              }}
            />
            <Area
              type="monotone"
              dataKey="orders"
              stroke="#2065D1"
              strokeWidth={2}
              fill="url(#colorOrders)"
              dot={{
                r: 3.5,
                fill: "#fff",
                stroke: "#2065D1",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 5,
                fill: "#2065D1",
                strokeWidth: 0,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
}
