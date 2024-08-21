import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";

interface Props {
  username: string;
  content: string;
}

const Post: React.FC<Props> = ({ username, content }) => {
  return (
    <Box>
      <Paper>
        <Grid container>
          <Grid item xs={12} margin={2}>
            <Typography variant="h6">{username}</Typography>
          </Grid>
          <Grid item margin={2} marginTop={0}>
            <Typography variant="body1">{content}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Post;
