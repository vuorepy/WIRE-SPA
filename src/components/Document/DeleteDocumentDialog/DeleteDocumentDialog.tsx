import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { IDocument } from 'types/documentTypes';
import { deleteDocument } from 'services/documentService';
import { useAppDispatch } from 'hooks';
import { removeDocumentReducer } from 'slices/documentSlice';

interface DeleteDocumentDialogProps {
  document: IDocument
  open: boolean;
  onClose: (documentDeleted: boolean) => void;
}

const DeleteDocumentDialog: React.FC<DeleteDocumentDialogProps> = ({ document, open, onClose }) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteProjectClick = () => {
    setIsLoading(true);

    deleteDocument(document.id).then(() => {
      dispatch(removeDocumentReducer(document));
      handleOnClose(true);
    }).catch((error) => {
      console.error('Failed to delete document:', error);
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
      <DialogTitle>Delete {document.title}</DialogTitle>
      <DialogContent>
        Are you sure you want to delete this document? This action is irreversible and the document cannot be restored.
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

export default DeleteDocumentDialog;