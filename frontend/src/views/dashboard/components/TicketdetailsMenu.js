import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';



const ITEM_HEIGHT = 48;

export default function TicketdetailsMenu({handleflagclick,ticketid,isSecondGridOpen,taskId,deletingticketflag}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        style={{ color: '#42526E' }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
     
     <MenuItem
  onClick={() => {
    if (isSecondGridOpen[taskId][ticketid].flag) {
        deletingticketflag(ticketid);
    } else {
      handleflagclick(ticketid);
    }
  }}
>
  {isSecondGridOpen[taskId][ticketid].flag ? "delete an indicator" : "add an indicator"}
</MenuItem>

<MenuItem
  
>
    delete ticket
</MenuItem>
<MenuItem
  
>
 Export ticket csv format 
</MenuItem>


      </Menu>
    </div>
  );
}