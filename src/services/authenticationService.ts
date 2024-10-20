import { loginRequest } from "config/msalConfig";
import { msalInstance } from "index";

export const getAccessToken = async (): Promise<any> => {
	const account = msalInstance.getActiveAccount();

	if (!account) {
		throw new Error("User account missing from MSAL instance");
	}

	const response = await msalInstance.acquireTokenSilent({
		...loginRequest,
		account: account,
	});

	const accessToken = response.accessToken;

	return accessToken;
};
