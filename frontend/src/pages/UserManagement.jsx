import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
  IconButton,
  Paper,
  Box,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditUser from '../components/EditUser';
import AddUser from '../components/AddUser';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    gender: 'muško',
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get('http://localhost:4000/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormValues({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone || '',
      password: '',
      gender: user.gender,
    });
    setOpenEdit(true);
  };

  const handleAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const updatedFields = {};

      Object.keys(formValues).forEach((key) => {
        if (key === 'password' && formValues[key] === '') {
          return;
        }

        if (formValues[key] !== selectedUser[key]) {
          updatedFields[key] = formValues[key];
        }
      });

      if (Object.keys(updatedFields).length === 0) {
        console.log('No fields have changed.');
        return;
      }

      await axios.patch(`http://localhost:4000/users/${selectedUser.id}`, updatedFields, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(users.map((user) =>
        user.id === selectedUser.id ? { ...user, ...updatedFields } : user
      ));
      setOpenEdit(false);
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  const handleSaveAdd = async (newUser) => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.post('http://localhost:4000/users', newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers([...users, response.data]);
      setOpenAdd(false);
    } catch (err) {
      console.error('Error adding user:', err);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem('jwtToken');
      await axios.delete(`http://localhost:4000/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            User Management
          </Typography>
        </Box>

        <Button variant="contained" color="primary" onClick={handleAdd}>
          Add User
        </Button>

        <List>
          {users.map((user) => (
            <ListItem key={user.id} sx={{ borderBottom: '1px solid #ddd' }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={2}>
                  <ListItemText primary={user.firstName} secondary="First Name" />
                </Grid>
                <Grid item xs={2}>
                  <ListItemText primary={user.lastName} secondary="Last Name" />
                </Grid>
                <Grid item xs={3}>
                  <ListItemText primary={user.email} secondary="Email" />
                </Grid>
                <Grid item xs={2}>
                  <ListItemText primary="*****" secondary="Password" />
                </Grid>
                <Grid item xs={2}>
                  <ListItemText primary={user.phone || 'N/A'} secondary="Phone" />
                </Grid>
                <Grid item xs={1}>
                  <ListItemText primary={user.gender} secondary="Gender" />
                </Grid>
                <Grid item xs={2}>
                  <IconButton color="primary" onClick={() => handleEdit(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(user.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </Paper>

      <EditUser
        open={openEdit}
        handleClose={handleCloseEdit}
        formValues={formValues}
        handleInputChange={handleInputChange}
        handleSave={handleSaveEdit}
      />

      <AddUser
        open={openAdd}
        handleClose={handleCloseAdd}
        handleSave={handleSaveAdd}
      />
    </Container>
  );
};

export default UserManagement;
