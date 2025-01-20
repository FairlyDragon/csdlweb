import { Box, Typography, TextField, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Fee = () => {
  return (
    <Box sx={{ maxWidth: 1200, display: "flex", gap: 4 }}>
      {/* Shipping Section - Left Column */}
      <Box sx={{ flex: 1 }}>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            color: "#212B36",
            mb: 2,
          }}
        >
          Shipping
        </Typography>
        <Typography sx={{ color: "#637381", mb: 2 }}>DISTRICT</Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {[
            { range: "Đống Đa", defaultValue: "1$" },
            { range: "Hà Đông", defaultValue: "1$" },
            { range: "Cầu giấy", defaultValue: "2$" },
            { range: "Hai Bà Trưng", defaultValue: "2$" },
            { range: "Hoàng Mai", defaultValue: "2$" },
            { range: "Ba Đình", defaultValue: "3$" },
            { range: "Nam Tử Liêm", defaultValue: "3$" },
            { range: "Bắc Tử Liêm", defaultValue: "3$" },
          ].map((item) => (
            <Box
              key={item.range}
              sx={{
                display: "grid",
                gridTemplateColumns: "80px 1fr",
                gap: 2,
                alignItems: "center",
              }}
            >
            <Typography sx={{ color: "#637381", mb: 2 }}>DISTRICT</Typography>
              <Typography sx={{ color: "#637381" }}>{item.range}</Typography>
              <TextField
                fullWidth
                size="small"
                defaultValue={item.defaultValue}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "#F4F6F8",
                  },
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>

      {/* Addition Fee Section - Right Column */}
      <Box sx={{ flex: 1 }}>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            color: "#212B36",
            mb: 2,
          }}
        >
          Addition Fee
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography sx={{ width: 80, color: "#637381" }}>VAT</Typography>
            <TextField
              size="small"
              defaultValue="10%"
              sx={{
                flex: 1,
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#F4F6F8",
                },
              }}
            />
            <IconButton>
              <CloseIcon sx={{ color: "#637381" }} />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography sx={{ width: 80, color: "#637381" }}>
              Service
            </Typography>
            <TextField
              size="small"
              defaultValue="1$"
              sx={{
                flex: 1,
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#F4F6F8",
                },
              }}
            />
            <IconButton>
              <CloseIcon sx={{ color: "#637381" }} />
            </IconButton>
          </Box>
        </Box>

        <Button
          variant="contained"
          sx={{
            bgcolor: "#00AB55",
            "&:hover": {
              bgcolor: "#007B55",
            },
          }}
        >
          + Add Fee
        </Button>
      </Box>
    </Box>
  );
};

export default Fee;
