import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from 'config/msalConfig';
import { Height } from '@mui/icons-material';
import { Grid, Paper } from '@mui/material';
import wireTheme from 'theme';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  minHeight: '300px',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  }
}));

const Login: React.FC = () => {
  const { instance } = useMsal();

  const handleSignInClick = () => {
    instance.loginRedirect(loginRequest).catch((e) => {
      console.log(e);
    });
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={9}
        sx={{
          backgroundImage:
            "url(/wire.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={3} component={Paper} elevation={6} square
        sx={{
          backgroundColor: wireTheme.palette.primary.main,
        }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "40%",
          }}
        >
          <Typography
            component="h1"
            variant="h1"
            color="secondary"
            gutterBottom
            paddingTop={14}
            paddingBottom={12}
          >
            WIRE
          </Typography>
          <Box
            paddingTop={10}
            component="form"
            noValidate
            margin={4}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <Button
              onClick={handleSignInClick}
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: wireTheme.palette.secondary.main,
                color: wireTheme.palette.primary.main,
                fontWeight: 600
              }}
            >
              Sign in
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid >
  );

  /*return (
    <Box>
      <CssBaseline />
      <Stack
        direction={{ xs: 'column-reverse', md: 'row' }}
        sx={{
          justifyContent: 'center',
          gap: { xs: 6, sm: 12 },
          p: { xs: 2, sm: 4 },
          m: 'auto',
        }}
      >
        <SignInContainer direction="column" justifyContent="space-between">
          <Card variant="outlined">
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
            >
              Sign in to Wire
            </Typography>
            <Box
              paddingTop={4}
              component="form"
              noValidate
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: 2,
              }}
            >
              <Button
                onClick={handleSignInClick}
                type="submit"
                fullWidth
                variant="contained"
              >
                Sign in
              </Button>
            </Box>
          </Card>
        </SignInContainer>
      </Stack>

    </Box>
  );*/
}

export default Login;