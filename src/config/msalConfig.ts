import { LogLevel } from "@azure/msal-browser";
import appConfig from "./appConfig";

/**
 * Configuration object to be passed to MSAL instance on creation.
 */
export const msalConfig = {
  auth: {
    clientId: appConfig.msalCliendId,
    authority: appConfig.msalAuthority,
    redirectUri: appConfig.msalRedirectUri, //eg: ${window.location.origin}/Dashboard
    postLogoutRedirectUri: "/",
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: "localStorage", // "sessionStorage" or"localStorage"
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (
        level: LogLevel,
        message: string,
        containsPii: boolean
      ) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
    allowNativeBroker: false,
  },
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 */
export const loginRequest = {
  scopes: ["Files.Read"],
};

/**
 * An optional silentRequest object can be used to achieve silent SSO
 * between applications by providing a "login_hint" property.
 */
export const silentRequest = {
  scopes: ["openid", "profile"],
  loginHint: "example@domain.net",
};
