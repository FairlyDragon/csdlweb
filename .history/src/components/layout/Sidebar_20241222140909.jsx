import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { Box, Typography, Button, IconButton, Collapse } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import GridViewIcon from "@mui/icons-material/GridView";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PeopleIcon from "@mui/icons-material/People";
import InsightsIcon from "@mui/icons-material/Insights";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EmailIcon from "@mui/icons-material/Email";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";

const COLORS = {
  primary: "#00A76F",
  text: "#637381",
  heading: "#212B36",
  hover: "#007867",
};

const menuItems = [
  { icon: GridViewIcon, label: "Dashboard", path: "/" },
  { icon: ListAltIcon, label: "Order List", path: "/orders" },
  { icon: PeopleIcon, label: "Customer", path: "/customers" },
  { icon: InsightsIcon, label: "Analytics", path: "/analytics" },
  { icon: StarBorderIcon, label: "Reviews", path: "/reviews" },
  { icon: RestaurantIcon, label: "Foods", path: "/foods" },
  { icon: CalendarTodayIcon, label: "Calendar", path: "/calendar" },
  { icon: EmailIcon, label: "Inbox", path: "/inbox" },
  { icon: AccountBalanceWalletIcon, label: "Wallet", path: "/wallet" },
];

const SidebarContainer = styled(Box)((props) => ({
  position: "fixed",
  left: props.$collapsed ? -220 : 0,
  top: 0,
  bottom: 0,
  width: 220,
  backgroundColor: "#fff",
  transition: "left 0.3s ease",
  borderRight: "1px solid rgba(0, 0, 0, 0.08)",
  zIndex: 1200,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
}));

const MenuToggle = styled(IconButton)({
  position: "fixed",
  left: 8,
  top: 8,
  width: 24,
  height: 24,
  borderRadius: 6,
  backgroundColor: "#F4F6F8",
  "&:hover": {
    backgroundColor: "#E7E9EC",
  },
  zIndex: 1201,
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

function Sidebar({ isCollapsed, setIsCollapsed }) {
  const location = useLocation();

  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <MenuToggle
        onClick={toggleMenu}
        sx={{
          transform: isCollapsed ? "none" : "translateX(220px)",
          transition: "transform 0.3s ease",
        }}
      >
        <MenuIcon sx={{ fontSize: 16 }} />
      </MenuToggle>

      <SidebarContainer $collapsed={isCollapsed}>
        <Box sx={{ p: 1.5, display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: 14,
              fontWeight: 700,
              lineHeight: 1.2,
              color: COLORS.heading,
            }}
          >
            Fairy Dragon
          </Typography>
        </Box>

        <Box sx={{ flex: 1, mt: 0.5, overflow: "auto" }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <StyledLink
                key={item.path}
                to={item.path}
                $isactive={isActive ? 1 : 0}
              >
                <Icon
                  sx={{
                    fontSize: 18,
                    minWidth: isCollapsed ? "100%" : 18,
                    mr: isCollapsed ? 0 : 1.5,
                    color: isActive ? COLORS.primary : "inherit",
                    textAlign: isCollapsed ? "center" : "left",
                  }}
                />
                <Collapse in={!isCollapsed} orientation="horizontal">
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: isActive ? 600 : 500,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.label}
                  </Typography>
                </Collapse>
              </StyledLink>
            );
          })}
        </Box>

        <Collapse in={!isCollapsed} orientation="horizontal">
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
        </Collapse>
      </SidebarContainer>
    </>
  );
}

Sidebar.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  setIsCollapsed: PropTypes.func.isRequired,
};

export default Sidebar;
