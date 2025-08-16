import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const CarrierManagement: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Carrier Management
      </Typography>
      <Card>
        <CardContent>
          <Typography>Carrier management features coming soon...</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CarrierManagement;