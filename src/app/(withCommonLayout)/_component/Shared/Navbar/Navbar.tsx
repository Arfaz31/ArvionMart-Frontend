/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

import logo from "@/assests/logo/LogoAnimated.gif";
import { Box } from "@mui/material";
import { selectWishListCount } from "@/redux/features/wishList/wishListSlice";
import { selectCartItems } from "@/redux/features/cart/cartSlice";
import { logout } from "@/Services/authServices";
import MobileNav from "./MobileNav";
import TopBar from "./TopBar";
import MainNav from "./MainNav";

type UserProps = {
  user?: {
    _id?: string | null | undefined;
    userId?: string | null | undefined;
    email?: string | null | undefined;
    role?: string | null | undefined;
  };
};

const Navbar = ({ session }: { session: UserProps | null }) => {
  const { user } = useSelector((state: RootState) => state.auth as any);
  const wishlistCount = useSelector(selectWishListCount);
  const cartItems = useSelector(selectCartItems);

  // Fixed: Count unique items instead of total quantity
  const cartCount = cartItems.length;

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <Box sx={{ flexGrow: 1, position: "relative" }}>
      {/* Mobile Navigation */}
      <MobileNav
        logo={logo}
        wishlistCount={wishlistCount}
        cartCount={cartCount}
      />

      {/* Desktop Navigation */}
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <TopBar user={user || session?.user} handleLogout={handleLogout} />
        <MainNav
          logo={logo}
          user={user || session?.user}
          handleLogout={handleLogout}
          wishlistCount={wishlistCount}
          cartCount={cartCount}
        />
      </Box>
    </Box>
  );
};

export default Navbar;
