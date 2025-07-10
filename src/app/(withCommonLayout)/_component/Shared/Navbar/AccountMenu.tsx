/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, Menu, MenuItem, Divider, Box } from "@mui/material";
import { PersonOutline, KeyboardArrowDown } from "@mui/icons-material";
import { useRouter } from "next/navigation"; // Add this import

const AccountMenu = ({
  user,
  handleLogout,
}: {
  user: any;
  handleLogout: () => void;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter(); // Initialize the router
  const accountItems = ["Profile", "Orders", "Saved Items", "Settings"];

  const handleOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Box>
      <Button
        startIcon={<PersonOutline />}
        endIcon={<KeyboardArrowDown />}
        onClick={handleOpen}
        variant="text"
        color="inherit"
        sx={{
          fontSize: "0.875rem",
          textTransform: "none",
          "&:hover": { color: "#333" },
        }}
      >
        Account
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
      >
        {user
          ? [
              ...accountItems.map((item) => (
                <MenuItem key={item} onClick={handleClose}>
                  {item}
                </MenuItem>
              )),
              <Divider key="divider" />,
              <MenuItem key="logout" onClick={handleLogout}>
                Logout
              </MenuItem>,
            ]
          : [
              <MenuItem key="login" onClick={() => router.push("/login")}>
                Login
              </MenuItem>,
              <MenuItem key="register" onClick={() => router.push("/register")}>
                Register
              </MenuItem>,
            ]}
      </Menu>
    </Box>
  );
};

export default AccountMenu;
