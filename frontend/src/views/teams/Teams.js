import React, { useEffect, useState } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import { Box, Typography, TextField, IconButton } from '@mui/material';
import { SliderComp } from './SliderComp';
import DashboardCard from '../../components/shared/DashboardCard';
import TeamsModal from 'src/layouts/full/header/TeamsModal';
import Collaboraters from './Collaboraters';
import { CgSearch } from 'react-icons/cg';
import { fetchEquipes } from 'src/JS/actions/equipe';
import {  useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { currentUser } from 'src/JS/actions/user';

const Teams = () => {
  const [ouvrir, setouvrir] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);


  const close = () => {
    setouvrir(false);
  };
  const handleOpen = () => {
    setouvrir(true);
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  };


  const user = useSelector((state) => state.userReducer.user);

     useEffect(() => {
        dispatch(fetchEquipes(user._id))
    }, [dispatch]);
   
  return (
    <>
      <PageContainer title="Teams" description="this is Teams page">
        <DashboardCard title="Collaborators and Teams">
          <TextField
            id="standard-search"
            label={
              <>
                <IconButton size="small">
                  <CgSearch />
                </IconButton>
                <span style={{ marginRight: '7px', color: 'gray', fontSize: '15px' }}>
                  Search for Teams and Collaboraters
                </span>
              </>
            }
            type="search"
            variant="standard"
            value={searchQuery}
            onChange={handleSearch}
            style={{ marginRight: '10px', width: '600px', marginBottom: '30px' }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* <Button
              color="primary"
              variant="contained"
              size="meduim"
              style={{
                marginLeft: '10px',
                fontWeight: 'bold',

                fontSize: '12px',
                width: '134px',
                backgroundColor: '#e1dfdf',
                color: 'rgb(39 22 22 / 84%)',
                border: 'none',
              }}
              onClick={handleOpen}
            >
              Create a Team
            </Button> */}
          </Box>
          <Box mb={3}>
            <Typography
              gutterBottom
              style={{
                fontSize: '16px',
                color: '#2A3547',
                justifyContent: 'left',
                fontWeight: 'bold',
              }}
            >
              {' '}
              You Work with{' '}
            </Typography>
          </Box>
          <Collaboraters searchQuery={searchQuery} />
          <Box mb={3}>
            <Typography
              gutterBottom
              style={{
                fontSize: '16px',
                color: '#2A3547',
                justifyContent: 'left',
                fontWeight: 'bold',
              }}
            >
              {' '}
              Your Teams{' '}
            </Typography>
          </Box>
          <Box
            sx={{
              width: { sm: '500%', md: '60%' },
              textAlign: { sm: 'left', md: 'center' },
              height: '250px',
              marginTop: '45px',
              marginLeft: '50px',
            }}
          >
            <SliderComp
              handlecreate={handleOpen}
              searchQuery={searchQuery}
              handleSearch={handleSearch}
            />
          </Box>
        </DashboardCard>
      </PageContainer>
      <TeamsModal ouvrir={ouvrir} handleClosee={close} />
    </>
  );
};

export default Teams;
