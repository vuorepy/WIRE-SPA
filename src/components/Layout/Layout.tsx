import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Container } from "@mui/system";
import { Outlet } from "react-router-dom";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { CssBaseline } from "@mui/material";
import { getAccessToken } from "services/authenticationService";

const Layout: React.FC = () => {
  const { instance } = useMsal();
  const handleSignOutClick = () => {
    instance.logoutRedirect();
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography paddingLeft={4} component="h1" variant="h6" color="secondary" fontWeight={600} noWrap sx={{ flexGrow: 1 }}>
            WIRE
          </Typography>
          <Button color="secondary" variant="outlined" onClick={handleSignOutClick}>Sign Out</Button>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Box >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
