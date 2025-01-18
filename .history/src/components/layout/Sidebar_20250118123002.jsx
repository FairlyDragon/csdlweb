import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { Box, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import GridViewIcon from "@mui/icons-material/GridView";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PeopleIcon from "@mui/icons-material/People";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MenuIcon from "@mui/icons-material/Menu";
import SidebarAddMenus from "./SidebarAddMenus";
import SidebarFooter from "./SidebarFooter";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useState, useEffect } from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import SettingsIcon from "@mui/icons-material/Settings";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import logo from "../../assets/logo.svg";
import AdminService from "../../services/AdminService";

const SidebarContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "$collapsed",
})(({ theme, $collapsed }) => ({
  position: "fixed",
  left: 0,
  top: 0,
  bottom: 0,
  width: $collapsed ? 48 : 220,
  backgroundColor: "#fff",
  transition: "width 0.3s ease",
  borderRight: "1px solid rgba(0, 0, 0, 0.08)",
  zIndex: theme.zIndex.drawer,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
}));

const MenuToggle = styled(IconButton)({
  width: 32,
  height: 32,
  borderRadius: 8,
  backgroundColor: "#00A76F",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#007867",
  },
});

const StyledLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== "$isactive",
})(({ $isactive }) => ({
  display: "flex",
  alignItems: "center",
  padding: "8px",
  textDecoration: "none",
  color: $isactive ? "#00A76F" : "#637381",
  borderRadius: 8,
  transition: "all 0.2s",
  margin: "2px 8px",
  fontSize: 13,
  "&:hover": {
    backgroundColor: $isactive
      ? "rgba(0, 167, 111, 0.08)"
      : "rgba(99, 115, 129, 0.08)",
  },
  ...($isactive && {
    backgroundColor: "rgba(0, 167, 111, 0.08)",
  }),
}));

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const isSuperAdmin = AdminService.isSuperAdmin();

    // Định nghĩa menu items dựa trên role
    const baseMenuItems = [
      {
        icon: GridViewIcon,
        label: "Dashboard",
        path: "/admin/dashboard",
        iconColor: "#1890FF",
      },
      {
        icon: ListAltIcon,
        label: "Order List",
        path: "/admin/orders",
        iconColor: "#36B37E",
      },
      {
        icon: PeopleIcon,
        label: "User",
        iconColor: "#FF5630",
        subItems: [
          {
            label: "Customer",
            path: "/admin/customers",
            icon: PersonOutlineIcon,
            iconColor: "#FF8F6B",
          },
          {
            label: "Shipper",
            path: "/admin/shippers",
            icon: LocalShippingOutlinedIcon,
            iconColor: "#FF725C",
          },
        ],
      },
      {
        icon: RestaurantIcon,
        label: "Foods",
        path: "/admin/foods",
        iconColor: "#FFAB00",
      },
      {
        icon: LocalShippingIcon,
        label: "Delivery",
        path: "/admin/delivery",
        iconColor: "#00B8D9",
      },
      {
        icon: CalendarTodayIcon,
        label: "Calendar",
        path: "/admin/calendar",
        iconColor: "#6554C0",
      },
      {
        icon: LocalOfferIcon,
        label: "Voucher",
        path: "/admin/vouchers",
        iconColor: "gray",
      },
      {
        icon: AssessmentIcon,
        label: "Report",
        path: "/admin/reports",
        iconColor: "#00C853",
      },
      {
        icon: SettingsIcon,
        label: "Settings",
        path: "/admin/settings",
        iconColor: "#546E7A",
      },
      {
        icon: AdminPanelSettingsOutlinedIcon,
        label: "Sub Admins",
        path: "/admin/admins",
        iconColor: "#D81B60",
      }
    ];

    // Chỉ hiển thị Sub Admins nếu là super admin
    if (isSuperAdmin) {
      baseMenuItems.push({
        icon: AdminPanelSettingsOutlinedIcon,
        label: "Sub Admins",
        path: "/admin/admins",
        iconColor: "#D81B60",
      });
    }

    setMenuItems(baseMenuItems);
  }, []);

  const handleToggleSubmenu = (label) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  return (
    <SidebarContainer $collapsed={isCollapsed}>
      <Box
        sx={{
          p: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: isCollapsed ? "center" : "space-between",
        }}
      >
        {!isCollapsed && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <img
              src={logo}
              alt="Logo"
              style={{ width: "75 px", height: "75 px" }}
            />
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: 18,
                fontWeight: 700,
                lineHeight: 1.2,
                color: "#212B36",
              }}
            >
              Fairy Dragon
            </Typography>
          </Box>
        )}
        <MenuToggle onClick={() => setIsCollapsed(!isCollapsed)}>
          <MenuIcon sx={{ fontSize: 20 }} />
        </MenuToggle>
      </Box>

      <Box sx={{ flex: 1, mt: 0.5, overflow: "auto" }}>
        {menuItems.map((item) => {
          const Icon = item.icon;

          if (item.subItems) {
            const isOpen = openSubmenu === item.label;
            const hasActiveChild = item.subItems.some(
              (subItem) => location.pathname === subItem.path
            );

            return (
              <Box key={item.label}>
                <StyledLink
                  as="div"
                  onClick={() => handleToggleSubmenu(item.label)}
                  $isactive={hasActiveChild ? 1 : 0}
                  sx={{
                    justifyContent: isCollapsed ? "center" : "space-between",
                    cursor: "pointer",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Icon
                      sx={{
                        fontSize: 20,
                        color: hasActiveChild ? "#00A76F" : item.iconColor,
                        ...(isCollapsed ? { margin: 0 } : { mr: 2 }),
                      }}
                    />
                    {!isCollapsed && (
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: 13,
                          fontWeight: hasActiveChild ? 600 : 500,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.label}
                      </Typography>
                    )}
                  </Box>
                  {!isCollapsed &&
                    (isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
                </StyledLink>

                {/* Submenu items */}
                {!isCollapsed && isOpen && (
                  <Box sx={{ ml: 3 }}>
                    {item.subItems.map((subItem) => {
                      const isActive = location.pathname === subItem.path;
                      const SubIcon = subItem.icon;

                      return (
                        <StyledLink
                          key={subItem.path}
                          to={subItem.path}
                          $isactive={isActive ? 1 : 0}
                          sx={{
                            pl: 3,
                            fontSize: 13,
                          }}
                        >
                          <SubIcon
                            sx={{
                              fontSize: 20,
                              mr: 2,
                              color: isActive ? "#00A76F" : subItem.iconColor,
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: 13,
                              fontWeight: isActive ? 600 : 500,
                            }}
                          >
                            {subItem.label}
                          </Typography>
                        </StyledLink>
                      );
                    })}
                  </Box>
                )}
              </Box>
            );
          }

          // Regular menu items without submenu
          const isActive = location.pathname === item.path;

          return (
            <StyledLink
              key={item.path}
              to={item.path}
              $isactive={isActive ? 1 : 0}
              sx={{
                justifyContent: isCollapsed ? "center" : "flex-start",
              }}
            >
              <Icon
                sx={{
                  fontSize: 20,
                  color: isActive ? "#00A76F" : item.iconColor,
                  ...(isCollapsed ? { margin: 0 } : { mr: 2 }),
                }}
              />
              {!isCollapsed && (
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 500,
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.label}
                </Typography>
              )}
            </StyledLink>
          );
        })}
      </Box>

      {!isCollapsed && (
        <Box sx={{ px: 2, pb: 2, width: "100%" }}>
          <SidebarAddMenus />
          <SidebarFooter />
        </Box>
      )}
    </SidebarContainer>
  );
};

Sidebar.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  setIsCollapsed: PropTypes.func.isRequired,
};

export default Sidebar;
