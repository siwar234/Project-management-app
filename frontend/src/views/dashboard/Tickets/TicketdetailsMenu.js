import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


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
  const handleExportExcel = () => {
    const ticketData = Object.keys(isSecondGridOpen[taskId] || {}).map((ticketId) => {
        const ticket = isSecondGridOpen[taskId][ticketId];
        return {
            Description: ticket.Description,
            Etat: ticket.Etat,
            Priority: ticket.Priority,
            Project: ticket.projectId.projectName,
            Feature: ticket.Feature?.titleF,
            Votes: ticket.votes?.length || 0,
            Responsible: ticket.ResponsibleTicket?.firstName,
            CreatedAt: new Date(ticket.createdAt).toLocaleDateString(),
            UpdatedAt: new Date(ticket.updatedAt).toLocaleDateString(),
        };
    });

    const worksheetData = [
        [ticketData[0]?.Description], // Description
        [],
        ['projectName', ticketData[0]?.Project || ''], // Project Name
        ['Etat', ticketData[0]?.Etat || ''],
        ['Priority', ticketData[0]?.Priority || ''],
        ['Feature', ticketData[0]?.Feature || ''],
        ['Votes', ticketData[0]?.Votes || 0],
        ['Responsible', ticketData[0]?.Responsible || ''],
        [], // Empty row
        ['Created At', ticketData[0]?.CreatedAt || ''],
        ['Updated At', ticketData[0]?.UpdatedAt || '']
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // console.log("Worksheet before styling:", worksheet);

    // Define merge ranges for A1:B1, A2:B2, A9:B9
    const mergeRanges = [
        { s: { r: 0, c: 0 }, e: { r: 1, c: 1 } }, // Merge A1:B1
    ];

    // Apply merge ranges to the worksheet
    worksheet['!merges'] = mergeRanges;

 


  

    // console.log("Worksheet after styling:", worksheet);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Tickets');

    const excelBuffer = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
    });

    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'tickets.xlsx');
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
 onClick={handleExportExcel}>
 Export ticket csv format 
</MenuItem>


      </Menu>
    </div>
  );
}