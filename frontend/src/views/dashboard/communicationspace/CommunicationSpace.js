import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  IconButton,
  Tabs,
  Grid,
  Tab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Box,
  AvatarGroup,
  Tooltip,
  Button
} from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';

import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/components/shared/DashboardCard';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { getCommunicationSpacesByProjectId} from 'src/JS/actions/CommunicartionSpace';
import image1 from "../../../assets/images/user_138671.png"

const ButtonStyled = styled(Button)(({ theme }) => ({
  alignSelf: "end",
  // marginBottom: theme.spacing(4),
  marginRight: theme.spacing(2),
  backgroundColor:"#5D87FF"

}));
const CommunicationSpace = () => {
  const { projectId } = useParams();
  const [activeTab, setActiveTab] = useState('yourSpaces');
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const communicationSpaces = useSelector((state) => state.communicationReducer.communicationSpaces) || [];
  const { loading } = useSelector((state) => state.communicationReducer);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCommunicationSpacesByProjectId(projectId));
  }, [dispatch, projectId]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter communication spaces based on the search query
  const filteredSpaces = communicationSpaces.filter((space) =>
    space.projectId.Equipe.NameEquipe.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleInitiateMeeting = (id) => {
    // Navigate or perform action to initiate meeting
    navigate(`/communication/meetHomePage/${id}`); 
};


  return (
    <PageContainer title="Communication Space" description="This is the communication space">
      <DashboardCard title="Discussion Spaces">
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            
     
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  endAdornment: (
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '25px',
                  },
                }}
              />
            </Grid>
            <Grid item>
              <IconButton
                sx={{
                  backgroundColor: '#f0f0f0',
                  borderRadius: '50%',
                  padding: '10px',
                  '&:hover': {
                    backgroundColor: '#e0e0e0',
                  },
                }}
              >
                <FilterListIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            centered
            textColor="primary"
            indicatorColor="primary"
            sx={{
              mt: 4,
              mb: 2,
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 'bold',
              },
            }}
          >
            <Tab label="Your spaces" value="yourSpaces" />
            {/* <Tab label="Joined" value="joinedSpaces" /> */}
            <Tab label="Favorites" value="favoriteSpaces" />
          </Tabs>
          <List
            sx={{
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#fff',
              padding: 2,
            }}
          >
            {activeTab === 'yourSpaces' &&
              (filteredSpaces.length > 0 ? (
                filteredSpaces.map((space) => (
                  <>
                    <ListItem
                      key={space._id}
                      sx={{
                        borderBottom: '1px solid #e0e0e0',
                        '&:last-child': { borderBottom: 'none' },
                      }}
                    >
                      
    <Link to={`/communication/space/posts/${space.projectId._id}/${space.Task._id}`}>
    <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
    </Link>
                      <ListItemText
                        primary={<Typography variant="h6">{space.Disscusionspace}</Typography>}
                        // secondary={`${space.members} members`} // Uncomment if you have members data
                        secondary={`${space.Task.TaskName} . ${space.posts.length} posts`}


                      />
                      
                      {space.Privacy==="Privacy" && (
                        <Tooltip title={`Private Space: only members of  ${space.projectId.Equipe.NameEquipe}`}>
                        <img src={image1} alt='image1' style={{width:"30px" ,height:"30px",marginRight:"50px"}} /></Tooltip>)
}
<Typography variant="body2" color="textSecondary" style={{ display: 'flex', alignItems: 'center' }}>
            <AvatarGroup max={3}>
              {space.projectId.Equipe.members.map(member => (
                <Tooltip key={member?._id} title={`Team Member: ${member?.memberId?.firstName}`}>
                  <Avatar
                    alt={member?.memberId?.firstName}
                    src={member?.memberId?.profilePicture}
                    sx={{
                      bgcolor: '#42a5f5',
                      width: 30,
                      height: 30,
                      fontSize: '13px',
                      marginRight: '10px',
                    }}
                  >
                    {member?.memberId?.firstname && member?.memberId?.firstName.substring(0, 2).toUpperCase()}
                  </Avatar>
                </Tooltip>
              ))}

            </AvatarGroup>
            <Tooltip title={`Team Owner: ${space?.projectId?.Equipe?.owner?.firstName}`}>
              <Avatar
                src={space?.projectId?.Equipe?.owner?.profilePicture}
                sx={{
                  bgcolor: '#42a5f5',
                  width: 30,
                  height: 30,
                  fontSize: '13px',
                  marginRight: '10px',
                }}
              >
                {space?.projectId?.Equipe?.owner?.firstName &&
                  space?.projectId?.Equipe?.owner?.firstName.substring(0, 2).toUpperCase()}
              </Avatar>
            </Tooltip>

                        <Box  style={{ display:"flex", flexDirection:"row",  alignItems:"flex-end",}}>
        
       
           <ButtonStyled variant="contained"  
            onClick={() => handleInitiateMeeting(space._id)}>
           
             initiate zoom call
           </ButtonStyled></Box>
          </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {new Date(space.createdAt).toLocaleDateString()}
                      </Typography>
                    </ListItem>

                 
           
        
                  </>
                ))
              ) : (
                <Typography variant="body1" color="textSecondary" align="center" sx={{ mt: 2 }}>
                  No discussion spaces found.
                </Typography>
              ))}
            {/* {activeTab === 'joinedSpaces' && (
              <Typography variant="body1" color="textSecondary" align="center" sx={{ mt: 2 }}>
                No joined spaces yet.
              </Typography>
            )} */}
            {activeTab === 'favoriteSpaces' && (
              <Typography variant="body1" color="textSecondary" align="center" sx={{ mt: 2 }}>
                No favorite spaces yet.
              </Typography>
            )}
          </List>
        </Container>
      </DashboardCard>
    </PageContainer>
  );
};

export default CommunicationSpace;
