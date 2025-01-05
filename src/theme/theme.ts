import { createContext } from "react";

export const theme = {
	light: {background: "#eaf4ef", color: "#2A4644"},
	dark: {
		background: "#2A4644",
		color: "#eaf4ef",
	},
};

export const SiteTheme = createContext(theme.light);

