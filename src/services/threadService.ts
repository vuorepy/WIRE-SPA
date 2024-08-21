import { ICreateThread, IThread } from "../types/threadTypes";
import appConfig from "../config/appConfig";

export const getThreads = async (): Promise<IThread[]> => {
  const headers = new Headers();

  var options = {
    method: "GET",
    headers: headers,
  };

  const endpoint = `${appConfig.apiUri}/v1/thread`;

  try {
    const response = await fetch(endpoint, options);
    const threads = (await response.json()) as IThread[];
    return threads;
  } catch (error) {
    console.error("Failed to fetch thread:", error);
    throw error;
  }
};

export const getThread = async (id: string): Promise<IThread> => {
  var headers = new Headers();
  //var bearer = "Bearer " + response.accessToken;
  //headers.append("Authorization", bearer);
  var options = {
    method: "GET",
    headers: headers,
  };
  const endpoint = `${appConfig.apiUri}/thread/${id}`;

  try {
    const response = await fetch(endpoint, options);
    const thread = (await response.json()) as IThread;
    return thread;
  } catch (error) {
    console.error("Failed to fetch thread:", error);
    throw error;
  }
};

export const createThread = async (thread: ICreateThread): Promise<IThread> => {
  var headers = new Headers();
  //var bearer = "Bearer " + response.accessToken;
  //headers.append("Authorization", bearer);
  var options = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(thread),
  };
  const endpoint = `${appConfig.apiUri}/thread`;

  try {
    const response = await fetch(endpoint, options);
    const createdThread = (await response.json()) as IThread;
    return createdThread;
  } catch (error) {
    console.error("Failed to fetch thread:", error);
    throw error;
  }
};
