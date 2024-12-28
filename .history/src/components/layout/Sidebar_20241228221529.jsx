import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ListAltIcon from "@mui/icons-material/ListAlt";
import InsightsIcon from "@mui/icons-material/Insights";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EmailIcon from "@mui/icons-material/Email";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PersonIcon from "@mui/icons-material/Person";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import GroupIcon from "@mui/icons-material/Group";
import { useState } from "react";

const COLORS = {
  primary: "#00A76F",
  text: "#637381",
  heading: "#212B36",
  hover: "#007867",
};

const menuItems = [
  { icon: HomeIcon, label: "Dashboard", path: "/" },
  { icon: ListAltIcon, label: "Order List", path: "/orders" },
  {
    icon: GroupIcon,
    label: "User",
    path: "/users",
    subItems: [
      { icon: PersonIcon, label: "Customer", path: "/users/customers" },
      { icon: DeliveryDiningIcon, label: "Shipper", path: "/users/shippers" },
    ],
  },
  { icon: InsightsIcon, label: "Analytics", path: "/analytics" },
  { icon: StarBorderIcon, label: "Reviews", path: "/reviews" },
  { icon: RestaurantIcon, label: "Foods", path: "/foods" },
  { icon: CalendarTodayIcon, label: "Calendar", path: "/calendar" },
  { icon: EmailIcon, label: "Inbox", path: "/inbox" },
  { icon: AccountBalanceWalletIcon, label: "Wallet", path: "/wallet" },
];

const SidebarContainer = styled(Box)((props) => ({
  position: "fixed",
  left: 0,
  top: 0,
  bottom: 0,
  width: props.$collapsed ? 56 : 220,
  backgroundColor: "#fff",
  transition: "width 0.3s ease",
  borderRight: "1px solid rgba(0, 0, 0, 0.08)",
  zIndex: 1200,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
}));

const MenuToggle = styled(IconButton)({
  width: 24,
  height: 24,
  borderRadius: 6,
  backgroundColor: "#F4F6F8",
  "&:hover": {
    backgroundColor: "#E7E9EC",
  },
});

const StyledLink = styled(Link)((props) => ({
  display: "flex",
  alignItems: "center",
  padding: "6px 8px",
  textDecoration: "none",
  color: props.$isactive ? COLORS.primary : COLORS.text,
  borderRadius: 6,
  transition: "all 0.2s",
  margin: "2px 8px",
  fontSize: 13,
  "&:hover": {
    backgroundColor: props.$isactive
      ? "rgba(0, 167, 111, 0.08)"
      : "rgba(99, 115, 129, 0.08)",
  },
  ...(props.$isactive && {
    backgroundColor: "rgba(0, 167, 111, 0.08)",
  }),
}));

const Logo = styled(Typography)({
  fontSize: 20,
  fontWeight: 700,
  lineHeight: 1.2,
  color: COLORS.heading,
  fontFamily: "'Inter', sans-serif",
  "& span": {
    display: "block",
    fontSize: 20,
  },
});

const ScrollableBox = styled(Box)({
  flex: 1,
  overflow: "auto",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});

function Sidebar({ isCollapsed, setIsCollapsed }) {
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState("");

  const handleSubmenuClick = (label) => {
    setOpenSubmenu(openSubmenu === label ? "" : label);
  };

  return (
    <SidebarContainer $collapsed={isCollapsed}>
      <Box
        sx={{
          height: 64,
          px: isCollapsed ? 1 : 2,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {!isCollapsed && (
          <Logo>
            Fairy
            <span>Dragon</span>
          </Logo>
        )}
        <MenuToggle
          onClick={() => setIsCollapsed(!isCollapsed)}
          sx={{
            ml: isCollapsed ? "auto" : 0,
            mr: isCollapsed ? "auto" : 0,
          }}
        >
          <MenuIcon sx={{ fontSize: 16 }} />
        </MenuToggle>
      </Box>

      <ScrollableBox sx={{ mt: 1 }}>
        {menuItems.map((item) => (
          <Box key={item.label}>
            <StyledLink
              to={item.subItems ? "#" : item.path}
              $isactive={location.pathname === item.path ? 1 : 0}
              onClick={() => item.subItems && handleSubmenuClick(item.label)}
              sx={{
                px: isCollapsed ? 1 : 2,
                py: 1,
                justifyContent: isCollapsed ? "center" : "flex-start",
              }}
            >
              <item.icon
                sx={{
                  fontSize: 20,
                  color:
                    location.pathname === item.path
                      ? COLORS.primary
                      : "inherit",
                }}
              />
              {!isCollapsed && (
                <>
                  <Typography
                    sx={{
                      ml: 2,
                      flex: 1,
                      fontSize: 13,
                      fontWeight: location.pathname === item.path ? 600 : 500,
                    }}
                  >
                    {item.label}
                  </Typography>
                  {item.subItems &&
                    (openSubmenu === item.label ? (
                      <ExpandMoreIcon sx={{ fontSize: 20 }} />
                    ) : (
                      <ChevronRightIcon sx={{ fontSize: 20 }} />
                    ))}
                </>
              )}
            </StyledLink>

            {item.subItems && openSubmenu === item.label && !isCollapsed && (
              <Box sx={{ pl: 4 }}>
                {item.subItems.map((subItem) => (
                  <StyledLink
                    key={subItem.path}
                    to={subItem.path}
                    $isactive={location.pathname === subItem.path ? 1 : 0}
                    sx={{
                      py: 0.75,
                    }}
                  >
                    <subItem.icon
                      sx={{
                        fontSize: 18,
                        color:
                          location.pathname === subItem.path
                            ? COLORS.primary
                            : "inherit",
                      }}
                    />
                    <Typography
                      sx={{
                        ml: 2,
                        fontSize: 13,
                        fontWeight:
                          location.pathname === subItem.path ? 600 : 500,
                      }}
                    >
                      {subItem.label}
                    </Typography>
                  </StyledLink>
                ))}
              </Box>
            )}
          </Box>
        ))}
      </ScrollableBox>

      {!isCollapsed && (
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              p: 1.5,
              bgcolor: "rgba(0, 167, 111, 0.08)",
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1.5,
                bgcolor: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 8px",
                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
              }}
            >
              <RestaurantIcon sx={{ color: COLORS.primary, fontSize: 18 }} />
            </Box>
            <Typography
              sx={{
                fontSize: 12,
                color: COLORS.text,
                mb: 1,
                lineHeight: 1.4,
              }}
            >
              Please, organize your
              <br />
              menus through button
            </Typography>
            <Button
              startIcon={<AddIcon sx={{ fontSize: 16 }} />}
              variant="contained"
              fullWidth
              sx={{
                bgcolor: COLORS.primary,
                "&:hover": {
                  bgcolor: COLORS.hover,
                },
                textTransform: "none",
                borderRadius: 1,
                boxShadow: "none",
                py: 0.5,
                fontSize: 12,
              }}
            >
              Add Menus
            </Button>
          </Box>

          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography sx={{ fontSize: 10, color: COLORS.text, mb: 0.5 }}>
              FairyDragon Restaurant Admin Dashboard
            </Typography>
            <Typography sx={{ fontSize: 10, color: COLORS.text }}>
              © 2024 All Rights Reserved
            </Typography>
            <Typography sx={{ fontSize: 10, color: COLORS.text, mt: 0.5 }}>
              Made by FairyDragon team
            </Typography>
          </Box>
        </Box>
      )}
    </SidebarContainer>
  );
}

Sidebar.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  setIsCollapsed: PropTypes.func.isRequired,
};

export default Sidebar;
