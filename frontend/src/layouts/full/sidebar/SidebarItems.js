import React, { useEffect } from 'react';
import Menuitems from './MenuItems';
import { useLocation, useParams } from 'react-router';
import { Box, List, Typography } from '@mui/material';
import NavItem from './NavItem';
import NavGroup from './NavGroup/NavGroup';
import { useSelector, useDispatch } from 'react-redux';
import { getprojectbyid } from 'src/JS/actions/project';
import image5 from '../../../assets/images/icons/projection.png';

const SidebarItems = ({projectId}) => {
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const user = useSelector((state) => state.userReducer.user);
  const isadmin = user?.isAdmin;
  const dispatch = useDispatch();
  // const projectId=project._id

  useEffect(() => {
    dispatch(getprojectbyid(projectId));

    return () => {
    };
}, [dispatch, projectId]);

  const project= useSelector((state) => state.projectReducer.project); 

  const menuItems = Menuitems(projectId);

 
  return (
    <Box sx={{ px: 3 }}>
     <Box mt={8} mb={5} display={'flex'} flexDirection={"row"} alignItems="center">
  <img src={project?.Icon || image5} style={{width:'32px', marginRight: '10px'}} alt="projectIcon" />
  <div>
    <Typography style={{fontWeight:"bold"}}>{project.projectName}</Typography>
    <Typography>{project?.type}</Typography>
  </div>
</Box>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {menuItems.map((item) => {
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;
          } else {
            if (item.title === 'User management' && isadmin) {
              return <NavItem item={item} key={item.id} pathDirect={pathDirect} />;
            } else if (item.title === 'Board' && !isadmin) {
              return <NavItem                 item={{ ...item, href: `/dashboard/${projectId}` }} 
              key={item.id} pathDirect={pathDirect} />;
            } else if (item.title === 'Table' && !isadmin) {
              return <NavItem                 item={{ ...item, href: `/Table/${projectId}` }} 
              
              key={item.id} pathDirect={pathDirect} />;
            } else if (item.title === 'Timeline' && !isadmin) {
              return <NavItem                 item={{ ...item, href: `/Timeline/${projectId}` }} 
              
              
              key={item.id} pathDirect={pathDirect} />;
            // } else if (item.title === 'Statistics' && !isadmin) {
            //   return <NavItem                 item={{ ...item, href: `/statistic` }} 
              
              
            //   key={item.id} pathDirect={pathDirect} />;
            } else if (item.title !== 'User management' && item.title !== 'Board'  && item.title !== 'Table' && item.title !== 'Timeline' ) {
              return <NavItem item={item} key={item.id} pathDirect={pathDirect} />;
            }
          }
          return null;
        })}
      </List>
    </Box>
  );
};

export default SidebarItems;
