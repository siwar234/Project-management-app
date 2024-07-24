import React, { useState, useEffect } from 'react';
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
import DashboardCard from '../../components/shared/DashboardCard';
import { useDispatch, useSelector } from 'react-redux';
import { banUser, fetchUsers, unbanuser } from 'src/JS/actions/user';
import TablePagination from '@mui/material/TablePagination';

const ProjectList = () => {
  const dispatch = useDispatch();
  const { loading, users, error } = useSelector((state) => state.userReducer);
  const [banDate, setBanDate] = useState('');
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleBanUser = (selectedUserId) => {
    if (!selectedUserId || !banDate) {
      return;
    }
    dispatch(banUser(selectedUserId, banDate));
    dispatch(fetchUsers());
  };

  const handleUnbanUser = (selectedUserId) => {
    if (!selectedUserId) {
      return;
    }
    dispatch(unbanuser(selectedUserId));
    dispatch(fetchUsers());
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = users.filter((user) =>
    user.firstName.toLowerCase().includes(filter.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };

  return (
    <Box sx={{ width: '130%' }}>
      <DashboardCard title="Users management">
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Filter by Name"
            variant="outlined"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </Box>
        <Box sx={{ overflow: 'auto', width: { xs: '300px', sm: 'auto' } }}>
          <Table
            aria-label="simple table"
            sx={{
              whiteSpace: 'nowrap',
              mt: 2,
              width: '300px',
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
                    Status
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle2" fontWeight={600}>
                    Actions
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle2" fontWeight={600}>
                    Ban Date
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUsers.map((user) => (
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
                    />
                  </TableCell>
                  <TableCell align="right">
                    {user?.isBanned ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleUnbanUser(user?._id)}
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
                    <Box display="flex" alignItems="center">
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
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </DashboardCard>
    </Box>
  );
};

export default ProjectList;
