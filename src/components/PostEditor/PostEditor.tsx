import React, { useState } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";

interface Props {
  onSubmit: (postText: string) => void;
}

const PostEditor: React.FC<Props> = ({ onSubmit }) => {
  const [text, setText] = useState<string>("");

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setText(event.target.value);
  };

  const submitPost = () => {
    onSubmit(text);
    setText("");
  };

  return (
    <Box
      sx={{
        maxWidth: "100%",
      }}
    >
      <TextField
        multiline
        minRows={3}
        maxRows={10}
        variant="outlined"
        fullWidth
        value={text}
        onChange={handleTextFieldChange}
      />
      <Grid paddingTop={1}>
        <Button fullWidth variant="contained" onClick={submitPost}>
          POST
        </Button>
      </Grid>
    </Box>
  );
};

export default PostEditor;
