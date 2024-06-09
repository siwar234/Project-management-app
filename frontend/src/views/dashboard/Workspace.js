import React ,{useState,useEffect} from 'react'
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { Box } from '@mui/material';
import { Slider } from './Slider';
import {  useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

function Workspace() {
  const [open, setopen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();


  // useEffect(() => {
  //   dispatch(currentUser());
  // }, [dispatch]);

  const closeing = () => {
    setopen(false);
  };
  const handleOpening = () => {
    setopen(true);
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  };


  return (
<PageContainer title="workspace" description="This is workspace">

<DashboardCard title="Your Workspace">
<Box
            sx={{
              width: { sm: '500%', md: '60%' },
              textAlign: { sm: 'left', md: 'center' },
              height: '250px',
              marginTop: '45px',
              marginLeft: '50px',
            }}
          >
            <Slider
              handlecreate={handleOpening}
              searchQuery={searchQuery}
              handleSearch={handleSearch}
            />
          </Box>
  
  </DashboardCard></PageContainer>  )
}

export default Workspace