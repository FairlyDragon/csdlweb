import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, InputBase, Badge, Avatar, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

const SearchWrapper = styled("div")({
  position: "relative",
  width: "100%",
  maxWidth: 480,
  marginLeft: 24,
});

const SearchIconWrapper = styled(IconButton)({
  position: "absolute",
  right: 8,
  top: "50%",
  transform: "translateY(-50%)",
  padding: 8,
  color: "#919EAB",
});

const StyledInputBase = styled(InputBase)({
  width: "100%",
  "& .MuiInputBase-input": {
    padding: "8px 40px 8px 16px",
    backgroundColor: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: 8,
    fontSize: 14,
    width: "100%",
    "&::placeholder": {
      color: "#919EAB",
      opacity: 1,
    },
    "&:focus": {
      borderColor: "#2563EB",
      boxShadow: "0 0 0 2px rgba(37, 99, 235, 0.1)",
    },
  },
});

const StyledBadge = styled(Badge)(({ $variant }) => {
  const colors = {
    notification: "#4C7FE4",
    email: "#5B93FF",
    gift: "#5E6C93",
    settings: "#FF6B6B",
    food: "#40C057",
  };

  return {
    "& .MuiBadge-badge": {
      backgroundColor: colors[$variant] || colors.notification,
      color: "#FFFFFF",
      minWidth: 14,
      height: 14,
      padding: "0 4px",
      fontSize: 9,
      fontWeight: 600,
      borderRadius: "50%",
      top: -2,
      right: -2,
    },
  };
});

const IconContainer = styled(Box)(({ $variant }) => {
  const colors = {
    notification: {
      bg: "#EBF3FF",
      icon: "#4C7FE4",
    },
    email: {
      bg: "#F0F5FF",
      icon: "#5B93FF",
    },
    gift: {
      bg: "#F4F4FF",
      icon: "#5E6C93",
    },
    settings: {
      bg: "#FFF5F5",
      icon: "#FF6B6B",
    },
    food: {
      bg: "#E6F7ED",
      icon: "#40C057",
    },
  };

  const color = colors[$variant] || colors.notification;

  return {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: color.bg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    "& .MuiSvgIcon-root": {
      fontSize: 20,
      color: color.icon,
    },
  };
});

// Định nghĩa các routes có thể tìm kiếm
const searchableRoutes = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Customer", path: "/admin/customers" },
  { name: "Shipper", path: "/admin/shippers" },
  { name: "Foods", path: "/admin/foods" },
  { name: "Order List", path: "/admin/orders" },
  { name: "Delivery", path: "/admin/delivery" },
  { name: "Calendar", path: "/admin/calendar" },
  { name: "Voucher", path: "/admin/vouchers" },
  { name: "Report", path: "/admin/reports" },
  { name: "Settings", path: "/admin/settings" },
  { name: "Sub Admins", path: "/admin/admins" },
];

export default function Header() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [foodCount, setFoodCount] = useState(0);
  const [deliveringCount, setDeliveringCount] = useState(0);
  const [activeShippersCount, setActiveShippersCount] = useState(0);
  const [waitingOrderCount, setWaitingOrderCount] = useState(0);

  useEffect(() => {
    const fetchAllCounts = async () => {
      try {
        // Fetch food count
        const foodResponse = await fetch(
          "http://127.0.0.1:8000/admin/foods/menuitems/",
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const foodData = await foodResponse.json();
        setFoodCount(foodData.length);

        // Fetch delivering count
        const deliveringResponse = await fetch(
          "http://127.0.0.1:8000/admin/deliveries/delivering_orders",
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const deliveringData = await deliveringResponse.json();
        setDeliveringCount(deliveringData.number_of_delivering_orders || 0);

        // Fetch expired voucher count
        const expiredResponse = await fetch(
          "http://127.0.0.1:8000/admin/vouchers/expired",
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const expiredData = await expiredResponse.json();
        setExpiredVoucherCount(expiredData.length || 0);

        // Fetch waiting order count
        const waitingResponse = await fetch(
          "http://127.0.0.1:8000/admin/deliveries/num_of_waiting_orders",
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const waitingData = await waitingResponse.json();
        setWaitingOrderCount(waitingData.number_of_waiting_orders || 0);

        console.log("Updated counts:", {
          food: foodData.length,
          delivering: deliveringData.number_of_delivering_orders,
          expired: expiredData.length,
          waiting: waitingData.number_of_waiting_orders,
        });
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    // Fetch lần đầu
    fetchAllCounts();

    // Tạo interval để fetch mỗi 1 giây
    const interval = setInterval(() => {
      fetchAllCounts();
    }, 1000); // 1000ms = 1 giây

    // Cleanup interval khi component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const foundRoute = searchableRoutes.find(
        (route) => route.name.toLowerCase() === searchValue.toLowerCase()
      );

      if (foundRoute) {
        navigate(foundRoute.path);
        setSearchValue(""); // Clear search after navigation
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        py: 1.5,
        px: 3,
        backgroundColor: "#F8F9FD",
        borderBottom: "1px solid #F2F4F7",
      }}
    >
      <SearchWrapper>
        <StyledInputBase
          placeholder="Search in here"
          inputProps={{ "aria-label": "search" }}
          value={searchValue}
          onChange={handleSearch}
          onKeyPress={handleKeyPress}
        />
        <SearchIconWrapper>
          <SearchIcon sx={{ fontSize: 20 }} />
        </SearchIconWrapper>
      </SearchWrapper>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
          <IconContainer $variant="food">
            <StyledBadge badgeContent={foodCount} $variant="food">
              <RestaurantMenuOutlinedIcon />
            </StyledBadge>
          </IconContainer>

          <IconContainer $variant="notification">
            <StyledBadge badgeContent={deliveringCount} $variant="notification">
              <LocalShippingOutlinedIcon />
            </StyledBadge>
          </IconContainer>

          <IconContainer $variant="email">
            <StyledBadge badgeContent={activeShippersCount} $variant="email">
              <EmailOutlinedIcon />
            </StyledBadge>
          </IconContainer>

          <IconContainer $variant="gift">
            <StyledBadge badgeContent={voucherCount} $variant="gift">
              <CardGiftcardOutlinedIcon />
            </StyledBadge>
          </IconContainer>

          <IconContainer $variant="settings">
            <StyledBadge badgeContent={waitingOrderCount} $variant="settings">
              <PendingActionsOutlinedIcon />
            </StyledBadge>
          </IconContainer>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            ml: 3,
            pl: 3,
            borderLeft: "2px solid #E0E0E0",
          }}
        >
          <Box
            sx={{
              color: "#111827",
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            Hello, <span style={{ fontWeight: 600 }}>Admin</span>
          </Box>

          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: "#E7E7E7",
              color: "#212B36",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            A
          </Avatar>
        </Box>
      </Box>
    </Box>
  );
}
