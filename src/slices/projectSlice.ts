import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";
import { IProject } from "types/projectTypes";

interface ProjectState {
	projects: Array<IProject>;
	selectedProject: IProject | undefined;
}

const initialState: ProjectState = {
	projects: Array<IProject>(),
	selectedProject: undefined,
};

export const projectSlice = createSlice({
	name: "project",
	initialState,
	reducers: {
		setProjectsReducer: (state, action: PayloadAction<Array<IProject>>) => {
			state.projects = action.payload;
		},
		setSelectedProjectReducer: (state, action: PayloadAction<IProject>) => {
			state.selectedProject = action.payload;
		},
		addProjectReducer: (state, action: PayloadAction<IProject>) => {
			state.projects?.push(action.payload);
		},
		updateProjectReducer: (state, action: PayloadAction<IProject>) => {
			var index = state.projects.findIndex((x) => x.id === action.payload.id);

			if (index !== -1) {
				state.projects[index] = action.payload;
			}
		},
		removeProjectReducer: (state, action: PayloadAction<IProject>) => {
			var index = state.projects.findIndex((x) => x.id === action.payload.id);

			if (index !== -1) {
				state.projects.splice(index, 1);
			}
		},
		resetProjectReducer: (state, action: PayloadAction<any>) => {
			state.projects = [];
			state.selectedProject = undefined;
		},
	},
});

export const {
	setProjectsReducer,
	addProjectReducer,
	updateProjectReducer,
	removeProjectReducer,
	setSelectedProjectReducer,
	resetProjectReducer,
} = projectSlice.actions;

export const selectCount = (state: RootState) => state.project;
export default projectSlice.reducer;
