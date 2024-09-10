import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  MenuItem,
  Button
} from '@mui/material';

const EditUser = ({ open, handleClose, formValues, handleInputChange, handleSave }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formValues.firstName) {
      tempErrors.firstName = 'First name is required';
      isValid = false;
    } else if (formValues.firstName.length < 3 || formValues.firstName.length > 32) {
      tempErrors.firstName = 'First name must be between 3 and 32 characters';
      isValid = false;
    }

    if (!formValues.lastName) {
      tempErrors.lastName = 'Last name is required';
      isValid = false;
    } else if (formValues.lastName.length < 3 || formValues.lastName.length > 32) {
      tempErrors.lastName = 'Last name must be between 3 and 32 characters';
      isValid = false;
    }

    if (!formValues.email) {
      tempErrors.email = 'Email is required';
      isValid = false;
    }

    if (!formValues.phone) {
      tempErrors.phone = 'Phone is required';
      isValid = false;
    }

    if (formValues.password && formValues.password.length < 8) {
      tempErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      handleSave();
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Edit the details of the user.
        </DialogContentText>

        <TextField
          margin="dense"
          name="firstName"
          label="First Name"
          fullWidth
          value={formValues.firstName}
          onChange={handleInputChange}
          error={!!errors.firstName}
          helperText={errors.firstName}
        />
        <TextField
          margin="dense"
          name="lastName"
          label="Last Name"
          fullWidth
          value={formValues.lastName}
          onChange={handleInputChange}
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
        <TextField
          margin="dense"
          name="email"
          label="Email"
          fullWidth
          value={formValues.email}
          onChange={handleInputChange}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          margin="dense"
          name="phone"
          label="Phone"
          fullWidth
          value={formValues.phone}
          onChange={handleInputChange}
          error={!!errors.phone}
          helperText={errors.phone}
        />
        <TextField
          margin="dense"
          name="password"
          label="Password"
          type="password"
          fullWidth
          value={formValues.password}
          onChange={handleInputChange}
          error={!!errors.password}
          helperText={errors.password}
        />
        <TextField
          margin="dense"
          name="gender"
          label="Gender"
          select
          fullWidth
          value={formValues.gender}
          onChange={handleInputChange}
        >
          <MenuItem value="muško">muško</MenuItem>
          <MenuItem value="žensko">žensko</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUser;
