import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router';
import { TextField, Snackbar, Button } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';

export const EditCustomer = () => {
  const { state } = useLocation()
  const pathname = useParams()
  console.log(state, "state----", pathname);
  const [formData, setFormData] = useState({
    firstName: state.first_name ? state.first_name : '',
    lastName: state.last_name ? state.last_name : '',
    email: state.user.email ? state.user.email : '',
    profileImage: state.profile_image ? state.profile_image : '',
    phoneNumber: state.phone_number ? state.phone_number : '',
    industryType: state.industry_type ? state.industry_type : ''
  });
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const handleSubmit = async (event) => {
    const { firstName, lastName, email, industryType, phoneNumber, profileImage } = formData;

    event.preventDefault();
    try {
      const token = localStorage.getItem("token")
      const headers = {
        'x-sh-auth': token,
      };
      const response = await axios.put(`http://146.190.164.174:4000/api/customer/edit_customer_by_admin/${pathname.id}`, {
        first_name: firstName,
        last_name: lastName,
        email: email,
        industry_type: industryType,
        phone_number: phoneNumber,
        profile_image: profileImage
      }, { headers: headers });
      console.log('Customer added successfully:', response.data);

      setSuccessAlert(true);
    } catch (error) {
      console.error('Error adding customer:', error.response);
      setErrorAlert(true);
      setErrorMessage(error.response.data.message);
    }
  };
  const handleCloseAlert = () => {
    setSuccessAlert(false);
    setErrorAlert(false);
    setErrorMessage('');
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/customer");
  };

  return (
    <>
      <form onSubmit={() => handleSubmit()}>
        <div className="container">
          <h1 style={{ marginBottom: "50px" }}>Edit Customer</h1>
          <div className="row">
            <div className="col-lg-6">
              <TextField
                fullWidth
                name="firstName"
                className="first-name"
                id="outlined-basic"
                label="First Name"
                type="text"
                variant="outlined"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                style={{ marginBottom: '30px' }}
              />
              <TextField
                fullWidth
                name="email"
                className="email"
                id="outlined-basic"
                label="Email"
                type="email"
                variant="outlined"
                value={formData.email}
                onChange={handleInputChange}
                required
                style={{ marginBottom: '30px' }}
              />
              <Autocomplete
                fullWidth
                options={['Software', 'Healthcare', 'Education']}  // Your suggestion list
                renderInput={(params) => <TextField {...params} label="Industry Type" variant="outlined" />}
                value={formData.industryType}
                onChange={(event, newValue) => {
                  setFormData({ ...formData, industryType: newValue });
                }}
                style={{ marginBottom: '30px' }}
              />
            </div>
            <div className="col-lg-6">
              <TextField
                fullWidth
                name='lastName'
                className="last-name"
                id="outlined-basic"
                label="Last Name"
                type="text"
                variant="outlined"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                style={{ marginBottom: '30px' }}
              />
              <TextField
                fullWidth
                name="profileImage"
                className="profile-image"
                id="outlined-basic"
                label="profile-image"
                type="text"
                variant="outlined"
                value={formData.profileImage}
                onChange={handleInputChange}
                required
                style={{ marginBottom: '30px' }}
              />
              <TextField
                fullWidth
                name='phoneNumber'
                className="phoneNumber"
                id="outlined-basic"
                label="phoneNumber"
                type="number"
                variant="outlined"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                style={{ marginBottom: '30px' }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Stack direction="row" spacing={2}>
                            <Button 
                            onClick={handleCancel}
                            variant="outlined"
                             color="success" 
                             startIcon={<CloseIcon />}>
                                Close
                            </Button>
                            <Button type="submit" 
                            variant="contained" 
                            onClick={handleSubmit}
                            className="btn">
                                Send
                            </Button>
                        </Stack>
                    </div>
        </div>
      </form>
      <Snackbar
        open={successAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        message="Customer edit successfully"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
      <Snackbar
        open={errorAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        message={errorMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </>
  )
}
