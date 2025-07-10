/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Toolbar,
  Typography,
  Button,
  AppBar,
  Container,
} from "@mui/material";
import AccountMenu from "./AccountMenu";
import PromotionsMenu from "./PromotionsMenu"; // Add this import
import { LocalShippingOutlined as LocalShippingOutlinedIcon } from "@mui/icons-material"; // Add this import

const TopBar = ({
  user,
  handleLogout,
}: {
  user: any;
  handleLogout: () => void;
}) => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ bgcolor: "#f5f5f5", color: "#666" }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ minHeight: "40px", justifyContent: "space-between" }}
        >
          <Typography variant="body2">
            Free shipping on domestic orders over $150
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <AccountMenu user={user} handleLogout={handleLogout} />
            <PromotionsMenu />
            <Button
              startIcon={<LocalShippingOutlinedIcon />}
              color="inherit"
              variant="text"
              sx={{
                fontSize: "0.875rem",
                textTransform: "none",
                "&:hover": { color: "#333" },
              }}
            >
              Track Order
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default TopBar;
