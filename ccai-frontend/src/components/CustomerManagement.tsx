import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const CustomerManagement: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Customer Management
      </Typography>
      <Card>
        <CardContent>
          <Typography>Customer CRM features coming soon...</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CustomerManagement;