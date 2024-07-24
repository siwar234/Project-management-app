import React from 'react'
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import ProductPerformance from './ProjectTable';

const ViewProjects = () => {
  return (
    <PageContainer title="Projects" description="this is Projects page">
   <ProductPerformance/>
   </PageContainer>
  )
}

export default ViewProjects