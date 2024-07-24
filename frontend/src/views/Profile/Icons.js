import React, { useState, useEffect } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Avatar, Box } from '@mui/material';
import { MdEdit } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { current, updateUser } from '../../JS/actions/user';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import ProfileModal from './ProfileModal';
import TeamCard from './TeamCard';  // Import the new TeamCard component
import { fetchEquipes, fetchEquipesbyId } from 'src/JS/actions/equipe';

const Icons = () => {
  const [open, setOpen] = useState(false);
  const [ProfileInformation, setProfileInformation] = useState('');
  const [organisation, setorganisation] = useState('');
  const [profilePicture, setprofilePicture] = useState('');
  const [Location, setLocation] = useState('');

  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const { id } = useParams();

  useEffect(() => {
    dispatch(current(id));
  }, [dispatch, id]);

  const token = location.pathname.split('/')[2];
  localStorage.setItem('token', token);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = () => {
    dispatch(updateUser(user._id, {
      organisation,
      Location,
      ProfileInformation,
      profilePicture
    }));
    handleClose();
  };

  useEffect(() => {
    if (user) {
      setProfileInformation(user.ProfileInformation || '');
      setorganisation(user.organisation || '');
      setLocation(user.Location || '');
    }
  }, [user]);

  const userId = user._id;

  useEffect(() => {
    dispatch(fetchEquipes(userId))
  }, [dispatch, userId]);

  const equipeuser = user?.equipes || [];

  useEffect(() => {
    equipeuser.forEach((equipeId) => {
      dispatch(fetchEquipesbyId(equipeId));
    });
  }, [dispatch, equipeuser]);

  const equipes = useSelector((state) => state.equipeReducer.equipes);
   


  return (
    <PageContainer backgroundColor="#EEEEEE">
      <DashboardCard style={{ width: '10px' }} backgroundColor="#EEEEEE">
        <Box position="relative" mb={5}>
          <Box
            display="flex"
            alignItems="center"
            position="relative"
            minHeight="12.75rem"
            borderRadius="1rem"
            sx={{
              backgroundImage: `url(${'https://www.agile-im.de/wp-content/uploads/2020/11/Remote_Zeichenfl%C3%A4che-1.png'})`,
              backgroundSize: 'cover',
              backgroundPosition: '50%',
              overflow: 'hidden',
            }}
          />
          <Card
            sx={{
              position: 'relative',
              mt: -5.5,
              mx: 3,
              py: 2,
              px: 2,
              color: 'white',
              opacity: '0.85',
              borderRadius: '1rem',
              height: '100px',
            }}
          >
            <Grid container spacing={3} alignItems="center" borderRadius="1rem">
              <Grid item alignSelf={'center'}>
                <Avatar src={user?.profilePicture} sx={{ bgcolor: '#42a5f5' }} style={{ width: '55px', height: '55px', marginTop: '10px' }}>
                  {user?.firstName && user.firstName.substring(0, 2).toUpperCase()}
                </Avatar>
              </Grid>
              <Grid item alignSelf={'right'}>
                <Typography
                  variant="h5"
                  fontWeight="medium"
                  color="rgb(60 73 95)"
                  lineHeight={'1.375'}
                  fontFamily={'Roboto, Helvetica, Arial, sans-serif'}
                >
                  {user?.firstName}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Box>

        <Box display="flex" flexDirection="row">
          <Card
            sx={{
              mt: 5.5,
              mb: 3,
              mx: 3,
              py: 2,
              px: 2,
              color: 'white',
              width: '450px',
              opacity: '5',
              borderRadius: '1rem',
              height: '400px',
              position: 'relative',
            }}
          >
            <MdEdit
              onClick={handleOpen}
              style={{
                color: '#635a5a',
                position: 'absolute',
                top: '10px',
                marginTop: '20px',
                right: '10px',
                fontSize: '19px',
              }}
            />
            <div>
              <Typography
                sx={{
                  fontSize: 14,
                  mt: 2.5,
                  mb: 1.3,
                  fontWeight: '550',
                  color: 'rgb(52, 71, 103)',
                  fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                }}
              >
                Profile Information
              </Typography>
              <Typography
                mb={'15px'}
                fontSize={'0.815rem'}
                color={'rgb(73 83 105)'}
                fontFamily={'Roboto, Helvetica, Arial, sans-serif'}
              >
                {user?.ProfileInformation}
              </Typography>
              <Typography
                sx={{ fontSize: 14, opacity: '1', lineHeight: '1.5', fontWeight: '550' }}
                color="rgb(52, 71, 103)"
                fontFamily={'Roboto, Helvetica, Arial, sans-serif'}
                gutterBottom
              >
                Full Name
              </Typography>
              <Typography
                mb={'15px'}
                fontSize={'0.815rem'}
                color={'rgb(73 83 105)'}
                fontFamily={'Roboto, Helvetica, Arial, sans-serif'}
              >
                {user?.firstName}
              </Typography>
              <Typography
                sx={{ fontSize: 14, fontWeight: '550' }}
                color="rgb(52, 71, 103)"
                fontFamily={'Roboto, Helvetica, Arial, sans-serif'}
                gutterBottom
              >
                Contact
              </Typography>
              <Typography
                mb={'15px'}
                fontSize={'0.815rem'}
                color={'rgb(73 83 105)'}
                fontFamily={'Roboto, Helvetica, Arial, sans-serif'}
              >
                {user && user?.email}
              </Typography>
              <Typography
                sx={{ fontSize: 14, fontWeight: '550' }}
                color="rgb(52, 71, 103)"
                fontFamily={'Roboto, Helvetica, Arial, sans-serif'}
                gutterBottom
              >
                Your Organisation
              </Typography>
              <Typography
                mb={'15px'}
                fontSize={'0.815rem'}
                color={'rgb(73 83 105)'}
                fontFamily={'Roboto, Helvetica, Arial, sans-serif'}
              >
                {user?.organisation}
              </Typography>
              <Typography
                mb={'15px'}
                fontSize={'0.815rem'}
                color={'rgb(73 83 105)'}
                fontFamily={'Roboto, Helvetica, Arial, sans-serif'}
              ></Typography>
              <Typography
                sx={{ fontSize: 14, fontWeight: '550' }}
                color="rgb(52, 71, 103)"
                fontFamily={'Roboto, Helvetica, Arial, sans-serif'}
                gutterBottom
              >
                Your location
              </Typography>
              <Typography
                mb={'15px'}
                fontSize={'0.815rem'}
                color={'rgb(73 83 105)'}
                fontFamily={'Roboto, Helvetica, Arial, sans-serif'}
              >
                {user?.Location}
              </Typography>
            </div>{' '}
          </Card>
{equipes.length>0  && (
          <TeamCard teams={equipes}   userId={userId}  /> ) }
        </Box>

        <ProfileModal
          open={open}
          handleClose={handleClose}
          firstName={user?.firstName}
          email={user?.email}
          Location={Location}
          setLocation={setLocation}
          organisation={organisation}
          setProfileInformation={setProfileInformation}
          ProfileInformation={ProfileInformation}
          setorganisation={setorganisation}
          handleSave={handleSave}
          profilePicture={profilePicture}
          setprofilePicture={setprofilePicture}
        />
      </DashboardCard>
    </PageContainer>
  );
};

export default Icons;
