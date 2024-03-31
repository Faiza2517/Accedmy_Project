import React, { useState } from 'react'
import './style.css'
import { dp } from './images'
import { log } from './images'
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircleIcon from '@mui/icons-material/Circle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';

export const Signpage = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [password, setPassword] = useState('')
    const [error, seterrorMsg] = useState('')
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
    })

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleChange = (event) => {
        setPassword(event.target.value);
    };
    const handlleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
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
            password: password,
            status: true,
        };

        const headers = { "Content-Type": "application/json" };

        try {
            const response = await axios.post(
                "http://146.190.164.174:4000/api/admin/signup_admin",
                requestObj,
                { headers }
            );
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                console.log('SignUp successful:', response.data);
                // Do something after successful signup, like redirecting to sign-in page
            } else {
                console.error('Error fetching data:', response.statusText);
            }
        } catch (error) {
            console.error('SignUp error:', error.response);
        }
    };
    const isLowerCase = /[a-z]/.test(password);
    const isUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const isMinLength = password.length >= 8;
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-12 col-sm-7' >
                    <div className='logo2'>
                        <img src={log} />
                    </div>
                    <div className='container'>
                        <FormControl sx={{ m: 1, width: '45ch' }} variant="outlined">
                            <h3 className='txt'>
                                Get started with a Forver
                                Free plan
                            </h3>
                            <p className='txt'>
                                Sign up in seconds.No credit card required.
                            </p>

                        </FormControl>
                        <form onSubmit={handelSubmit}>
                            <div>
                                <FormControl sx={{ m: 1, width: '45ch' }} variant="outlined">
                                    <TextField
                                        required
                                        name='firstName'
                                        id="outlined-password-input ,outline-size-small"
                                        label="First Name"
                                        type="First Name"
                                        size='small'
                                        onChange={handlleChange}
                                    />
                                </FormControl>
                                <FormControl sx={{ m: 1, width: '45ch' }} variant="outlined">
                                    <TextField
                                        id="outlined-password-input ,outline-size-small"
                                        label="Last Name"
                                        type="Last Name"
                                        name='lastName'
                                        size='small'
                                        onChange={handlleChange}
                                    />
                                </FormControl>
                                <FormControl sx={{ m: 1, width: '45ch' }} variant="outlined">
                                    <TextField
                                        required
                                        name='email'
                                        id="outlined-password-input ,outline-size-small"
                                        label="Email"
                                        type="email"
                                        size='small'
                                        onChange={handlleChange}
                                    />
                                </FormControl>
                                <FormControl sx={{ m: 1, width: '45ch' }} variant="outlined">
                                    <TextField
                                        id="outlined-password-input ,outline-size-small"
                                        label="Phone"
                                        type="number"
                                        size='small'
                                        onChange={handlleChange}
                                    />
                                </FormControl>
                                <br />
                                <FormControl sx={{ m: 1, width: '45ch' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        name='password'

                                        id="outlined-adornment-password ,outline-size-small"
                                        type={showPassword ? 'text' : 'password'}
                                        size='small'
                                        onChange={handleChange}
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

                                    />
                                    <div className='row'>
                                        <div className='col-6'>
                                            <div className='validationDiv'>
                                                <CircleIcon sx={{ color: isLowerCase ? 'green' : 'gray', fontSize: 'small' }} className='icon' />
                                                <span>One lowercase</span>
                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <div className='validationDiv'>
                                                <CircleIcon sx={{ color: isUpperCase ? 'green' : 'gray', fontSize: 'small' }} />
                                                <span>One number must</span>
                                            </div>
                                        </div>

                                    </div>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <div className='validationDiv'>
                                                <CircleIcon sx={{ color: hasNumber ? 'green' : 'gray', fontSize: 'small' }} />
                                                <span> One uppercase</span>
                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <div className='validationDiv'>
                                                <CircleIcon sx={{ color: isMinLength ? 'green' : 'gray', fontSize: 'small' }} />
                                                <span>8 charcter minimum</span>
                                            </div>
                                        </div>
                                    </div>
                                    <span className='txts'>
                                        By Clicking you agree to Trems of Use, Privacy Policy and Anti-Spam policy.
                                    </span>

                                    <br />
                                    <Button variant="contained"
                                        size="large"
                                        className='btn'
                                        type='submit'
                                        style={{ textTransform: 'capitalize' }}>
                                        Create my account
                                    </Button>

                                </FormControl>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='col-12 col-sm-5  back d-flex d-none d-lg-flex'>
                    <div className='data'>
                        <ul className='list'>
                            <li>
                                <h3>Try Advance features htmlFor 30 days</h3>
                            </li>
                            <p className='txts'>
                                your 30-days for trail advance features includes:
                            </p>
                        </ul>
                        <ul className='list'>
                            <li>
                                <span><CheckCircleIcon sx={{ fontSize: 'medium' }} /></span>
                                <span style={{ marginLeft: '5px' }}> Access to premium features</span>
                            </li>
                            <p>
                                Live chat,template library,auto resend,promotion pop-ups,AI writing assistant and more
                            </p>
                            <li>
                                <span><CheckCircleIcon sx={{ fontSize: 'medium' }} /></span>
                                <span style={{ marginLeft: '5px' }}>Access to main features</span>
                            </li>
                            <p>
                                Email automation,landing page,website builder and more
                            </p>
                            <li>
                                <span><CheckCircleIcon sx={{ fontSize: 'medium' }} /></span>
                                <span style={{ marginLeft: '5px' }}> Up to 1,000 subscribers</span>
                            </li>
                            <li>
                                <span><CheckCircleIcon sx={{ fontSize: 'medium' }} /></span>
                                <span style={{ marginLeft: '5px' }}>Send up to 12,000 emails per month</span>
                            </li>
                            <li>
                                <span><CheckCircleIcon sx={{ fontSize: 'medium' }} /></span>
                                <span style={{ marginLeft: '5px' }}>24/7 live chat support</span>
                            </li>
                            <li>
                                <span><CheckCircleIcon sx={{ fontSize: 'medium' }} /></span>
                                <span style={{ marginLeft: '5px' }}>Upgrade anytime</span>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
