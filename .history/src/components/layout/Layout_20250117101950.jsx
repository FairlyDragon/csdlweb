import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";
import authService from "../../services/authService";

export default function Layout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Debug thông tin authentication
  console.log("Current role:", localStorage.getItem("role"));
  console.log("Current email:", localStorage.getItem("email"));
  console.log("Is admin check:", authService.isAdmin());

  // Kiểm tra quyền admin
  if (!authService.isAdmin()) {
    console.log("Access denied, redirecting to login"); // Debug
    return <Navigate to="/auth/signin" replace />;
  }

  return (
    <Box sx={{ display: "flex", bgcolor: "#F8F9FD", minHeight: "100vh" }}>
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <Box
        component="main"
        sx={{
          width: `calc(100% - ${isCollapsed ? "48px" : "200px"})`,
          marginLeft: isCollapsed ? "48px" : "200px",
          transition: "margin-left 0.3s ease, width 0.3s ease",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          bgcolor: "#F8F9FD",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "fixed",
            top: 0,
            right: 0,
            width: `calc(100% - ${isCollapsed ? "48px" : "200px"})`,
            zIndex: 1100,
            bgcolor: "#F8F9FD",
            borderBottom: "1px solid rgba(145, 158, 171, 0.12)",
            transition: "width 0.3s ease",
          }}
        >
          <Header />
        </Box>

        <Box
          sx={{
            mt: "64px", // Height of header
            p: 3,
            flex: 1,
            maxWidth: "1600px",
            mx: "auto",
            width: "100%",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
