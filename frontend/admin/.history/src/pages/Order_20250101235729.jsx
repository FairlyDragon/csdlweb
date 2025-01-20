import { useState, useEffect } from "react";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import WaitingAccept from "../components/orders/WaitingAccept";
import OrderList from "../components/orders/OrderList";

const Order = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Tabs
        value={currentTab}
        onChange={handleChangeTab}
        sx={{
          mb: 3,
          "& .MuiTab-root": {
            textTransform: "none",
            fontSize: "16px",
            fontWeight: 500,
          },
          "& .Mui-selected": {
            color: "#00A76F !important",
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "#00A76F",
          },
        }}
      >
        <Tab label="Waiting to Accept" />
        <Tab label="Order List" />
      </Tabs>

      {currentTab === 0 && <WaitingAccept />}
      {currentTab === 1 && <OrderList />}
    </Box>
  );
};

export default Order;
