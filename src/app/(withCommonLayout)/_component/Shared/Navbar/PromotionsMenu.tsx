import { useState } from "react";
import { Menu, MenuItem, Button } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { LocalOfferOutlined as LocalOfferOutlinedIcon } from "@mui/icons-material";
import { CardGiftcardOutlined as CardGiftcardOutlinedIcon } from "@mui/icons-material";
import { LocalShippingOutlined as LocalShippingOutlinedIcon } from "@mui/icons-material";

const PromotionsMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const promotionItems = [
    "Deals / Sale",
    "Clearance",
    "Gift Cards",
    "Track Order",
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
          mx: 1.5,
          textTransform: "none",
          fontWeight: 500,
          "&:hover": { bgcolor: "transparent", color: "#666" },
        }}
        variant="text"
      >
        Promotions
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
      >
        {promotionItems.map((item) => (
          <MenuItem key={item} onClick={handleClose}>
            {item === "Deals / Sale" && (
              <LocalOfferOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
            )}
            {item === "Gift Cards" && (
              <CardGiftcardOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
            )}
            {item === "Track Order" && (
              <LocalShippingOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
            )}
            {item}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default PromotionsMenu;
