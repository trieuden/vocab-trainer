'use client';

import type React from 'react';

import { AppBar, Toolbar, Stack, IconButton, Avatar, Menu, MenuItem, Box, Switch } from '@mui/material';
import { Notifications } from '@mui/icons-material';
import { useState } from 'react';
import { CustomSwitch } from '@/core/component';
import { VIEIcon, ENGIcon } from '@/core/icons';

export function AdminHeader() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent', color: 'black', padding: 2 }} elevation={1}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#e6e6e6', borderRadius: 8 }}>
        <CustomSwitch customColor="white" checkedIcon={VIEIcon} unCheckedIcon={ENGIcon} height={40} width={70} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton color="inherit">
            <Notifications />
          </IconButton>

          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>A</Avatar>
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>Settings</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
