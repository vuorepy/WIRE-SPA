import React, { useState } from 'react';
import * as Yup from 'yup';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { ICreateProject } from 'types/projectTypes';
import { createProject } from 'services/projectService';
import { useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch } from 'hooks';
import { addProjectReducer } from 'slices/projectSlice';

interface CreateProjectDialogProps {
  open: boolean;
  onClose: () => void;
}

const CreateProjectDialog: React.FC<CreateProjectDialogProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const initialValues: ICreateProject = {
    name: "",
  };
  const createProjectValidationScheme = Yup.object({
    name: Yup.string().required("Please enter project name"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: createProjectValidationScheme,
    onSubmit: (values) => {
      setIsLoading(true);

      createProject(values).then((project) => {
        dispatch(addProjectReducer(project));
        handleOnClose();
      }).catch((error) => {
        console.error('Failed to create project:', error);
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
        <DialogTitle>Create New Project</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id="name"
            margin="dense"
            label="Project Name"
            type="text"
            fullWidth
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
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

export default CreateProjectDialog;