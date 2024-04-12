import React from 'react';
import Menuitems from './MenuItems';
import { useLocation } from 'react-router';
import { Box, List } from '@mui/material';
import NavItem from './NavItem';
import NavGroup from './NavGroup/NavGroup';
import { useSelector } from 'react-redux'; 

const SidebarItems = () => {
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const user = useSelector((state) => state.userReducer.user); 
  const isadmin = user?.isAdmin 
  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {Menuitems.map((item) => {
          // Check if the item is a subheader
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;
          } else {
            // Check if the item should be rendered based on user permissions
            if (item.title === 'User management' && isadmin) {
              return <NavItem item={item} key={item.id} pathDirect={pathDirect} />;
            } else if (item.title !== 'User management') {
              return <NavItem item={item} key={item.id} pathDirect={pathDirect} />;
            }
          }
          return null; // Return null if item shouldn't be rendered
        })}
      </List>
    </Box>
  );
};

export default SidebarItems;
