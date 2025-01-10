import { useState, useEffect } from "react";
import {
  Box,
  Card,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";
import { Download, PictureAsPdf } from "@mui/icons-material";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { dashboardService } from "../../services/DashBoardService";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import ExcelJS from "exceljs";

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

  const handleChartChange = (event) => {
    setShowChart(event.target.checked);
  };

  const handleValueChange = (event) => {
    setShowValue(event.target.checked);
  };

  const handleSavePDF = () => {
    const doc = new jsPDF();
    doc.text("Pie Chart Report", 14, 10);

    autoTable(doc, {
      head: [["Metric", "Percentage"]],
      body: data.map((item) => [item.name, `${item.value}%`]),
      styles: {
        halign: "center",
      },
      headStyles: {
        fillColor: [249, 115, 22], // Orange color (#F97316)
      },
    });

    doc.save("pie_chart_report.pdf");
  };

  const handleSaveExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Pie Chart");

    // Định dạng columns
    worksheet.columns = [
      { header: "Metric", key: "name", width: 20 },
      { header: "Percentage", key: "percentage", width: 15 },
    ];

    // Style cho header
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "F97316" }, // Màu cam
    };
    worksheet.getRow(1).alignment = { horizontal: "center" };

    // Thêm data
    worksheet.addRows(
      data.map((item) => ({
        name: item.name,
        percentage: `${item.value}%`,
      }))
    );

    // Style cho data rows
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        row.alignment = { horizontal: "center" };
      }
    });

    // Tạo và tải file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pie_chart_report.xlsx";
    a.click();
    window.URL.revokeObjectURL(url);
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
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 600,
            color: "#111827",
          }}
        >
          Pie Chart
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <FormControlLabel
            control={
              <Checkbox checked={showChart} onChange={handleChartChange} />
            }
            label="Chart"
          />
          <FormControlLabel
            control={
              <Checkbox checked={showValue} onChange={handleValueChange} />
            }
            label="Show Value"
          />
          <Button
            variant="outlined"
            size="small"
            startIcon={<PictureAsPdf />}
            onClick={handleSavePDF}
            sx={{
              minWidth: 40,
              height: 36,
              borderColor: "#F97316",
              color: "#F97316",
              borderRadius: "8px",
              padding: "8px",
              "&:hover": {
                borderColor: "#F97316",
                backgroundColor: "rgba(249, 115, 22, 0.08)",
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
              minWidth: 40,
              height: 36,
              borderColor: "#F97316",
              color: "#F97316",
              borderRadius: "8px",
              padding: "8px",
              "&:hover": {
                borderColor: "#F97316",
                backgroundColor: "rgba(249, 115, 22, 0.08)",
              },
            }}
          >
            Excel
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 2,
          textAlign: "center",
          height: 120,
          alignItems: "center",
          mt: 2,
        }}
      >
        {data.map((item) => (
          <Box key={item.name}>
            <Box
              sx={{
                position: "relative",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1,
              }}
            >
              {showChart && (
                <ResponsiveContainer width="100%" height={100}>
                  <PieChart>
                    <Pie
                      data={[
                        { value: item.value },
                        { value: 100 - item.value },
                      ]}
                      innerRadius={35}
                      outerRadius={45}
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
