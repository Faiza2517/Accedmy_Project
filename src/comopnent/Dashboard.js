import React from 'react'
import './style.css';
import Fab from '@mui/material/Fab';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import { Button } from '@mui/material';
import { useState } from 'react';
import { FormControl } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { Logout } from './Logout';
import { ChangePassword } from './ChangePassword';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';



export const Dashboard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const userEmail = localStorage.getItem("email");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // handle logout
  const navigate = useNavigate();
  const handleLogout = async () => {
    const success = await Logout(navigate);
  };

  // hanlde open model
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  // handle password change
  const handleChangePassword = async () => {
    try {
      const token = localStorage.getItem('token');
      const success = await ChangePassword({
        oldPassword: oldPassword,
        newPassword: newPassword,
        token: token
      });
      if (success) {
        alert('Password changed successfully!');
        setIsModalOpen(false);
      } else {
        alert('Failed to change password. Please try again.');
      }
    } catch (error) {
      console.error('Error changing password:', error.response);
      alert('Failed to change password. Please try again.');
    }
  };

  return (
    <div style={{ marginTop: -70 }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <div>
              <Avatar sx={{ bgcolor: deepPurple[500] }}>M</Avatar>
            </div>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}><b>Meta Logic</b></MenuItem>
            <MenuItem onClick={handleClose}>{userEmail}</MenuItem>
            <MenuItem onClick={handleOpenModal}>Change Password</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          aria-labelledby="change-password-modal"
          aria-describedby="change-password-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}
          >
            <ChangePassword
              oldPassword={oldPassword}
              newPassword={newPassword}
              setOldPassword={setOldPassword}
              setNewPassword={setNewPassword}
              setConfirmPassword={setConfirmPassword}
              handleChangePassword={handleChangePassword}
            />
          </Box>
        </Modal>

        <FormControl sx={{ m: 1, }} variant="outlined">

          <h4 className='txtst'>Hi,Welcome Back</h4>
          <div className='three '>
            <div className='first'>
              <div className='fab'>
                <Fab color="secondary" aria-label="add">
                  <i class="fa-solid fa-users"></i>
                </Fab>
              </div>

              <div className='text'>
                <h3>363</h3>
                <p>Total Users</p>

              </div>
            </div>



            <div className='first1'>

              <div className='fab'>
                <Fab color="secondary" aria-label="add">
                  <LanguageIcon />
                </Fab>
              </div>

              <div className='text'>
                <h3>93</h3>
                <p>Unverified Domains</p>

              </div>
            </div>
            <div className='first2'>

              <div className='fab'>
                <Fab color="secondary" aria-label="add">
                  <DoDisturbIcon />
                </Fab>
              </div>

              <div className='text'>
                <h3>104</h3>
                <p>Unverified Domains</p>
              </div>
            </div>


          </div>
        </FormControl>
      </div>
    </div>
  )
}
