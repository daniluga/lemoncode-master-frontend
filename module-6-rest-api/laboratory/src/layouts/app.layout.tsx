import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import * as classes from './app.layout.styles';
import { useNavigate } from 'react-router-dom';
import { Home } from '@mui/icons-material';
import { linkRoutes } from '#core/router';
import { Box, Typography } from '@mui/material';

interface Props {
  children: React.ReactNode;
}

export const AppLayout: React.FC<Props> = (props) => {
  const { children } = props;
  const useMock = import.meta.env.VITE_USE_MOCK_SERVER === 'true';
  const useGraphql = import.meta.env.VITE_USE_GRAPHQL === 'true';
  const navigate = useNavigate();

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Box
            sx={{
              display: 'flex',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ flex: 1 }}>
              <IconButton
                color="inherit"
                aria-label="Menu"
                onClick={() => navigate(linkRoutes.root)}
              >
                <Home />
              </IconButton>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              {useMock && (
                <Typography color="inherit" fontWeight={600}>
                  ⚠️ USANDO MOCK SERVER ⚠️
                </Typography>
              )}
              {useGraphql && (
                <Typography color="inherit" fontWeight={600}>
                  ⚠️ USANDO GRAPHQL ⚠️
                </Typography>
              )}
            </Box>
            <Box sx={{ flex: 1 }} />
          </Box>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>{children}</main>
    </>
  );
};
