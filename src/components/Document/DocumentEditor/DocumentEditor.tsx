import { Box, Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import ReactQuill from "react-quill";
import { generateText } from "services/contentGenerationService";
import { IGenerateText } from "types/contentGenerationTypes";
import { IDocument, IUpdateDocument } from "types/documentTypes";
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from "@mui/lab";
import { updateDocument } from "services/documentService";
import EditIcon from '@mui/icons-material/Edit';
import UpdateDocumentDialog from "../UpdateDocumentDialog/UpdateDocumentDialog";
import { useAppDispatch, useAppSelector } from "hooks";
import { updateDocumentReducer } from "slices/documentSlice";

interface DocumentEditorProps {
  document: IDocument;
  onContentChange: (content: string) => void;
}

const DocumentEditor: React.FC<DocumentEditorProps> = ({ document, onContentChange }) => {
  const dispatch = useAppDispatch();
  const selectedDocument = useAppSelector(
    (state) => state.document.selectedDocument
  );
  const [editorContent, setEditorContent] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [updateDocumentDialogOpen, setUpdateDocumentDialogOpen] = useState(false);
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);

  useEffect(() => {
    setEditorContent(document.content);
  }, [document]);

  const handleSaveDocument = () => {
    if (document) {
      const updatedDocument: IUpdateDocument = {
        projectId: document.projectId,
        title: document.title,
        content: editorContent,
      };

      updateDocument(document.id, updatedDocument).then((document) => {
        dispatch(updateDocumentReducer(document));
        setEditorContent(document.content);
      }
      ).catch((error) => {
        console.error('Failed to update document:', error);
      }
      );
    }
  }

  const onEditorChange = (content: string) => {
    setEditorContent(content);
    onContentChange(content);
  };

  const handleGenerateContent = () => {
    const generateTextRequest: IGenerateText = {
      prompt: prompt,
      context: editorContent,
    };

    setIsGeneratingContent(true);

    generateText(generateTextRequest).then((response) => {
      setEditorContent(editorContent + " \n " + response.content);
    }).catch((error) => {
      console.error('Failed to generate text:', error);
    }).finally(() => {
      setIsGeneratingContent(false);
    });
  }

  const handleUpdateDocumentClick = () => {
    setUpdateDocumentDialogOpen(true);
  }

  const handleOnUpdateDocumentClose = () => {
    setUpdateDocumentDialogOpen(false);
  }

  return (
    <Container>
      <Grid container>
        <Grid container justifyContent="space-between" alignItems="flex-end">
          <Grid xs={11} container padding={2} alignItems="flex-start">
            <Grid item >
              <Typography variant="h2">
                {selectedDocument && selectedDocument.title}
              </Typography>
            </Grid>
            <Grid item >
              <LoadingButton
                color="secondary"
                onClick={handleUpdateDocumentClick}
                variant="text"
              >
                <EditIcon />
              </LoadingButton>
              {selectedDocument && <UpdateDocumentDialog document={selectedDocument} open={updateDocumentDialogOpen} onClose={handleOnUpdateDocumentClose} />}
            </Grid>
          </Grid>
          <Grid xs={1} item>
            <LoadingButton
              color="secondary"
              onClick={handleSaveDocument}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
            >
              Save
            </LoadingButton>
          </Grid>
        </Grid>
        <Grid item xs={12} paddingTop={2}>
          <Paper>
            <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css" />
            <div className="quill-editor">
              <ReactQuill theme="snow" value={editorContent} onChange={onEditorChange} style={{
                height: "100%", minHeight: "500px"
              }} />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} paddingTop={4}>
          <Paper>
            <TextField
              id="outlined-multiline-static"
              fullWidth
              label="Enter prompt for content generation"
              multiline
              rows={3}
              variant="outlined"
              onChange={(event) => setPrompt(event.target.value)}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} paddingTop={2}>
          <LoadingButton
            fullWidth
            color="secondary"
            onClick={handleGenerateContent}
            variant="contained"
            loading={isGeneratingContent}
          >
            GENERATE
          </LoadingButton>
        </Grid>
      </Grid>
    </Container >
  );
};

export default DocumentEditor;

