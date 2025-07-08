'use client';
import * as React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Paper,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Divider,
} from '@mui/material';
import {
  Home,
  FavoriteBorder,
  ShoppingBagOutlined,
  PersonOutline,
  Menu as MenuIcon,
  ExpandLess,
  ChevronRight,
} from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMounted } from '@/hooks/use-mounted';

// Mock data for categories - replace with actual data fetching
const categories = [
  {
    name: 'Electronics',
    subcategories: ['Smartphones', 'Laptops', 'Tablets'],
  },
  {
    name: 'Fashion',
    subcategories:["Men's", "Women's", 'Kids'],
  },
  {
    name: 'Home & Garden',
    subcategories: ['Furniture', 'Decor', 'Gardening'],
  },
];

const MobileNavbar = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [openCategory, setOpenCategory] = React.useState<string | null>(null);
  const pathname = usePathname();
  const mounted = useMounted();

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleCategoryClick = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
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
        <ListItem component={Link} href="/all-products">
          <ListItemText primary="All Products" />
        </ListItem>
        {categories.map((category) => (
          <React.Fragment key={category.name}>
            <ListItem button onClick={() => handleCategoryClick(category.name)}>
              <ListItemText primary={category.name} />
              {openCategory === category.name ? <ExpandLess /> : <ChevronRight />}
            </ListItem>
            <Collapse
              in={openCategory === category.name}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {category.subcategories.map((sub) => (
                  <ListItem
                    key={sub}
                    sx={{ pl: 4 }}
                    component={Link}
                    href={`/products?category=${category.name}&subcategory=${sub}`}
                  >
                    <ListItemText primary={sub} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
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
  ];

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: { xs: 'block', md: 'none' },
        }}
      >
        <AppBar
          position="static"
          sx={{ background: 'white', boxShadow: 'none' }}
        >
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer(true)}
              sx={{ color: '#555' }}
            >
              <MenuIcon />
            </IconButton>
            {navItems.map((item) => (
              <Link href={item.href} passHref key={item.label}>
                <IconButton
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
      </Paper>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </>
  );
};

export default MobileNavbar;
