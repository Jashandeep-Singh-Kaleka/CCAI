import React, { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Badge,
  Chip
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Email,
  Phone,
  Receipt,
  People,
  LocalShipping,
  AttachMoney,
  Analytics,
  SmartToy,
  AccountCircle,
  Logout,
  Notifications
} from '@mui/icons-material';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import DashboardOverview from '../components/DashboardOverview';
import CommunicationCenter from '../components/CommunicationCenter';
import InvoiceManagement from '../components/InvoiceManagement';
import LeadManagement from '../components/LeadManagement';
import CallCenter from '../components/CallCenter';
import FinancialDashboard from '../components/FinancialDashboard';
import MetricsDashboard from '../components/MetricsDashboard';
import AIAssistant from '../components/AIAssistant';
import CustomerManagement from '../components/CustomerManagement';
import CarrierManagement from '../components/CarrierManagement';

const drawerWidth = 280;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const user = JSON.parse(localStorage.getItem('ccai_user') || '{}');

  const menuItems = [
    { text: 'Overview', icon: <DashboardIcon />, path: '/dashboard', badge: null },
    { text: 'Communications', icon: <Email />, path: '/dashboard/communications', badge: 5 },
    { text: 'Call Center', icon: <Phone />, path: '/dashboard/calls', badge: 2 },
    { text: 'Invoices', icon: <Receipt />, path: '/dashboard/invoices', badge: 3 },
    { text: 'Leads', icon: <People />, path: '/dashboard/leads', badge: 4 },
    { text: 'Customers', icon: <LocalShipping />, path: '/dashboard/customers', badge: null },
    { text: 'Carriers', icon: <LocalShipping />, path: '/dashboard/carriers', badge: null },
    { text: 'Financial', icon: <AttachMoney />, path: '/dashboard/financial', badge: null },
    { text: 'Metrics', icon: <Analytics />, path: '/dashboard/metrics', badge: null },
    { text: 'AI Assistant', icon: <SmartToy />, path: '/dashboard/ai-assistant', badge: null }
  ];

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('ccai_token');
    localStorage.removeItem('ccai_user');
    navigate('/');
    handleProfileMenuClose();
  };

  const getCurrentPageTitle = () => {
    const currentItem = menuItems.find(item => item.path === location.pathname);
    return currentItem?.text || 'Dashboard';
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          bgcolor: 'white',
          color: 'text.primary',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {getCurrentPageTitle()}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton color="inherit">
              <Badge badgeContent={7} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            
            <Chip 
              label="Demo Mode" 
              color="warning" 
              size="small" 
              sx={{ fontWeight: 600 }}
            />
            
            <IconButton
              onClick={handleProfileMenuOpen}
              sx={{ p: 0 }}
            >
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                {user.name?.charAt(0) || 'D'}
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        onClick={handleProfileMenuClose}
      >
        <MenuItem onClick={handleProfileMenuClose}>
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#1a1a1a',
            color: 'white'
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
          <LocalShipping sx={{ mr: 2, fontSize: 32, color: 'primary.main' }} />
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
            CCAI
          </Typography>
        </Box>
        
        <Divider sx={{ bgcolor: '#333' }} />
        
        <List sx={{ px: 2, py: 1 }}>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                selected={location.pathname === item.path}
                sx={{
                  borderRadius: 2,
                  '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                  },
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                  {item.badge ? (
                    <Badge badgeContent={item.badge} color="error">
                      {item.icon}
                    </Badge>
                  ) : item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: '0.95rem',
                    fontWeight: location.pathname === item.path ? 600 : 400
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: 'auto', p: 2 }}>
          <Box sx={{ bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2, p: 2 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
              {user.name || 'Demo User'}
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.7 }}>
              {user.role || 'Administrator'}
            </Typography>
          </Box>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          minHeight: '100vh',
          mt: 8
        }}
      >
        <Routes>
          <Route path="/" element={<DashboardOverview />} />
          <Route path="/communications" element={<CommunicationCenter />} />
          <Route path="/calls" element={<CallCenter />} />
          <Route path="/invoices" element={<InvoiceManagement />} />
          <Route path="/leads" element={<LeadManagement />} />
          <Route path="/customers" element={<CustomerManagement />} />
          <Route path="/carriers" element={<CarrierManagement />} />
          <Route path="/financial" element={<FinancialDashboard />} />
          <Route path="/metrics" element={<MetricsDashboard />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default Dashboard;