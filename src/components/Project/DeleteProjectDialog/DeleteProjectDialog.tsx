import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { IProject } from 'types/projectTypes';
import { deleteProject } from 'services/projectService';
import { LoadingButton } from '@mui/lab';
import { removeProjectReducer } from 'slices/projectSlice';
import { useAppDispatch } from 'hooks';

interface DeleteProjectDialogProps {
  project: IProject;
  open: boolean;
  onClose: (projectDeleted: boolean) => void;
}

const DeleteProjectDialog: React.FC<DeleteProjectDialogProps> = ({ project, open, onClose }) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteProjectClick = () => {
    setIsLoading(true);

    deleteProject(project.id).then(() => {
      dispatch(removeProjectReducer(project));
      handleOnClose(true);
    }).catch((error) => {
      console.error('Failed to delete project:', error);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  const handleOnClose = (projectDeleted: boolean) => {
    onClose(projectDeleted);
    setIsLoading(false);
  }

  return (
    <Dialog open={open} onClose={() => handleOnClose(false)} maxWidth="sm" fullWidth>
      <DialogTitle>Delete {project.name}</DialogTitle>
      <DialogContent>
        Are you sure you want to delete this project? This action is irreversible and the project cannot be restored.
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleOnClose(false)}>
          Cancel
        </Button>
        <LoadingButton loading={isLoading} disabled={isLoading} onClick={handleDeleteProjectClick}>
          Delete
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteProjectDialog;