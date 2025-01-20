import { Link, useLocation } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PeopleIcon from "@mui/icons-material/People";
import InsightsIcon from "@mui/icons-material/Insights";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EmailIcon from "@mui/icons-material/Email";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AddIcon from "@mui/icons-material/Add";

const menuItems = [
  { icon: DashboardIcon, label: "Dashboard", path: "/" },
  { icon: ListAltIcon, label: "Order List", path: "/orders" },
  { icon: PeopleIcon, label: "Customer", path: "/customers" },
  { icon: InsightsIcon, label: "Analytics", path: "/analytics" },
  { icon: StarBorderIcon, label: "Reviews", path: "/reviews" },
  { icon: RestaurantIcon, label: "Foods", path: "/foods" },
  { icon: CalendarTodayIcon, label: "Calendar", path: "/calendar" },
  { icon: EmailIcon, label: "Inbox", path: "/inbox" },
  { icon: AccountBalanceWalletIcon, label: "Wallet", path: "/wallet" },
];

const SidebarContainer = styled(Box)({
  width: "280px",
  height: "100vh",
  backgroundColor: "#FFF",
  borderRight: "1px solid #F4F6F8",
  position: "fixed",
  display: "flex",
  flexDirection: "column",
  padding: "16px 0",
});

const MenuItem = styled(Link)(({ active }) => ({
  display: "flex",
  alignItems: "center",
  padding: "12px 24px",
  color: active ? "#00A76F" : "#637381",
  textDecoration: "none",
  borderRadius: "8px",
  margin: "4px 16px",
  transition: "all 0.2s",
  backgroundColor: active ? "#00A76F14" : "transparent",
  "&:hover": {
    backgroundColor: active ? "#00A76F14" : "#F4F6F8",
  },
  "& .icon": {
    marginRight: "16px",
    fontSize: "24px",
  },
  "& .label": {
    fontSize: "14px",
    fontWeight: active ? 600 : 500,
  },
}));

export default function Sidebar() {
  const location = useLocation();

  return (
    <SidebarContainer>
      {/* Logo */}
      <Box sx={{ padding: "0 24px", marginBottom: "24px" }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "700",
            color: "#212B36",
            lineHeight: "1.2",
          }}
        >
          Fairy
          <br />
          Dragon.
        </Typography>
      </Box>

      {/* Menu Items */}
      <Box sx={{ flex: 1 }}>
        {menuItems.map((item) => (
          <MenuItem
            key={item.path}
            to={item.path}
            active={location.pathname === item.path ? 1 : 0}
          >
            <item.icon className="icon" />
            <span className="label">{item.label}</span>
          </MenuItem>
        ))}
      </Box>

      {/* Add Menus Section */}
      <Box sx={{ padding: "24px" }}>
        <Box
          sx={{
            backgroundColor: "#00A76F14",
            borderRadius: "8px",
            padding: "16px",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              width: "48px",
              height: "48px",
              backgroundColor: "#FFFFFF",
              margin: "0 auto 16px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RestaurantIcon sx={{ color: "#00A76F", fontSize: "24px" }} />
          </Box>
          <Typography
            sx={{ fontSize: "14px", color: "#637381", marginBottom: "16px" }}
          >
            Please, organize your menus
            <br />
            through button
          </Typography>
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#00A76F",
              borderRadius: "8px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#007867",
              },
            }}
          >
            Add Menus
          </Button>
        </Box>
      </Box>
    </SidebarContainer>
  );
}
