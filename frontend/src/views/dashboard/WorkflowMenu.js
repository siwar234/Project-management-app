import React  from 'react';
import {  MenuItem, Divider, Menu, Typography } from '@mui/material';

export default function WorkflowMenu({anchorEl,handleCloseing,setEtat,currentEtat  }) {

  


  return (
    <Menu id="long-menu" 
    anchorEl={anchorEl}
     open={Boolean(anchorEl)}
     onClose={handleCloseing}>


{currentEtat !== 'IN_PROGRESS' && (

    <MenuItem style={{ width: '150px' }}   onClick={() => setEtat('IN_PROGRESS')}
>
      <Typography
        style={{

          fontSize: '10px',
          width: '75px',
          textAlign: 'center',
          borderRadius: '3px',
          height: '23px',
          backgroundColor: 'rgb(227 226 226 / 55%)',
          marginRight: '10px',
          marginTop: '5px',
          color: 'rgb(107 107 107)',
          fontWeight: 'bold',
          fontFamily: 'system-ui',
        }}
      >
        IN_PROGRESS
      </Typography>
    </MenuItem>
)}
    {currentEtat !== 'TO DO' && (
        <MenuItem style={{ width: '150px' }} onClick={() => setEtat('TO DO')}>
          <Typography
            style={{
              fontSize: '11px',
              fontFamily: 'system-ui',
              width: '50px',
              textAlign: 'center',
              borderRadius: '3px',
              height: '25px',
              fontWeight: 'bold',
              backgroundColor: '#7ca1f35e',
              marginRight: '70px',
              color: '#5d87ff',
            }}
          >
            TO DO
          </Typography>
        </MenuItem>
      )}
          {currentEtat !== 'DONE' && (

    <MenuItem style={{ width: '150px' }}onClick={() => setEtat('DONE')}>
      <Typography
        style={{
          fontSize: '11px',
          fontFamily: 'system-ui',
          width: '50px',
          textAlign: 'center',
          borderRadius: '3px',
          height: '23px',
          backgroundColor: 'rgb(214 247 210)',
          marginTop: '2px',
          fontWeight: 'bold',
          color: 'rgb(12 119 26)',
        }}
      >
        DONE
      </Typography>
    </MenuItem>)}

    <Divider />
    <MenuItem style={{fontFamily:"sans-serif"}}> Manage workflows</MenuItem>
      
  </Menu>
  );
}
