import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, InputBase, Badge, Avatar, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";

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
  const [voucherCount, setVoucherCount] = useState(0);

  useEffect(() => {
    const fetchFoodCount = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/admin/foods/menuitems/",
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        setFoodCount(data.length);
      } catch (error) {
        console.error("Error fetching food count:", error);
      }
    };

    const fetchVoucherCount = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/admin/vouchers/available",
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        setVoucherCount(data.length);
      } catch (error) {
        console.error("Error fetching voucher count:", error);
      }
    };

    fetchFoodCount();
    fetchVoucherCount();
  }, []);

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
            <StyledBadge badgeContent={21} $variant="notification">
              <NotificationsNoneIcon />
            </StyledBadge>
          </IconContainer>

          <IconContainer $variant="email">
            <StyledBadge badgeContent={53} $variant="email">
              <EmailOutlinedIcon />
            </StyledBadge>
          </IconContainer>

          <IconContainer $variant="gift">
            <StyledBadge badgeContent={voucherCount} $variant="gift">
              <CardGiftcardOutlinedIcon />
            </StyledBadge>
          </IconContainer>

          <IconContainer $variant="settings">
            <StyledBadge badgeContent={19} $variant="settings">
              <SettingsOutlinedIcon />
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
