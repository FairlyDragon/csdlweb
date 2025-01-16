import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

export default function Sidebar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkPermission = async () => {
      const userId = localStorage.getItem("userId"); // Lưu userId khi login
      const hasAdminPermission = await AuthService.checkAdminPermission(userId);
      setIsAdmin(hasAdminPermission);
    };

    checkPermission();
  }, []);

  const menuItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: "dashboard" },
    { path: "/admin/orders", label: "Order List", icon: "list" },
    { path: "/admin/users", label: "User", icon: "person" },
    { path: "/admin/foods", label: "Foods", icon: "restaurant" },
    { path: "/admin/delivery", label: "Delivery", icon: "local_shipping" },
    { path: "/admin/calendar", label: "Calendar", icon: "calendar_today" },
    { path: "/admin/voucher", label: "Voucher", icon: "card_giftcard" },
    { path: "/admin/report", label: "Report", icon: "assessment" },
    { path: "/admin/settings", label: "Settings", icon: "settings" },
    // Chỉ hiển thị Sub Admins nếu có quyền admin
    ...(isAdmin ? [{ path: "/admin/admins", label: "Sub Admins", icon: "people" }] : []),
  ];

  return (
    <div>
      {menuItems.map((item) => (
        <MenuItem
          key={item.path}
          path={item.path}
          label={item.label}
          icon={item.icon}
          onClick={() => navigate(item.path)}
        />
      ))}
    </div>
  );
}

// MenuItem component
function MenuItem({ path, label, icon, onClick }) {
  return (
    <div onClick={onClick}>
      <i className="material-icons">{icon}</i>
      <span>{label}</span>
    </div>
  );
} 