import { createTheme } from "@mui/material";

interface IWireColors {
	blackPrimary: string;
	greyPrimary: string;
	redPrimary: string;
	whitePrimary: string;
	bluePrimary: string;
	orangePrimary: string;
}

export const wireColors: IWireColors = {
	blackPrimary: "#151515",
	greyPrimary: "#37424A",
	redPrimary: "#D52B1E",
	whitePrimary: "#FFFFFF",
	bluePrimary: "#3EB1C8",
	orangePrimary: "#FFA500",
};

const wireTheme = createTheme({
	palette: {
		primary: {
			main: wireColors.blackPrimary,
		},
		secondary: {
			main: wireColors.orangePrimary,
		},
		background: {
			paper: wireColors.whitePrimary,
		},
	},
	typography: {
		h1: {
			fontFamily: '"Arial"',
			fontWeight: 700,
			letterSpacing: 0.8,
		},
		h2: {
			fontFamily: '"Arial"',
			fontWeight: 700,
			letterSpacing: 0.8,
		},
		h3: {
			fontFamily: '"Arial"',
			fontWeight: 400,
			letterSpacing: 0.8,
			fontSize: 22,
		},
		h4: {
			fontFamily: '"Arial"',
			fontWeight: "bold",
			letterSpacing: 0.8,
			fontSize: 16,
		},
		h5: {
			fontFamily: '"Arial"',
			fontWeight: 400,
			letterSpacing: 0.8,
		},
		h6: {
			fontFamily: '"Arial"',
			fontWeight: 400,
			letterSpacing: 0.8,
		},
		body1: {
			fontFamily: '"Arial"',
			fontWeight: 400,
		},
		body2: {
			fontFamily: '"Arial"',
			color: wireColors.greyPrimary,
			fontWeight: 400,
		},
		subtitle1: {
			fontFamily: '"Arial"',
			fontWeight: 400,
		},
		subtitle2: {
			fontFamily: '"Arial"',
			fontWeight: 400,
		},
		button: {
			fontFamily: '"Arial"',
			fontWeight: 400,
		},
		caption: {
			fontFamily: '"Arial"',
			fontWeight: 400,
		},
		overline: {
			fontFamily: '"Arial"',
			fontWeight: 400,
		},
	},
});

export default wireTheme;
