import appConfig from "config/appConfig";
import { ICreateProject, IProject, IUpdateProject } from "types/projectTypes";

export const getProjects = async (): Promise<IProject[]> => {
	const headers = new Headers();

	var options = {
		method: "GET",
		headers: headers,
	};

	const endpoint = `${appConfig.apiUri}/v1/project`;

	try {
		const response = await fetch(endpoint, options);
		const projects = (await response.json()) as IProject[];
		return projects;
	} catch (error) {
		console.error("Failed to fetch projects:", error);
		throw error;
	}
};

export const getProject = async (projectId: string): Promise<IProject> => {
	const headers = new Headers();

	var options = {
		method: "GET",
		headers: headers,
	};

	const endpoint = `${appConfig.apiUri}/v1/project/${projectId}`;

	try {
		const response = await fetch(endpoint, options);
		const project = (await response.json()) as IProject;
		return project;
	} catch (error) {
		console.error(`Failed to fetch project with ID ${projectId}:`, error);
		throw error;
	}
};

export const createProject = async (
	project: ICreateProject
): Promise<IProject> => {
	const headers = new Headers({
		"Content-Type": "application/json",
	});

	var options = {
		method: "POST",
		headers: headers,
		body: JSON.stringify(project),
	};

	const endpoint = `${appConfig.apiUri}/v1/project`;

	try {
		const response = await fetch(endpoint, options);
		const createdProject = (await response.json()) as IProject;
		return createdProject;
	} catch (error) {
		console.error("Failed to create project:", error);
		throw error;
	}
};

export const updateProject = async (
	projectId: string,
	updatedProject: IUpdateProject
): Promise<IProject> => {
	const headers = new Headers({
		"Content-Type": "application/json",
	});

	const options = {
		method: "PUT",
		headers: headers,
		body: JSON.stringify(updatedProject),
	};

	const endpoint = `${appConfig.apiUri}/v1/project/${projectId}`;

	try {
		const response = await fetch(endpoint, options);
		const updatedProject = (await response.json()) as IProject;
		return updatedProject;
	} catch (error) {
		console.error(`Failed to update project with ID ${projectId}:`, error);
		throw error;
	}
};

export const deleteProject = async (projectId: string): Promise<void> => {
	const headers = new Headers();

	const options = {
		method: "DELETE",
		headers: headers,
	};

	const endpoint = `${appConfig.apiUri}/v1/project/${projectId}`;

	try {
		const response = await fetch(endpoint, options);
		if (!response.ok) {
			throw new Error(`Failed to delete project with ID ${projectId}`);
		}
	} catch (error) {
		console.error(`Failed to delete project with ID ${projectId}:`, error);
		throw error;
	}
};
