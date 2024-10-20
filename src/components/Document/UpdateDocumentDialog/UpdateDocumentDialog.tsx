import React, { useState } from 'react';
import * as Yup from 'yup';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import { IDocument, IUpdateDocument } from 'types/documentTypes';
import { updateDocument } from 'services/documentService';
import { useAppDispatch } from 'hooks';
import { setSelectedDocumentReducer, updateDocumentReducer } from 'slices/documentSlice';

interface UpdateDocumentDialogProps {
  document: IDocument;
  open: boolean;
  onClose: () => void;
}

const UpdateDocumentDialog: React.FC<UpdateDocumentDialogProps> = ({ document, open, onClose }) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const initialValues: IUpdateDocument = {
    projectId: document.projectId,
    title: document.title,
    content: document.content,
  };
  const updateProjectValidationScheme = Yup.object({
    title: Yup.string().required("Please enter document title"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: updateProjectValidationScheme,
    onSubmit: (values) => {
      setIsLoading(true);

      updateDocument(document.id, values).then((document) => {
        dispatch(updateDocumentReducer(document));
        dispatch(setSelectedDocumentReducer(document));
        handleOnClose();
      }).catch((error) => {
        console.error('Failed to update document:', error);
      }).finally(() => {
        setIsLoading(false);
      });
    },
  });

  const handleOnClose = () => {
    onClose();
    setIsLoading(false);
    formik.resetForm();
  }

  return (
    <Dialog open={open} onClose={handleOnClose} maxWidth="sm" fullWidth>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Update {document.title}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id="title"
            margin="dense"
            label="Document Name"
            type="text"
            fullWidth
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOnClose}>
            Cancel
          </Button>
          <LoadingButton type="submit" loading={isLoading} disabled={isLoading}>
            Update
          </LoadingButton>
        </DialogActions>
      </form >
    </Dialog>
  );
};

export default UpdateDocumentDialog;