import { useState } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import CustomerReport from "../components/report/CustomerReport";
// import ShipperReport from "../components/report/ShipperReport";
// import RestaurantReport from "../components/report/RestaurantReport";

export default function Report() {
  const [tab, setTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Report
      </Typography>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs value={tab} onChange={handleTabChange}>
          <Tab
            label="Customer"
            sx={{
              textTransform: "none",
              fontWeight: tab === 0 ? 600 : 400,
              color: tab === 0 ? "#00A76F" : "inherit",
            }}
          />
          <Tab
            label="Shipper"
            sx={{
              textTransform: "none",
              fontWeight: tab === 1 ? 600 : 400,
              color: tab === 1 ? "#00A76F" : "inherit",
            }}
          />
          <Tab
            label="Restaurant"
            sx={{
              textTransform: "none",
              fontWeight: tab === 2 ? 600 : 400,
              color: tab === 2 ? "#00A76F" : "inherit",
            }}
          />
        </Tabs>
      </Box>

      {/* Tab Panels */}
      {tab === 0 && <CustomerReport />}
      {/* {tab === 1 && <ShipperReport />}
      {tab === 2 && <RestaurantReport />} */}
    </Box>
  );
}
