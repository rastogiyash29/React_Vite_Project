import React, { useState } from 'react';
import { TextField, Button, Box, Typography, FormHelperText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FirstPage: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Checking are any validation errors
    if (!name) {
      setErrors((errors) => ({ ...errors, name: 'Name is required' }));
      return;
    }
    if (!phone) {
      setErrors((errors) => ({ ...errors, phone: 'Phone number is required' }));
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      setErrors((errors) => ({ ...errors, phone: 'Phone number must be 10 digits' }));
      return;
    }
    if (!email) {
      setErrors((errors) => ({ ...errors, email: 'Email is required' }));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors((errors) => ({ ...errors, email: 'Email is invalid' }));
      return;
    }

    // If all validations pass, saving the form data to localStorage
    const formData = {
      name: name,
      phone: phone,
      email: email,
    };
    localStorage.setItem('formData', JSON.stringify(formData));

    navigate('/second-page');
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setName(value);
    setErrors((errors) => ({ ...errors, name: value ? '' : 'Name is required' }));
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPhone(value);
    if (!value) {
      setErrors((errors) => ({ ...errors, phone: 'Phone number is required' }));
    } else if (!/^\d{10}$/.test(value)) {
      setErrors((errors) => ({
        ...errors,
        phone: 'Phone number must be 10 digits',
      }));
    } else {
      setErrors((errors) => ({ ...errors, phone: '' }));
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
    if (!value) {
      setErrors((errors) => ({ ...errors, email: 'Email is required' }));
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setErrors((errors) => ({ ...errors, email: 'Email is invalid' }));
    } else {
      setErrors((errors) => ({ ...errors, email: '' }));
    }
  };

  const handleReset = () => {
    // Clearing the form data from localStorage
    localStorage.removeItem('formData');

    // Resetting the state values
    setName('');
    setPhone('');
    setEmail('');
    setErrors({
      name: '',
      phone: '',
      email: '',
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: {
          xs: '80%',
          sm: '60%',
          md: 500,
        },
        margin: '0 auto',
        padding: 2,
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        User Details
      </Typography>
      <TextField
        label="Name"
        value={name}
        onChange={handleNameChange}
        fullWidth
        margin="normal"
        error={Boolean(errors.name)}
      />
      <FormHelperText error>{errors.name}</FormHelperText>
      <TextField
        label="Phone Number"
        value={phone}
        onChange={handlePhoneChange}
        fullWidth
        margin="normal"
        error={Boolean(errors.phone)}
      />
      <FormHelperText error>{errors.phone}</FormHelperText>
      <TextField
        label="Email"
        value={email}
        onChange={handleEmailChange}
        fullWidth
        margin="normal"
        error={Boolean(errors.email)}
      />
      <FormHelperText error>{errors.email}</FormHelperText>
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Submit
      </Button>
      <Button onClick={handleReset} variant="contained" color="secondary" sx={{ mt: 2 }}>
        Reset
      </Button>
    </Box>
  );
};

export default FirstPage;
