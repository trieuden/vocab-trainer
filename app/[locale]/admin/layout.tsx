import type React from 'react';
import { AdminSidebar } from '@/vocab/component/AdminSidebar';
import { AdminHeader } from '@/vocab/component/AdminHeader';
import { Box } from '@mui/material';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <AdminHeader />
        <Box component="main" sx={{ flexGrow: 1, backgroundColor: '#f9fafb', p: 2 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
