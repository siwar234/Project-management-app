import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Grid, Box, Card, Stack, Typography } from '@mui/material';

// components
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import AuthLogin from './auth/AuthLogin';

const Login2 = () => {
  const location = useLocation();

  const isInvitationUrl = () => {
    const params = new URLSearchParams(location.search);
    return params.has('equipeId') && params.has('token');
  };

  return (
    <PageContainer title="Login" description="this is Login page">
      <Box
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            background: 'radial-gradient(#D3D3D8, #EFEFF3, #D3D3D8)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
        <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '600px' }}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              <AuthLogin
                subtitle={
                  <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
                    <Typography color="textSecondary" variant="h6" fontWeight="500">
                      New to TeamSync?
                    </Typography>
                    {isInvitationUrl() ? (
                      <Typography
                        component={Link}
                        to={`/email/activate/${location.search}`}
                        fontWeight="500"
                        sx={{
                          textDecoration: 'none',
                          color: 'primary.main',
                        }}
                      >
                        Create an account
                      </Typography>
                    ) : (
                      <Typography
                        component={Link}
                        to="/authentificate/register"
                        fontWeight="500"
                        sx={{
                          textDecoration: 'none',
                          color: 'primary.main',
                        }}
                      >
                        Create an account
                      </Typography>
                    )}
                  </Stack>
                }
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Login2;
