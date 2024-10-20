import { LogLevel } from "@azure/msal-browser";
import appConfig from "./appConfig";

/**
 * Configuration object to be passed to MSAL instance on creation.
 */
//REACT_APP_MSAL_CLIENT_ID=4f2c4a9a-1e7d-4f79-8a83-50e4c7b9f375
//REACT_APP_MSAL_AUTHORITY=https://login.microsoftonline.com/0c9c1cf7-0e0f-40cd-9b93-d922688a1656/
export const msalConfig = {
	auth: {
		clientId: "4f2c4a9a-1e7d-4f79-8a83-50e4c7b9f375",
		authority:
			"https://login.microsoftonline.com/0c9c1cf7-0e0f-40cd-9b93-d922688a1656/",
		redirectUri: appConfig.msalRedirectUri, //eg: ${window.location.origin}/Dashboard
		postLogoutRedirectUri: "/login",
		navigateToLoginRequestUrl: false,
	},
	cache: {
		cacheLocation: "localStorage", // "sessionStorage" or"localStorage"
		storeAuthStateInCookie: true,
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

export const loginRequest = {
	scopes: ["Files.Read"],
};

export const silentRequest = {
	scopes: ["openid", "profile"],
	loginHint: "example@domain.net",
};
