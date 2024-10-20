export interface IDocument {
	id: string;
	projectId: string;
	title: string;
	content: string;
}

export interface ICreateDocument {
	projectId: string;
	title: string;
	content: string;
}

export interface IUpdateDocument {
	projectId: string;
	title: string;
	content: string;
}
