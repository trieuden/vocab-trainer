'use client';
import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, Typography, Box, Divider, Stack } from '@mui/material';
import {
  Dashboard,
  People,
  Topic,
  LibraryBooks,
  Spellcheck,
  History,
  Menu,
  LogoutOutlined,
  HelpOutlineOutlined,
  SettingsOutlined,
} from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TextButton } from '@/core/component';

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, href: '/admin/' },
  { text: 'Users', icon: <People />, href: '/admin/users/' },
  { text: 'Topics', icon: <Topic />, href: '/admin/topics/' },
  { text: 'Library', icon: <LibraryBooks />, href: '/admin/libraries/' },
  { text: 'Words', icon: <Spellcheck />, href: '/admin/words/' },
  { text: 'Audit Log', icon: <History />, href: '/admin/audit-logs/' },
];

const moreMenuItems = [
  { text: 'Help', icon: <HelpOutlineOutlined />, href: '/help/' },
  { text: 'Settings', icon: <SettingsOutlined />, href: '/settings/' },
  { text: 'Logout', icon: <LogoutOutlined />, href: '/logout/' },
];

export const AdminSidebar = () => {
  const pathname = usePathname();

  const [open, setOpen] = useState(true);
  const drawerWidth = open ? 280 : 60;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        backgroundColor: '#404040',
        transition: (theme) =>
          theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          overflowX: 'hidden',
          transition: (theme) =>
            theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        },
      }}
    >
      <Stack component={'header'} spacing={2} direction={'row'} padding={1} alignItems="center" className="h-18">
        <TextButton startIcon={<Menu />} width={'50px'} fontSize={'27px'} color="#404040" handleClick={() => setOpen((prev) => !prev)} />
        {open && (
          <Box>
            <Typography variant="h5" component="h1" sx={{ fontWeight: 700, color: '#33cc33' }}>
              VocabAdmin
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Management Dashboard
            </Typography>
          </Box>
        )}
      </Stack>

      <Divider variant="middle" />
      {/* Menu options */}

      <List sx={{ pt: 2, pr: open ? 2 : 0, flex: 1 }} component={'section'}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding className="h-16">
            <ListItemButton
              component={Link}
              href={item.href}
              selected={pathname === '/vi' + item.href}
              sx={{
                borderTopRightRadius: 30,
                borderBottomRightRadius: 30,
                backgroundColor: '#e6e6e6',
                '&.Mui-selected': {
                  backgroundColor: '#00b300',
                },
                '&.Mui-selected:hover': {
                  backgroundColor: '#1aff1a', // Màu khi hover vào item đã chọn
                },
                '&:hover': {
                  backgroundColor: '#ffffff', // Màu khi hover vào item chưa chọn
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: pathname === '/vi' + item.href ? 'white' : '' }}>{item.icon}</ListItemIcon>
              {open && <span className={`${pathname === '/vi' + item.href ? 'text-white' : ''} py-2 font-medium`}>{item.text}</span>}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {/* More options */}
      <Box component={'section'}>
        <Divider variant="middle" />
        <List sx={{ pt: 2, pr: open ? 2 : 0, flex: 1 }}>
          {moreMenuItems.map((item) => (
            <ListItem key={item.text} disablePadding className="h-12">
              <ListItemButton
                component={Link}
                href={item.href}
                sx={{
                  backgroundColor: '#e6e6e6',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: '#00b300',
                    '& .MuiListItemIcon-root, & .MuiSvgIcon-root': {
                      color: '#00b300',
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                {open && <span className={`${pathname === '/vi' + item.href ? 'text-white' : ''} py-2 font-medium`}>{item.text}</span>}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
