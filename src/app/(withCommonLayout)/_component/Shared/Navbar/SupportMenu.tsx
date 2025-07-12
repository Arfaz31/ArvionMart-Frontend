import { useState } from "react";
import { Menu, MenuItem, Button } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import Link from "next/link";

const SupportMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const supportItems = [
    "About",
    "Contact",
    "Privacy Policy",
    "Shipping And Delivery",
    "Terms Of Service",
    "Return And Refund",
  ];

  const handleOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Button
        endIcon={<KeyboardArrowDown />}
        onClick={handleOpen}
        sx={{
          color: "#333",
          textTransform: "none",
          fontWeight: 500,
          "&:hover": { bgcolor: "transparent", color: "#666" },
        }}
        variant="text"
      >
        Support
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
      >
        {supportItems.map((item) => (
          <MenuItem
            key={item}
            onClick={handleClose}
            component={Link}
            href={`/${item
              .toLowerCase()
              .replace(/&/g, "and")
              .replace(/[^a-z0-9\s-]/g, "")
              .trim()
              .replace(/\s+/g, "-")}`}
          >
            {item}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default SupportMenu;
