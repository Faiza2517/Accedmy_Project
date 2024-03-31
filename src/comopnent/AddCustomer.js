import React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export const AddCustomer = () => {
    
    const [showPassword, setShowPassword] = React.useState(false);
    //const [password, setPassword] = useState('');
    const [error, seterrorMsg] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        industryType: '',
        customerType: '',
    });

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // const handleChange = (event) => {
    //     setPassword(event.target.value);
    // };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handelSubmit = async (e) => {
        e.preventDefault();

        if (formData.firstName.trim() === '') {
            seterrorMsg('First name is required');
            return;
        }

        const requestObj = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            password: formData.password,
            industry_type:formData.industryType,
            customer_type:formData.customerType,
            
    
        };

        const headers = { 'Content-Type': 'application/json' };

        try {
            const response = await axios.post(
                'http://146.190.164.174:4000/api/customer/signup_customer',
                requestObj,
                { headers }
            );
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                console.log('Add Customer successful:', response.data);
                // Do something after successful signup, like redirecting to sign-in page
            } else {
                console.error('Error fetching data:', response.statusText);
            }
        } catch (error) {
            console.error('Add Customer error:', error.response);
        }
    };
    const currencies = [
        {
            label: 'Website',
        },
        {
            label: 'Front-end',
        },
        {
            label: 'Back-end',
        },
        {

            label: 'Web-app',
        },
    ];

    const navigate = useNavigate();
    const handleCancel = () => {
        navigate("/customer");
    };
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Avatar sx={{ bgcolor: deepPurple[500] }}>M</Avatar>
            </div>
            <div style={{ marginLeft: 55 }}>
                <h3 style={{ textAlign: 'left' }}>
                    <b>Add Customer</b>
                </h3>
            </div>
            <form onSubmit={handelSubmit}>
                <div>
                    <FormControl sx={{ m: 1, width: '55ch' }} variant="outlined">
                        <TextField
                            required
                            name="firstName"
                            id="outlined-password-input"
                            label="First Name"
                            type="First Name"
                            onChange={handleChange}
                            value={formData.firstName}
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '55ch' }} variant="outlined">
                        <TextField
                            required
                            name="lastName"
                            id="outlined-password-input"
                            label="Last Name"
                            type="Last Name"
                            onChange={handleChange}
                            value={formData.lastName}
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '55ch' }} variant="outlined">
                        <TextField
                            required
                            name="email"
                            id="outlined-password-input"
                            label="Email"
                            type="Email"
                            onChange={handleChange}
                            value={formData.email}
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '55ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                            name="password"
                            onChange={handleChange}
                            value={formData.password}
                        />
                    </FormControl>
                    <br />

                    <FormControl sx={{ m: 1, width: '55ch' }} variant="outlined">
                        {/* <TextField
                            id="outlined-select-customer-type"
                            select
                            label="Customer Type"
                            name="customerType"
                            value={formData.customerType}
                            onChange={handelSubmit}
                        >
                            {currencies.map((option) => (
                                <MenuItem key={option.label} value={option.label}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField> */}
                          <TextField
                            id="outlined-select-industry-type"
                            select
                            label="Customer Type"
                            name="customerType"
                            value={FormControl.customerType}
                            onChange={handleChange}
                        >
                            {currencies.map((option) => (
                                <MenuItem key={option.label} value={option.label}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '55ch' }} variant="outlined">
                        <TextField
                            id="outlined-select-industry-type"
                            select
                            label="Industry Type"
                            name="industryType"
                            value={FormControl.industryType}
                            onChange={handleChange}
                        >
                            {currencies.map((option) => (
                                <MenuItem key={option.label} value={option.label}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                
                    <br />

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Stack direction="row" spacing={2}>
                            <Button 
                            onClick={handleCancel}
                            variant="outlined"
                             color="success" 
                             startIcon={<CloseIcon />}>
                                Close
                            </Button>
                            <Button type="submit" variant="contained" className="btn" onClick={handelSubmit}>
                                Send
                            </Button>
                        </Stack>
                    </div>
                    </FormControl>
                </div>
            </form>
        </div>
    );
};
