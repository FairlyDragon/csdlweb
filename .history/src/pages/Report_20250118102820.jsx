import { useState } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import CustomerReport from "../components/report/CustomerReport";
import ShipperReport from "../components/report/ShipperReport";
import RestaurantReport from "../components/report/RestaurantReport";

export default function Report() {
  const [tab, setTab] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [customerData, setCustomerData] = useState({
    customers: [],
    totals: { totalOrderQuantity: 0, totalPurchaseAmount: 0 },
  });

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleDateChange = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/admin/report/customer?start_date=${startDate}&end_date=${endDate}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();

      // Tách dữ liệu thành danh sách khách hàng và tổng số liệu
      const customers = data.slice(0, -1);
      const totals = data[data.length - 1];

      setCustomerData({
        customers: customers.map((customer) => ({
          name: customer.customer_name,
          email: customer.email,
          phone: customer.phone_number,
          address: customer.address,
          created_at: customer.created_at,
          totalOrder: customer.total_order,
          totalPurchase: customer.total_purchase,
        })),
        totals: {
          totalOrderQuantity: totals.total_order_quantity,
          totalPurchaseAmount: totals.total_purchase_from_customers,
        },
      });
    } catch (error) {
      console.error("Error fetching report:", error);
    }
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
      {tab === 1 && <ShipperReport />}
      {tab === 2 && <RestaurantReport />}

      <div>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={handleDateChange}>Get Report</button>

        <table>
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>PHONE</th>
              <th>ADDRESS</th>
              <th>DATE</th>
              <th>Total Order</th>
              <th>Total Purchase</th>
            </tr>
          </thead>
          <tbody>
            {customerData.customers.map((customer, index) => (
              <tr key={index}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.address}</td>
                <td>{customer.created_at}</td>
                <td>{customer.totalOrder}</td>
                <td>${customer.totalPurchase}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          Total Orders: {customerData.totals.totalOrderQuantity}
          Total Purchase: ${customerData.totals.totalPurchaseAmount}
        </div>
      </div>
    </Box>
  );
}
