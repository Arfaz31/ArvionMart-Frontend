import { IconButton, Badge, Box } from "@mui/material";
import { FavoriteBorder, ShoppingBagOutlined } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const NavButtons = ({
  wishlistCount,
  cartCount,
  mobile = false,
}: {
  wishlistCount: number;
  cartCount: number;
  mobile?: boolean;
}) => {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        gap: mobile ? 1 : undefined,
        ml: mobile ? 1 : undefined,
      }}
    >
      <IconButton
        aria-label="wishlist"
        sx={{ color: "#555" }}
        onClick={() => router.push("/wishlist")}
      >
        <Badge badgeContent={wishlistCount} color="error">
          <FavoriteBorder />
        </Badge>
      </IconButton>
      <IconButton
        aria-label="cart"
        sx={{ color: "#555" }}
        onClick={() => router.push("/cart")}
      >
        <Badge badgeContent={cartCount} color="error">
          <ShoppingBagOutlined />
        </Badge>
      </IconButton>
    </Box>
  );
};

export default NavButtons;
