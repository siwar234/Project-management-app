import React, { useEffect } from 'react';
import Menuitems from './MenuItems';
import { useLocation } from 'react-router';
import { Box, List, Typography } from '@mui/material';
import NavItem from './NavItem';
import NavGroup from './NavGroup/NavGroup';
import { useSelector, useDispatch } from 'react-redux';
import { getprojectbyid } from 'src/JS/actions/project';
import image5 from '../../../assets/images/icons/projection.png';

const SidebarItems = ({ projectId }) => {
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const user = useSelector((state) => state.userReducer.user);
  const isadmin = user?.isAdmin;
  const dispatch = useDispatch();
  const userRole = user?.Roles?.find(role => role.name === 'user');

  useEffect(() => {
    dispatch(getprojectbyid(projectId));
    // Clean up effect
    return () => {
      // Cleanup code if needed
    };
  }, [dispatch, projectId]);

  const project = useSelector((state) => state.projectReducer.project);
  const menuItems = Menuitems(projectId);

  return (
    <Box sx={{ px: 3 }}>
      {!isadmin && (
        <Box mt={8} mb={5} display={'flex'} flexDirection="row" alignItems="center">
          <img src={project?.Icon || image5} style={{ width: '32px', marginRight: '10px' }} alt="projectIcon" />
          <div>
            <Typography style={{ fontWeight: 'bold' }}>{project.projectName}</Typography>
            <Typography>{project?.type}</Typography>
          </div>
        </Box>
      )}
      <List sx={{ pt: 0 }} className="sidebarNav">
        {menuItems.map((item) => {
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;
          } else {
            if (item.title === 'User management' && isadmin) {
              return <NavItem item={item} key={item.id} pathDirect={pathDirect} />;
            } else if (item.title === 'BackLog' && userRole) {
              return <NavItem item={{ ...item, href: `/dashboard/${projectId}` }} key={item.id} pathDirect={pathDirect} />;
            } else if (item.title === 'Table' && userRole) {
              return <NavItem item={{ ...item, href: `/Table/${projectId}` }} key={item.id} pathDirect={pathDirect} />;
            } else if (item.title === 'Timeline' && userRole) {
              return <NavItem item={{ ...item, href: `/Timeline/${projectId}` }} key={item.id} pathDirect={pathDirect} />;
            } else if (item.title === 'Communication space' && userRole) {
              return (
                <NavItem
                  item={{ ...item, href: `/communication/space/list/${projectId}` }}
                  key={item.id}
                  pathDirect={pathDirect}
                />
              );
            } else if (!['User management', 'BackLog', 'Table', 'Timeline', 'Communication space'].includes(item.title)) {
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
