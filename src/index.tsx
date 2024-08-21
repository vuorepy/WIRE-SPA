import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import wireTheme from "./theme";
import { msalConfig } from "./config/msalConfig";

const msalInstance = new PublicClientApplication(msalConfig);
msalInstance.initialize();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <CssBaseline />
      <App />
    </MsalProvider>
  </React.StrictMode>
);
