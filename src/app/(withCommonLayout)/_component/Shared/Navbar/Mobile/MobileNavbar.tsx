"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import Paper from "@mui/material/Paper";
import {
  AccountCircleRounded,
  HomeFilled,
  ShoppingBag,
  Textsms,
} from "@mui/icons-material";
import { Typography } from "@mui/material";

const MobileNavbar = () => {
  return (
    <React.Fragment>
      <Paper
        elevation={3}
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          bgcolor: "#ffffff",
          display: {
            xs: "flex",
            sm: "none",
          },
        }}
      >
        <AppBar
          position="static"
          sx={{
            background: "transparent",
            boxShadow: "none",
            flexGrow: 1,
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: 2,
              position: "relative",
              minHeight: 66,
            }}
          >
            <IconButton
              color="primary"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
              }}
            >
              <HomeFilled
                sx={{
                  fontSize: "1.7rem",
                }}
              />
              <Typography variant="body2" color="primary">
                Home
              </Typography>
            </IconButton>
            <IconButton
              color="primary"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
              }}
            >
              <ShoppingBag
                sx={{
                  fontSize: "1.7rem",
                }}
              />
              <Typography variant="body2">Cart</Typography>
            </IconButton>
            <IconButton
              color="primary"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
              }}
            >
              <Textsms
                sx={{
                  fontSize: "1.6rem",
                }}
              />
              <Typography variant="body2">Message</Typography>
            </IconButton>

            <IconButton
              color="primary"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
              }}
            >
              <AccountCircleRounded />
              <Typography variant="body2">Cart</Typography>
            </IconButton>
          </Toolbar>
        </AppBar>
      </Paper>
    </React.Fragment>
  );
};

export default MobileNavbar;
