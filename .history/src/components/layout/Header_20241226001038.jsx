import { Box, InputBase, Badge, Avatar, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

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

const StyledBadge = styled(Badge)(({ color = "primary" }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: color === "error" ? "#F04438" : "#2563EB",
    color: "#FFFFFF",
    minWidth: 16,
    height: 16,
    padding: "0 4px",
    fontSize: 10,
    fontWeight: 600,
    top: 2,
    right: 2,
  },
}));

const IconContainer = styled(Box)({
  width: 32,
  height: 32,
  borderRadius: "50%",
  backgroundColor: "#F8F9FA",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "background-color 0.2s",
  "&:hover": {
    backgroundColor: "#F3F4F6",
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
    color: "#637381",
  },
});

export default function Header() {
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
        />
        <SearchIconWrapper>
          <SearchIcon sx={{ fontSize: 20 }} />
        </SearchIconWrapper>
      </SearchWrapper>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <IconContainer>
            <StyledBadge badgeContent={2}>
              <EmailOutlinedIcon />
            </StyledBadge>
          </IconContainer>

          <IconContainer>
            <StyledBadge badgeContent={3}>
              <NotificationsNoneIcon />
            </StyledBadge>
          </IconContainer>

          <IconContainer>
            <StyledBadge badgeContent={5} color="error">
              <ShoppingCartOutlinedIcon />
            </StyledBadge>
          </IconContainer>

          <IconContainer>
            <SettingsOutlinedIcon />
          </IconContainer>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            ml: 3,
            pl: 3,
            borderLeft: "1px solid #F2F4F7",
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
              bgcolor: "#F8F9FA",
              color: "#637381",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            A
          </Avatar>
        </Box>
      </Box>
    </Box>
  );
}
