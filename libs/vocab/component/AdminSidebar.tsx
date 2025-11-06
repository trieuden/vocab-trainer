'use client';
import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Box, Divider, Stack } from '@mui/material';
import { Dashboard, People, Topic, LibraryBooks, Spellcheck, History, Menu } from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TextButton } from '@/core/component';

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, href: '/admin/' },
  { text: 'Users', icon: <People />, href: '/admin/users/' },
  { text: 'Topics', icon: <Topic />, href: '/admin/topics/' },
  { text: 'Library', icon: <LibraryBooks />, href: '/admin/library/' },
  { text: 'Words', icon: <Spellcheck />, href: '/admin/words/' },
  { text: 'Audit Log', icon: <History />, href: '/admin/audit-log/' },
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
      <Stack spacing={2} direction={'row'} padding={1} alignItems="center" className="h-18">
        <TextButton icon={<Menu />} width={'50px'} fontSize={'27px'} color="#404040" handleClick={() => setOpen((prev) => !prev)} />
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

      <List sx={{ pt: 2, pr: open ? 2 : 0, flex: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding className="h-16">
            <ListItemButton
              component={Link}
              href={item.href}
              selected={pathname === '/vi' + item.href}
              sx={{
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
                backgroundColor: '#e6e6e6',
                '&.Mui-selected': {
                  backgroundColor: 'white',
                },
                '&.Mui-selected:hover': {
                  backgroundColor: '#f5f5f5', // Màu khi hover vào item đã chọn
                },
                '&:hover': {
                  backgroundColor: '#ffffff', // Màu khi hover vào item chưa chọn
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              {open && <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 500 }} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
