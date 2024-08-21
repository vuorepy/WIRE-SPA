import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Container } from "@mui/system";
import { Outlet } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { loginRequest } from "../../config/msalConfig";

const Layout: React.FC = () => {
  const { instance } = useMsal();

  useEffect(() => {}, []);

  const signIn_onClick = () => {
    instance.loginRedirect(loginRequest).catch((e) => {
      console.log(e);
    });
  };

  const signOut_onClick = () => {
    instance.logoutRedirect();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Wire
          </Typography>
          <UnauthenticatedTemplate>
            <Button color="inherit" onClick={signIn_onClick}>
              Sign In
            </Button>
          </UnauthenticatedTemplate>
          <AuthenticatedTemplate>
            <Button color="inherit" onClick={signOut_onClick}>
              Sign Out
            </Button>
          </AuthenticatedTemplate>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          backgroundColor: "#FFFFFF",
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
