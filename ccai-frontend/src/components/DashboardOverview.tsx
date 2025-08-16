import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Stack,
  Avatar,
  Divider
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Email,
  Phone,
  Receipt,
  People,
  AttachMoney,
  LocalShipping,
  Warning,
  CheckCircle,
  Schedule
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import axios from 'axios';

const DashboardOverview: React.FC = () => {
  const [metrics, setMetrics] = useState<any>(null);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [metricsRes, communicationRes, invoicesRes] = await Promise.all([
        axios.get('http://localhost:3001/api/metrics/dashboard'),
        axios.get('http://localhost:3001/api/communication/all'),
        axios.get('http://localhost:3001/api/invoices/summary')
      ]);
      
      setMetrics(metricsRes.data);
      setRecentActivity(communicationRes.data.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setMetrics({
        overview: {
          totalRevenue: 125480.50,
          totalLoads: 47,
          avgMargin: 18.5,
          activeCarriers: 23,
          activeCustomers: 12,
          onTimeDelivery: 96.8,
          customerSatisfaction: 4.7
        },
        recentTrends: [
          { month: 'Nov 2023', revenue: 98750, loads: 38, margin: 18.1 },
          { month: 'Dec 2023', revenue: 107820, loads: 41, margin: 17.8 },
          { month: 'Jan 2024', revenue: 125480, loads: 47, margin: 18.5 }
        ]
      });
      setRecentActivity([
        {
          id: 1,
          type: 'email',
          subject: 'Load Booking Request - Chicago to Denver',
          from: 'shipper@logisticscorp.com',
          category: 'lead',
          priority: 'high',
          timestamp: new Date().toISOString(),
          status: 'unread'
        }
      ]);
    }
  };

  const kpis = [
    {
      title: 'Total Revenue',
      value: `$${metrics?.overview?.totalRevenue?.toLocaleString() || '125,481'}`,
      change: '+12.5%',
      trend: 'up',
      icon: <AttachMoney />,
      color: 'success'
    },
    {
      title: 'Active Loads',
      value: metrics?.overview?.totalLoads || '47',
      change: '+8.2%',
      trend: 'up',
      icon: <LocalShipping />,
      color: 'primary'
    },
    {
      title: 'Avg Margin',
      value: `${metrics?.overview?.avgMargin || '18.5'}%`,
      change: '+2.1%',
      trend: 'up',
      icon: <TrendingUp />,
      color: 'success'
    },
    {
      title: 'On-Time Delivery',
      value: `${metrics?.overview?.onTimeDelivery || '96.8'}%`,
      change: '-1.2%',
      trend: 'down',
      icon: <CheckCircle />,
      color: 'warning'
    }
  ];

  const pieData = [
    { name: 'Leads', value: 35, color: '#2196f3' },
    { name: 'Operations', value: 40, color: '#4caf50' },
    { name: 'Financial', value: 25, color: '#ff9800' }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'email': return <Email />;
      case 'call': return <Phone />;
      case 'invoice': return <Receipt />;
      default: return <People />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'error';
      case 'high': return 'warning';
      case 'medium': return 'info';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
          Welcome back! 👋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's what's happening with your trucking brokerage today.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {kpis.map((kpi, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: '100%', position: 'relative', overflow: 'visible' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: `${kpi.color}.main`, mr: 2 }}>
                    {kpi.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {kpi.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {kpi.title}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {kpi.trend === 'up' ? (
                    <TrendingUp sx={{ color: 'success.main', mr: 0.5, fontSize: 16 }} />
                  ) : (
                    <TrendingDown sx={{ color: 'error.main', mr: 0.5, fontSize: 16 }} />
                  )}
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: kpi.trend === 'up' ? 'success.main' : 'error.main',
                      fontWeight: 600
                    }}
                  >
                    {kpi.change}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                    vs last month
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12} md={8}>
          <Card sx={{ height: 400 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Revenue Trend
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={metrics?.recentTrends || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#2196f3" 
                    strokeWidth={3}
                    dot={{ fill: '#2196f3', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: 400 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Communication Types
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <Stack spacing={1} sx={{ mt: 2 }}>
                {pieData.map((item, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box 
                      sx={{ 
                        width: 12, 
                        height: 12, 
                        bgcolor: item.color, 
                        borderRadius: 1, 
                        mr: 1 
                      }} 
                    />
                    <Typography variant="body2" sx={{ flexGrow: 1 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {item.value}%
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: 400 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">
                  Recent Activity
                </Typography>
                <Button size="small" color="primary">
                  View All
                </Button>
              </Box>
              <List>
                {recentActivity.map((activity, index) => (
                  <React.Fragment key={activity.id}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: 'primary.light', width: 32, height: 32 }}>
                          {getActivityIcon(activity.type)}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={activity.subject || activity.summary}
                        secondary={
                          <Box sx={{ mt: 0.5 }}>
                            <Typography variant="caption" color="text.secondary">
                              {activity.from || activity.caller} • {new Date(activity.timestamp).toLocaleDateString()}
                            </Typography>
                            <Box sx={{ mt: 0.5 }}>
                              <Chip 
                                size="small" 
                                label={activity.category} 
                                color="primary" 
                                variant="outlined"
                                sx={{ mr: 1 }}
                              />
                              <Chip 
                                size="small" 
                                label={activity.priority || 'medium'} 
                                color={getPriorityColor(activity.priority)}
                              />
                            </Box>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < recentActivity.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: 400 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Quick Actions
              </Typography>
              <Stack spacing={2}>
                <Button 
                  variant="contained" 
                  startIcon={<People />}
                  fullWidth
                  sx={{ justifyContent: 'flex-start', textTransform: 'none', py: 1.5 }}
                >
                  Create New Lead
                </Button>
                <Button 
                  variant="outlined" 
                  startIcon={<Receipt />}
                  fullWidth
                  sx={{ justifyContent: 'flex-start', textTransform: 'none', py: 1.5 }}
                >
                  Process Invoice
                </Button>
                <Button 
                  variant="outlined" 
                  startIcon={<LocalShipping />}
                  fullWidth
                  sx={{ justifyContent: 'flex-start', textTransform: 'none', py: 1.5 }}
                >
                  Book New Load
                </Button>
                <Button 
                  variant="outlined" 
                  startIcon={<Phone />}
                  fullWidth
                  sx={{ justifyContent: 'flex-start', textTransform: 'none', py: 1.5 }}
                >
                  Schedule Follow-up Call
                </Button>
              </Stack>

              <Divider sx={{ my: 3 }} />

              <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary' }}>
                System Status
              </Typography>
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircle sx={{ color: 'success.main', mr: 1, fontSize: 16 }} />
                  <Typography variant="body2">All systems operational</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Schedule sx={{ color: 'warning.main', mr: 1, fontSize: 16 }} />
                  <Typography variant="body2">5 follow-ups due today</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Warning sx={{ color: 'error.main', mr: 1, fontSize: 16 }} />
                  <Typography variant="body2">2 overdue invoices</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardOverview;