import { configureStore } from "@reduxjs/toolkit";
import documentSlice from "slices/documentSlice";
import projectSlice from "slices/projectSlice";

export const store = configureStore({
	reducer: {
		project: projectSlice,
		document: documentSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
