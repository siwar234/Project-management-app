import React from 'react';
import { MenuItem, Divider, Menu, Typography } from '@mui/material';

export default function PriorityMenu({ isopened, handleclosed,currentPriority,setPriority }) {



  return (
    <Menu
      id="menu"
      open={Boolean(isopened)}
      onClose={handleclosed}
      anchorEl={isopened}
    >

{currentPriority !== 'Low' && (

<MenuItem style={{ width: '150px' }} onClick={() => setPriority('Low')}>
  <Typography
    style={{
      fontSize: '11px',
      fontFamily: 'system-ui',
      width: '80px',
      textAlign: 'center',
      borderRadius: '3px',
      height: '23px',
      marginTop: '2px',
      fontWeight: 'bold',
      backgroundColor: '#9f8fef7d',
      color: '#5b356fcc',
    }}
  >
    Low
  </Typography>
</MenuItem>)}

{currentPriority !== 'High' && (

      <MenuItem style={{ width: '150px' }} onClick={() => setPriority('High')}>
        <Typography
          style={{
            fontSize: '11px',
            fontFamily: 'system-ui',
            width: '80px',
            textAlign: 'center',
            borderRadius: '3px',
            height: '23px',
            backgroundColor: '#cdf7d4',
            marginTop: '2px',
            fontWeight: 'bold',
            color: 'rgb(35 145 115)',
          }}
        >
          High
        </Typography>
      </MenuItem>)}

      {currentPriority !== 'Meduim' && (

      <MenuItem style={{ width: '150px' }} onClick={() => setPriority('Meduim')}>
        <Typography
          style={{
            fontSize: '11px',
            fontFamily: 'system-ui',
            width: '80px',
            textAlign: 'center',
            borderRadius: '3px',
            height: '23px',
            backgroundColor: '#ffc0ca',
            marginTop: '2px',
            fontWeight: 'bold',
            color: '#c1535c',
          }}
        >
          Meduim
        </Typography>
      </MenuItem>)}

      <Divider />
      <MenuItem style={{ fontFamily: "sans-serif" }}> Edit options</MenuItem>
    </Menu>
  );
}
