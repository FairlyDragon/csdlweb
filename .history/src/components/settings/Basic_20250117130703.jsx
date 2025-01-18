import PropTypes from "prop-types";
import {
  Box,
  Card,
  Switch,
  Typography,
  Stack,
  TextField,
  Button,
} from "@mui/material";

const Basic = ({ isActive, setIsActive }) => {
  return (
    <Card sx={{ p: 3 }}>
      <Stack spacing={3}>
        {/* Status */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="subtitle1" sx={{ color: "text.primary", mb: 0.5 }}>
              Active Status
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Turn on/off restaurant status
          </Typography>
        </Box>
                <Switch
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                />
              </Box>

        {/* Restaurant Info */}
        <Box>
          <Typography
            variant="subtitle1"
            sx={{ color: "text.primary", mb: 2 }}
          >
            Restaurant Information
          </Typography>

          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Restaurant Name"
              defaultValue="Fairy Dragon"
            />
            <TextField
              fullWidth
              label="Email Address"
              defaultValue="fairydragon@gmail.com"
            />
            <TextField
              fullWidth
              label="Phone Number"
              defaultValue="+84 123 456 789"
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Address"
              defaultValue="123 Main Street, City, Country"
            />
          </Stack>
            </Box>

        {/* Save Button */}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" color="primary">
            Save Changes
          </Button>
    </Box>
      </Stack>
    </Card>
  );
};

Basic.propTypes = {
  isActive: PropTypes.bool.isRequired,
  setIsActive: PropTypes.func.isRequired,
};

export default Basic;
