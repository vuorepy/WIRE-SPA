import React, { useState } from 'react';
import * as Yup from 'yup';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { IProject } from 'types/projectTypes';
import { useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import { ICreateDocument } from 'types/documentTypes';
import { createDocument } from 'services/documentService';
import { useAppDispatch } from 'hooks';
import { addDocumentReducer } from 'slices/documentSlice';

interface CreateDocumentDialogProps {
  project: IProject;
  open: boolean;
  onClose: () => void;
}

const CreateDocumentDialog: React.FC<CreateDocumentDialogProps> = ({ project, open, onClose }) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const initialValues: ICreateDocument = {
    projectId: project.id,
    title: "",
    content: "",
  };
  const createProjectValidationScheme = Yup.object({
    title: Yup.string().required("Please enter project name"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: createProjectValidationScheme,
    onSubmit: (values) => {
      setIsLoading(true);

      createDocument(values).then((document) => {
        dispatch(addDocumentReducer(document));
        handleOnClose();
      }).catch((error) => {
        console.error('Failed to create document:', error);
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
        <DialogTitle>Create New Document</DialogTitle>
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
            Create
          </LoadingButton>
        </DialogActions>
      </form >
    </Dialog>
  );
};

export default CreateDocumentDialog;