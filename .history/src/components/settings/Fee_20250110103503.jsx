import { Box, Typography, TextField, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Fee = () => {
  return (
    <Box sx={{ maxWidth: 800 }}>
      {/* Shipping Section */}
      <Box sx={{ mb: 4 }}>
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
        <Typography sx={{ color: "#637381", mb: 2 }}>KM {"<"} 12</Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {[
            { range: "< 1", defaultValue: "0$" },
            { range: "1 - 2", defaultValue: "1$" },
            { range: "2 - 5", defaultValue: "2$" },
            { range: "5 - 8", defaultValue: "4$" },
            { range: "> 8", defaultValue: "6$" },
          ].map((item) => (
            <Box
              key={item.range}
              sx={{
                display: "grid",
                gridTemplateColumns: "100px 1fr",
                gap: 2,
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  padding: "8px 16px",
                  bgcolor: "#F4F6F8",
                  borderRadius: 1,
                  color: "#637381",
                }}
              >
                {item.range}
              </Box>
              <TextField
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

      {/* Addition Fee Section */}
      <Box>
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

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography sx={{ width: 80, color: "#637381" }}>VAT</Typography>
            <TextField
              size="small"
              defaultValue="10%"
              sx={{
                width: 200,
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
                width: 200,
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
            mt: 3,
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
