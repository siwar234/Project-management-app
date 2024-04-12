import React from 'react';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Button,
  TextField,
} from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { banUser, fetchUsers, unbanuser } from 'src/JS/actions/user';



const ProductPerformance = () => {
  const dispatch = useDispatch();
  const { loading, users, error } = useSelector((state) => state.userReducer); // Assuming your users are stored in userReducer
  const [banDate, setBanDate] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');

  const handleBanUser = (selectedUserId) => {
    if (!selectedUserId || !banDate) {
      return;
    }
    dispatch(banUser(selectedUserId, banDate));
    dispatch(fetchUsers());
  };

  const handleunBanUser = (selectedUserId) => {
    if (!selectedUserId) {
      return;
    }
    dispatch(unbanuser(selectedUserId));
    dispatch(fetchUsers());

  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);


  return (
    <Box sx={{ width: '130%' }}>

    <DashboardCard title="Users management"  >
      <Box sx={{ overflow: 'auto', width: { xs: '300px', sm: 'auto' } }}>
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: 'nowrap',
            mt: 2,
           width:'300px',
          }}
          
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Email
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  status
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user?._id}>
                <TableCell>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {user.firstName}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        sx={{
                          fontSize: '13px',
                        }}
                      >
                        {user?.Location}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                    {user?.email}
                  </Typography>
                </TableCell>
                <TableCell>
                <Chip
  label={user?.isBanned ? 'Inactive' : 'Active'}
  style={{
    backgroundColor: user?.isBanned ? 'rgb(244 220 213)' : 'rgb(189 204 245)', 
    
  }} 
/>           </TableCell>
                <TableCell align="right">
                  {user?.isBanned  ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleunBanUser(user?._id)}
                      sx={{ ml: 2 }}
                    >
                      Unban User
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleBanUser(user?._id)}
                      
                      sx={{ ml: 2 }}
                    >
                      Ban User
                    </Button>
                  )}
                </TableCell>
                <TableCell align="right">
                  <Box  display="flex" alignItems="center">
                    <input
                      style={{
                        padding: '8px 12px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        fontSize: '14px',
                        fontFamily: 'sans-serif',
                        outline: 'none',
                        borderColor: '#007bff',
                      }}
                      type="date"
                      id={user._id}
                      onChange={(e) => setBanDate(e.target.value)}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      
    </DashboardCard></Box>
  );
};

export default ProductPerformance;
