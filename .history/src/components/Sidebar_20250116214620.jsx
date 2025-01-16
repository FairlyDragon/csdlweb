import { useEffect, useState } from 'react';

const Sidebar = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Kiểm tra role khi component mount
    const checkAdminRole = () => {
      const role = localStorage.getItem('role');
      setIsAdmin(role === 'admin');
    };
    
    checkAdminRole();
  }, []);

  return (
    <Box>
      {/* Các menu item luôn hiển thị */}
      <MenuItem component={Link} to="/admin/dashboard">
        Dashboard
      </MenuItem>
      <MenuItem component={Link} to="/admin/orders">
        Orders
      </MenuItem>
      {/* ... các menu item khác ... */}

      {/* Menu item chỉ hiển thị cho admin */}
      {isAdmin && (
        <MenuItem component={Link} to="/admin/subadmins">
          Sub Admins
        </MenuItem>
      )}
    </Box>
  );
};