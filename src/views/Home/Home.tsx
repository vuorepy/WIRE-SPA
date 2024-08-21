import { Button, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getThreads } from "../../services/threadService";
import { IThread } from "../../types/threadTypes";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [threads, setThreads] = useState<IThread[]>();

  useEffect(() => {
    getThreads().then((threads) => {
      setThreads(threads);
    });
  }, []);

  const thread_onClick = (thread: IThread) => {
    navigate(`/thread/${thread.id}`);
  };

  return (
    <Grid container spacing={3}>
      <Grid container direction="row-reverse">
        <Button variant="contained">NEW THREAD</Button>
      </Grid>

      <Grid container>
        {threads?.map((thread, index) => (
          <Grid key={index} item xs={12}>
            <Button variant="contained" onClick={() => thread_onClick(thread)}>
              {thread.title}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Home;
