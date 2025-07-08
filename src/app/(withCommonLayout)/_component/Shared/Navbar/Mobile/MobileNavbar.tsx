/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import * as React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
 
  Divider,
} from '@mui/material';
import {
  Home,
  FavoriteBorder,
  ShoppingBagOutlined,
  PersonOutline,
  Menu as MenuIcon,
 
} from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMounted } from '@/hooks/use-mounted';



import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { logout } from '@/Services/authServices';
import { signOut } from 'next-auth/react';
import { toast } from 'sonner';

const MobileNavbar = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const pathname = usePathname();
  const mounted = useMounted();

  const { user } = useSelector((state: RootState) => state.auth as any);
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

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

 

  if (!mounted) {
    return null;
  }

  const drawerContent = (
    <Box
      sx={{ width: 280, padding: '1rem' }}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >
      <Typography variant="h6" sx={{ marginBottom: '1rem' }}>
        Menu
      </Typography>
      <List>
        {user?.email ? (
          <>
            <ListItem component={Link} href="/profile">
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem component={Link} href="/orders">
              <ListItemText primary="Orders" />
            </ListItem>
            <ListItem onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem component={Link} href="/login">
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem component={Link} href="/register">
              <ListItemText primary="Register" />
            </ListItem>
          </>
        )}
        <Divider sx={{ marginY: '1rem' }} />
        <ListItem component={Link} href="/brands">
          <ListItemText primary="All Brands" />
        </ListItem>
        <ListItem component={Link} href="/about">
          <ListItemText primary="About Us" />
        </ListItem>
        <ListItem component={Link} href="/contact">
          <ListItemText primary="Contact Us" />
        </ListItem>
      </List>
    </Box>
  );

  const navItems = [
    { href: '/', label: 'Home', icon: <Home /> },
    { href: '/wishlist', label: 'Wishlist', icon: <FavoriteBorder /> },
    { href: '/cart', label: 'Cart', icon: <ShoppingBagOutlined /> },
    { href: '/login', label: 'Account', icon: <PersonOutline /> },
    { href: '#', label: 'Menu', icon: <MenuIcon />, onClick: toggleDrawer(true) },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          top: 'auto',
          bottom: 0,
          display: { xs: 'block', md: 'none' },
          background: 'white',
          boxShadow: '0 -1px 4px rgba(0,0,0,0.1)',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-around' }}>
          {navItems.map((item) => (
            <Link href={item.href} passHref key={item.label}>
              <IconButton
                onClick={item.onClick}
                sx={{
                  flexDirection: 'column',
                  color: pathname === item.href ? 'primary.main' : '#555',
                  borderRadius: '8px',
                  padding: '4px 8px',
                }}
              >
                {item.icon}
                <Typography
                  variant="caption"
                  sx={{
                    marginTop: '2px',
                    fontWeight: pathname === item.href ? 'bold' : 'normal',
                  }}
                >
                  {item.label}
                </Typography>
              </IconButton>
            </Link>
          ))}
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </>
  );
};

export default MobileNavbar;
