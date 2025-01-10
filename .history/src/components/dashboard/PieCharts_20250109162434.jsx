import { useState, useEffect } from "react";
import {
  Box,
  Card,
  Typography,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { dashboardService } from "../../services/DashBoardService";

export default function PieCharts() {
  const [showChart, setShowChart] = useState(true);
  const [showValue, setShowValue] = useState(true);
  const [pieData, setPieData] = useState({
    total_order_percentage: 81,
    customer_growth_percentage: 22,
    total_revenue_percentage: 62,
  });

  useEffect(() => {
    const fetchPieData = async () => {
      try {
        const response = await dashboardService.getPieChart();
        setPieData(response);
      } catch (error) {
        console.error("Error fetching pie chart data:", error);
      }
    };
    fetchPieData();
  }, []);

  const data = [
    {
      name: "Total Order",
      value: pieData.total_order_percentage,
      color: "#FF6B6B",
      bgColor: "#FFF5F5",
    },
    {
      name: "Customer Growth",
      value: pieData.customer_growth_percentage,
      color: "#4ADE80",
      bgColor: "#F0FDF4",
    },
    {
      name: "Total Revenue",
      value: pieData.total_revenue_percentage,
      color: "#60A5FA",
      bgColor: "#EFF6FF",
    },
  ];

  return (
    <Card
      sx={{
        p: 3,
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        borderRadius: 3,
        height: "fit-content",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: "1.125rem",
            fontWeight: 600,
            color: "#212B36",
          }}
        >
          Pie Chart
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={showChart}
                onChange={(e) => setShowChart(e.target.checked)}
                sx={{
                  color: "#919EAB",
                  "&.Mui-checked": {
                    color: "#2065D1",
                  },
                }}
              />
            }
            label={
              <Typography sx={{ fontSize: "0.875rem", color: "#637381" }}>
                Chart
              </Typography>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={showValue}
                onChange={(e) => setShowValue(e.target.checked)}
                sx={{
                  color: "#919EAB",
                  "&.Mui-checked": {
                    color: "#2065D1",
                  },
                }}
              />
            }
            label={
              <Typography sx={{ fontSize: "0.875rem", color: "#637381" }}>
                Show Value
              </Typography>
            }
          />
          <IconButton size="small">
            <MoreVert sx={{ color: "#637381" }} />
          </IconButton>
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 2,
          textAlign: "center",
        }}
      >
        {data.map((item) => (
          <Box key={item.name}>
            <Box
              sx={{
                position: "relative",
                height: 120,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1,
              }}
            >
              {showChart && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[{ value: item.value }, { value: 100 - item.value }]}
                      innerRadius={40}
                      outerRadius={50}
                      startAngle={90}
                      endAngle={450}
                      dataKey="value"
                    >
                      <Cell fill={item.color} />
                      <Cell fill={item.bgColor} />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              )}
              {showValue && (
                <Typography
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: "#212B36",
                    zIndex: 1,
                  }}
                >
                  {item.value}%
                </Typography>
              )}
            </Box>
            <Typography
              sx={{
                fontSize: "0.875rem",
                color: "#637381",
                fontWeight: 500,
              }}
            >
              {item.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Card>
  );
}
