import appConfig from "config/appConfig";
import {
	ICreateDocument,
	IDocument,
	IUpdateDocument,
} from "types/documentTypes";

export const getDocuments = async (): Promise<IDocument[]> => {
	const headers = new Headers();

	var options = {
		method: "GET",
		headers: headers,
	};

	const endpoint = `${appConfig.apiUri}/v1/document`;

	try {
		const response = await fetch(endpoint, options);
		const documents = (await response.json()) as IDocument[];
		return documents;
	} catch (error) {
		console.error("Failed to fetch documents:", error);
		throw error;
	}
};

export const getDocumentsByProjectId = async (
	projectId: string
): Promise<IDocument[]> => {
	const headers = new Headers();

	var options = {
		method: "GET",
		headers: headers,
	};

	const endpoint = `${appConfig.apiUri}/v1/project/${projectId}/documents`;

	try {
		const response = await fetch(endpoint, options);
		const documents = (await response.json()) as IDocument[];
		return documents;
	} catch (error) {
		console.error("Failed to fetch documents:", error);
		throw error;
	}
};

export const getDocument = async (documentId: string): Promise<IDocument> => {
	const headers = new Headers();

	const options = {
		method: "GET",
		headers: headers,
	};

	const endpoint = `${appConfig.apiUri}/v1/document/${documentId}`;

	try {
		const response = await fetch(endpoint, options);
		const document = (await response.json()) as IDocument;
		return document;
	} catch (error) {
		console.error(`Failed to fetch document with ID ${documentId}:`, error);
		throw error;
	}
};

export const createDocument = async (
	createDocument: ICreateDocument
): Promise<IDocument> => {
	const headers = new Headers({
		"Content-Type": "application/json",
	});

	const options = {
		method: "POST",
		headers: headers,
		body: JSON.stringify(createDocument),
	};

	const endpoint = `${appConfig.apiUri}/v1/document`;

	try {
		const response = await fetch(endpoint, options);
		const createdDocument = (await response.json()) as IDocument;
		return createdDocument;
	} catch (error) {
		console.error("Failed to create document:", error);
		throw error;
	}
};

export const updateDocument = async (
	documentId: string,
	updateDocument: IUpdateDocument
): Promise<IDocument> => {
	const headers = new Headers({
		"Content-Type": "application/json",
	});

	const options = {
		method: "PUT",
		headers: headers,
		body: JSON.stringify(updateDocument),
	};

	const endpoint = `${appConfig.apiUri}/v1/document/${documentId}`;

	try {
		const response = await fetch(endpoint, options);
		const updatedDocument = (await response.json()) as IDocument;
		return updatedDocument;
	} catch (error) {
		console.error("Failed to update document:", error);
		throw error;
	}
};

export const deleteDocument = async (documentId: string): Promise<void> => {
	const headers = new Headers();

	const options = {
		method: "DELETE",
		headers: headers,
	};

	const endpoint = `${appConfig.apiUri}/v1/document/${documentId}`;

	try {
		const response = await fetch(endpoint, options);
		if (!response.ok) {
			throw new Error(`Failed to delete project with ID ${documentId}`);
		}
	} catch (error) {
		console.error(`Failed to delete project with ID ${documentId}:`, error);
		throw error;
	}
};
