import React from 'react';
import { Navigate, Route, useNavigate } from 'react-router-dom';
import { MsalAuthenticationTemplate, UnauthenticatedTemplate, useIsAuthenticated, useMsal } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';
import { CircularProgress, Grid } from '@mui/material';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {

  return (
    <div>
      <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}    >
        {element}
      </MsalAuthenticationTemplate>
      <UnauthenticatedTemplate>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: '100vh' }}
        >
          <Grid item xs={3}>
            <CircularProgress />
          </Grid>
        </Grid>
      </UnauthenticatedTemplate>
    </div>
  );
};

export default ProtectedRoute;