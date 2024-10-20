import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Container, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { IDocument } from "types/documentTypes";
import { getDocumentsByProjectId } from "services/documentService";
import { useNavigate, useParams } from "react-router-dom";
import { IProject } from "types/projectTypes";
import { getProject } from "services/projectService";
import CreateDocumentDialog from "components/Document/CreateDocumentDialog";
import DocumentEditor from "components/Document/DocumentEditor";
import PostAddIcon from '@mui/icons-material/PostAdd';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArticleIcon from '@mui/icons-material/Article';
import { useAppDispatch, useAppSelector } from "hooks";
import { setDocumentsReducer, setSelectedDocumentReducer } from "slices/documentSlice";

const Project: React.FC = () => {
    const drawerWidth = 240;
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const documents = useAppSelector(
        (state) => state.document.documents
    );
    const selectedDocument = useAppSelector(
        (state) => state.document.selectedDocument
    );
    const [project, setProject] = useState<IProject>();
    const [createDocumentDialogOpen, setCreateDocumentDialogOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (id === undefined) {
            return;
        }

        getProject(id).then((project) => {
            setProject(project);
        }).catch((error) => {
            console.error('Failed to fetch project:', error);
        });

        getDocumentsByProjectId(id).then((documents) => {
            dispatch(setDocumentsReducer(documents));
            dispatch(setSelectedDocumentReducer(documents[0]));
        }).catch((error) => {
            console.error('Failed to fetch documents:', error);
        });
    }, []);

    const handleDocumentChange = (document: IDocument) => {
        dispatch(setSelectedDocumentReducer(document));
    }

    const handleReturnProjectLibrary = () => {
        navigate('/');
    }

    const handleOnCreateDocumentClose = () => {
        setCreateDocumentDialogOpen(false);
    }

    const handleCreateDocumentClick = () => {
        setCreateDocumentDialogOpen(true);
    }

    const handleOnEditorContentChange = (content: string) => {
    }

    return (
        <Container>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <ListItem>
                            <ListItemButton onClick={handleReturnProjectLibrary}>
                                <Button fullWidth variant="outlined" >
                                    <ArrowBackIcon />
                                </Button>
                            </ListItemButton>
                        </ListItem>
                        <ListItem alignItems="flex-start">
                            <ListItemText primary={project?.name} color="primary"></ListItemText>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        {documents && documents.map((document, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton onClick={() => handleDocumentChange(document)}>
                                    <ListItemIcon>
                                        < ArticleIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={document.title} />
                                </ListItemButton>
                            </ListItem>

                        ))}
                        <ListItem disablePadding>
                            <ListItemButton onClick={handleCreateDocumentClick}>
                                <Button fullWidth variant="outlined" >
                                    <PostAddIcon />
                                </Button>
                            </ListItemButton>
                            {project && <CreateDocumentDialog project={project} open={createDocumentDialogOpen} onClose={handleOnCreateDocumentClose} />}
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <Container >
                {selectedDocument && <DocumentEditor document={selectedDocument} onContentChange={handleOnEditorContentChange} />}
            </Container>
        </Container>
    );
};

export default Project;
