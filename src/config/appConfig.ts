interface IAppConfig {
  msalCliendId: string;
  msalAuthority: string;
  msalRedirectUri: string;
  apiUri: string;
}

const appConfig: IAppConfig = {
  msalCliendId: process.env.REACT_APP_MSAL_CLIENT_ID || "",
  msalAuthority: process.env.REACT_APP_MSAL_AUTHORITY || "",
  msalRedirectUri: process.env.REACT_APP_MSAL_REDIRECT_URI || "",
  apiUri: process.env.REACT_APP_API_URI || "",
};

export default appConfig;
