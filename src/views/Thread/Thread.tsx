import { Button, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getThreads } from "../../services/threadService";
import { IThread } from "../../types/threadTypes";
import { createPost, getPostsInThread } from "../../services/postService";
import { IPost } from "../../types/postTypes";
import { useParams } from "react-router-dom";
import Post from "../../components/Post";
import PostEditor from "../../components/PostEditor";

const Thread = () => {
  const [posts, setPosts] = useState<IPost[]>();
  const { id } = useParams();

  useEffect(() => {
    if (id === undefined) {
      return;
    }

    getPostsInThread(id).then((posts) => {
      setPosts(posts);
    });
  }, []);

  const submitPost = (content: string) => {
    console.log(content);
    const newPost: IPost = {
      id: "1",
      threadId: id!,
      userId: "testuser",
      content: content,
      createdDate: "2024-08-01T18:20:25.410Z",
    };
    createPost(id!, newPost).then((post) => {
      getPostsInThread(id!).then((posts) => {
        setPosts(posts);
      });
    });
  };

  return (
    <Grid container spacing={3}>
      {posts?.map((post, index) => (
        <Grid key={index} item xs={12}>
          <Post username={post.userId} content={post.content} />
        </Grid>
      ))}
      <Grid item xs={12} padding={1}>
        <PostEditor onSubmit={submitPost} />
      </Grid>
    </Grid>
  );
};

export default Thread;
