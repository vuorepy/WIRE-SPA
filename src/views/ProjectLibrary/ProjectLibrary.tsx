import { Button, Container, Grid, Typography } from "@mui/material";
import CreateProjectDialog from "components/Project/CreateProjectDialog";
import ProjectCard from "components/Project/ProjectCard";
import { useAppDispatch, useAppSelector } from "hooks";
import React, { useEffect, useState } from "react";
import { getProjects } from "services/projectService";
import { setProjectsReducer } from "slices/projectSlice";
import { IProject } from "types/projectTypes";

const ProjectLibrary = () => {
    const [openCreateProjectDialog, setOpenCreateProjectDialog] = useState<boolean>(false);
    const projects = useAppSelector(
        (state) => state.project.projects
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        getProjects().then((projects) => {
            dispatch(setProjectsReducer(projects));
        }).catch((error) => {
            console.error('Failed to fetch projects:', error);
        });
    }, []);

    const handleCreateProjectClick = () => {
        setOpenCreateProjectDialog(true);
    }

    const onCloseCreateProjectDialog = () => {
        setOpenCreateProjectDialog(false);
    }

    return (
        <Container>
            <Grid container justifyContent="space-between" alignItems="flex-end">
                <Grid item padding={2} >
                    <Typography variant="h2">
                        PROJECTS
                    </Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="secondary" onClick={handleCreateProjectClick}>NEW PROJECT</Button>
                    <CreateProjectDialog open={openCreateProjectDialog} onClose={onCloseCreateProjectDialog} />
                </Grid>
            </Grid>
            <Grid container spacing={2} justifyContent="space-between" paddingTop={2}>
                {projects?.map((project, index) => (
                    <Grid key={index} item xs={3} margin={2}>
                        <ProjectCard key={index} project={project} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ProjectLibrary;
