import appConfig from "../config/appConfig";
import { IPost } from "../types/postTypes";

export const getPostsInThread = async (threadId: string): Promise<IPost[]> => {
  const headers = new Headers();

  var options = {
    method: "GET",
    headers: headers,
  };

  const endpoint = `${appConfig.apiUri}/v1/thread/${threadId}/post`;

  try {
    const response = await fetch(endpoint, options);
    const posts = (await response.json()) as IPost[];
    return posts;
  } catch (error) {
    console.error("Failed to fetch thread:", error);
    throw error;
  }
};

export const createPost = async (
  threadId: string,
  post: IPost
): Promise<IPost> => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  var options = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(post),
  };

  const endpoint = `${appConfig.apiUri}/v1/post`;

  try {
    const response = await fetch(endpoint, options);
    const createdPost = (await response.json()) as IPost;
    return createdPost;
  } catch (error) {
    console.error("Failed to fetch thread:", error);
    throw error;
  }
};
