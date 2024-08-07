import React, { useState } from 'react';
import { Card, Typography, Avatar, Box, Chip, Tooltip } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import GroupsIcon from '@mui/icons-material/Groups';

const TeamCard = ({ teams}) => {
  const [showTeam, setShowTeam] = useState(true);

  const handleToggle = (isTeam) => {
    setShowTeam(isTeam);
  };

  return (
    
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', mt: 5.5 }}>
                <Typography mb={3} style={{marginLeft:"20px",fontWeight:"bold",fontSize:"16px"}} >work with</Typography>
 
      <Box sx={{ display: 'flex', justifyContent: 'left', mb: 1 }}>
        {teams && teams.map((collaborator, index) => (
            <Tooltip title={collaborator.NameEquipe}>
          <Chip
            key={index}
            avatar={<Avatar style={{textAlign: 'left', backgroundColor: showTeam ?  "#696666": "#206620e8", color: "white", marginRight: '5px',width:"25px",height:"25px" }}><PeopleIcon style={{width:"20px"}} /></Avatar>}
            label={collaborator.NameEquipe}
            onClick={() => handleToggle(true)}
            style={{ fontWeight: 'bold', backgroundColor: showTeam ? "#e1f3ff" : "#e8e8e8", color: showTeam ? '#4570eae3' : 'black', width: "120px" }}
            sx={{ mx: 2, cursor: 'pointer', textAlign: 'left' }}
          /></Tooltip>
        ))}

       <Tooltip title="Collaborateurs">

        <Chip
          avatar={<Avatar style={{ backgroundColor: !showTeam ?  "#696666":"#226c43e8" , color: "white", marginRight: '5px' ,width:"25px",height:"25px"}}><GroupsIcon style={{width:"20px"}} /></Avatar>}
          label="Collaborateurs"
          onClick={() => handleToggle(false)}
          style={{ fontWeight: 'bold', color: !showTeam ? '#4570eae3' : 'black', backgroundColor: !showTeam ? "#e1f3ff" : "#e8e8e8", width: "150px" }}
          sx={{ mx: 1, cursor: 'pointer', textAlign: 'left' }}
        /></Tooltip>
      </Box>

      <Card sx={{ mt: 2, mb: 3, mx: 3, py: 2, px: 2, width: '450px', borderRadius: '1rem' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {showTeam ? (
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              {teams.map((equipe, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar style={{ backgroundColor: showTeam ? "#226c43e8" : "#696666", color: "white", marginRight: '10px' }}>
                    <PeopleIcon />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{equipe.NameEquipe} <span style={{marginLeft:"5px",color:"gray",fontSize:"13px"}} >{equipe.members.length} members </span>  </Typography>

                </Box>
              ))}
              {teams.map((equipe, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', mt: 2, paddingLeft: '10px' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    {equipe.members.map((member, memberIndex) => (
                      <Box key={memberIndex} sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                        <Avatar src={member.memberId?.profilePicture} sx={{ fontSize: '15px', bgcolor: '#42a5f5', width: '30px', height: '30px' }} style={{ margin: 'auto' }}>
                          {member.memberId?.firstName.substring(0, 2).toUpperCase()}
                        </Avatar>
                        <Typography sx={{ ml: 2 }}>{member?.memberId?.firstName}</Typography>
                        
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          ) : (
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Avatar style={{ backgroundColor: showTeam ? "#226c43e8" : "#696666", color: "white", marginRight: '10px' }}>
        <GroupsIcon />
      </Avatar>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>Collaborators</Typography>
        <Typography  sx={{  display: 'flex', alignItems: 'center',fontSize:"12.3px",color:"gray" }}>Based on interactions with other members</Typography>
      </Box>
    </Box>
            
            {teams.map((equipe, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', mt: 2, paddingLeft: '10px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  {equipe.members.map((member, memberIndex) => (
                    <Box key={memberIndex} sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                      <Avatar src={member.memberId?.profilePicture} sx={{ fontSize: '15px', bgcolor: '#42a5f5', width: '33px', height: '33px' }} style={{ margin: 'auto' }}>
                        {member.memberId?.firstName.substring(0, 2).toUpperCase()}
                      </Avatar>
                      <Typography sx={{ ml: 2 }}>{member.memberId?.firstName}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
          )}
        </Box>
      </Card>
    </Box>
  );
};

export default TeamCard;
