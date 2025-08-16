import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const FinancialDashboard: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Financial Dashboard
      </Typography>
      <Card>
        <CardContent>
          <Typography>Financial management features coming soon...</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FinancialDashboard;