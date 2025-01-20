import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          ml: "220px", // Chiều rộng của sidebar
          bgcolor: "#FFFFFF",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;

