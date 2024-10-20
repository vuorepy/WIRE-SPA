import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { Card, CardActionArea, CardContent, CardHeader, CardMedia, IconButton, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteProjectDialog from "../DeleteProjectDialog";
import { IProject } from "types/projectTypes";
import UpdateProjectDialog from "../UpdateProjectDialog";

interface ProjectCardProps {
    project: IProject
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const navigate = useNavigate();
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [deleteProjectDialogOpen, setDeleteProjectDialogOpen] = useState(false);
    const [updateProjectDialogOpen, setUpdateProjectDialogOpen] = useState(false);

    const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMenuAnchorEl(event.currentTarget);
        setOpenMenu(true);
    };

    const handleCloseMenu = () => {
        setMenuAnchorEl(null);
        setOpenMenu(false);
    };

    const handleCardClick = () => {
        navigate(`/project/${project.id}`);
    };

    const handleUpdateProjectClick = () => {
        setUpdateProjectDialogOpen(true);
    }

    const handleOnUpdateProjectClose = () => {
        setUpdateProjectDialogOpen(false);
        handleCloseMenu();
    }

    const handleDeleteProjectClick = () => {
        setDeleteProjectDialogOpen(true);
    }

    const handleOnDeleteProjectClose = (projectDeleted: boolean) => {
        setDeleteProjectDialogOpen(false);
        handleCloseMenu();
    }

    return (
        <Card sx={{ minWidth: 300, boxShadow: 3 }}>
            <CardHeader
                action={
                    <IconButton aria-label="settings" onClick={handleClickMenu}>
                        <MoreVertIcon />
                    </IconButton>

                }
                titleTypographyProps={{ variant: 'h6' }}
                title={project.name}
            />
            <Menu
                id="basic-menu"
                anchorEl={menuAnchorEl}
                open={openMenu}
                onClose={handleCloseMenu}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleUpdateProjectClick}>Update</MenuItem>
                <MenuItem onClick={handleDeleteProjectClick}>Delete</MenuItem>
            </Menu>
            <UpdateProjectDialog project={project} open={updateProjectDialogOpen} onClose={handleOnUpdateProjectClose} />
            <DeleteProjectDialog project={project} open={deleteProjectDialogOpen} onClose={handleOnDeleteProjectClose} />
            <CardActionArea onClick={handleCardClick}>
                <CardMedia
                    sx={{ height: 140 }}
                    image="/wire.jpg"
                    title="wire"
                />
                <CardContent>
                    <Typography variant="body2" paddingTop={2}>
                        // TODO: Add project description
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card >
    );
};

export default ProjectCard;
