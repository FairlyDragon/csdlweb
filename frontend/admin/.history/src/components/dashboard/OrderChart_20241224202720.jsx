import { Box, Card, Typography, Button } from "@mui/material";
import { Download } from "@mui/icons-material";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Monday", orders: 320 },
  { name: "Tuesday", orders: 340 },
  { name: "Wednesday", orders: 350 },
  { name: "Thursday", orders: 330 },
  { name: "Saturday", orders: 340 },
];

const CustomTooltip = (active, payload) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          bgcolor: "#fff",
          p: 2,
          boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.08)",
          borderRadius: 2,
          minWidth: "120px",
        }}
      >
        <Typography
          sx={{
            color: "#212B36",
            fontSize: "0.875rem",
            fontWeight: 600,
            mb: 0.5,
          }}
        >
          {payload[0].value} Order
        </Typography>
        <Typography
          sx={{
            color: "#637381",
            fontSize: "0.75rem",
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
            variant="h4"
            sx={{
              color: "#464255",
              fontSize: 24,
              fontFamily: "Barlow",
              fontWeight: 700,
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
            fontFamily: "Cairo",
            fontWeight: 700,
            gap: 1,
            "&:hover": {
              backgroundColor: "rgba(45, 156, 219, 0.08)",
            },
          }}
        >
          Save Report
        </Button>
      </Box>

      {/* Chart Area */}
      <Box sx={{ height: 300, mt: 4 }}>
        <ResponsiveLine
          data={[
            {
              id: "Orders",
              data: [
                { x: "Sunday", y: 30 },
                { x: "Monday", y: 45 },
                { x: "Tuesday", y: 55 },
                { x: "Wednesday", y: 35 },
                { x: "Thursday", y: 40 },
                { x: "Friday", y: 50 },
                { x: "Saturday", y: 60 },
              ],
            },
          ]}
          margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
          curve="natural"
          enableArea={true}
          areaBaselineValue={0}
          areaOpacity={0.12}
          colors={["#2D9CDB"]}
          pointSize={3}
          pointColor="#2D9CDB"
          pointBorderWidth={2}
          pointBorderColor="#fff"
          enableGridX={false}
          gridYValues={5}
          axisLeft={{
            tickSize: 0,
            tickValues: 5,
            tickPadding: 10,
            format: (v) => `${v}`,
            tickTextColor: "#A3A3A3",
          }}
          axisBottom={{
            tickSize: 0,
            tickPadding: 10,
            tickTextColor: "#464255",
          }}
          enableCrosshair={true}
          crosshairType="x"
          tooltip={({ point }) => (
            <Box
              sx={{
                p: 1.5,
                bgcolor: "white",
                boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
                borderRadius: 1,
                minWidth: 120,
              }}
            >
              <Typography
                sx={{
                  color: "#464255",
                  fontSize: 16,
                  fontFamily: "Cairo",
                  fontWeight: 700,
                }}
              >
                {point.data.y} Order
              </Typography>
              <Typography
                sx={{
                  color: "#B9BBBD",
                  fontSize: 14,
                  fontFamily: "Barlow",
                  lineHeight: "21px",
                }}
              >
                Oct 18th, 2023
              </Typography>
            </Box>
          )}
        />
      </Box>
    </Card>
  );
}
