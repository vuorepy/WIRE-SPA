import React, { useState } from 'react';
import * as Yup from 'yup';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { IProject, IUpdateProject } from 'types/projectTypes';
import { updateProject } from 'services/projectService';
import { useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch } from 'hooks';
import { updateProjectReducer } from 'slices/projectSlice';

interface UpdateProjectDialogProps {
  project: IProject;
  open: boolean;
  onClose: () => void;
}

const UpdateProjectDialog: React.FC<UpdateProjectDialogProps> = ({ project, open, onClose }) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const initialValues: IUpdateProject = {
    name: project.name,
  };
  const updateProjectValidationScheme = Yup.object({
    name: Yup.string().required("Please enter project name"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: updateProjectValidationScheme,
    onSubmit: (values) => {
      setIsLoading(true);

      updateProject(project.id, values).then((project) => {
        dispatch(updateProjectReducer(project));
        handleOnClose();
      }).catch((error) => {
        console.error('Failed to update project:', error);
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
        <DialogTitle>Update {project.name}</DialogTitle>
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
            Update
          </LoadingButton>
        </DialogActions>
      </form >
    </Dialog>
  );
};

export default UpdateProjectDialog;