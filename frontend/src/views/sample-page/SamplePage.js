import React from 'react';
import PageContainer from 'src/components/container/PageContainer';

import { Grid, Box } from '@mui/material';
import ProductPerformance from '../dashboard/components/ProductPerformance';


const SamplePage = () => {
  return (
    <PageContainer title="Sample Page" description="this is Sample page">

<Box>
        <Grid container spacing={3}>
         
            <Grid container spacing={3}>
             
          <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid>
        </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default SamplePage;
