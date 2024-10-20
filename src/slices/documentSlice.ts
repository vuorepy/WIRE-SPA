import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";
import { IDocument } from "types/documentTypes";

interface DocumentState {
	documents: Array<IDocument>;
	selectedDocument: IDocument | undefined;
}

const initialState: DocumentState = {
	documents: Array<IDocument>(),
	selectedDocument: undefined,
};

export const documentSlice = createSlice({
	name: "document",
	initialState,
	reducers: {
		setDocumentsReducer: (state, action: PayloadAction<Array<IDocument>>) => {
			state.documents = action.payload;
		},
		setSelectedDocumentReducer: (state, action: PayloadAction<IDocument>) => {
			state.selectedDocument = action.payload;
		},
		addDocumentReducer: (state, action: PayloadAction<IDocument>) => {
			state.documents?.push(action.payload);
		},
		updateDocumentReducer: (state, action: PayloadAction<IDocument>) => {
			var index = state.documents.findIndex((x) => x.id === action.payload.id);

			if (index !== -1) {
				state.documents[index] = action.payload;
			}
		},
		removeDocumentReducer: (state, action: PayloadAction<IDocument>) => {
			var index = state.documents.findIndex((x) => x.id === action.payload.id);

			if (index !== -1) {
				state.documents.splice(index, 1);
			}
		},
		resetDocumentReducer: (state, action: PayloadAction<any>) => {
			state.documents = [];
			state.selectedDocument = undefined;
		},
	},
});

export const {
	setDocumentsReducer,
	addDocumentReducer,
	updateDocumentReducer,
	removeDocumentReducer,
	setSelectedDocumentReducer,
	resetDocumentReducer,
} = documentSlice.actions;

export const selectCount = (state: RootState) => state.document;
export default documentSlice.reducer;
