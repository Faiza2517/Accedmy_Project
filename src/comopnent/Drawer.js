import React from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import { log } from './images';
import { Link } from 'react-router-dom';



const drawerWidth = 240;
export const Drawerside = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
  
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <div>
          <img src={log} style={{ width: 100, marginTop: 5 }} />
        </div>

        <ListItem disablePadding>
          <div style={{ display: 'flex', alignItems: 'center', margin: '10px' }}>
            <Avatar sx={{ bgcolor: deepPurple[500] }}>M</Avatar>
            <span style={{ marginLeft: '20px', fontWeight: 'bold' }}>Meta Logic</span>
          </div>
        </ListItem>


        <Box sx={{ overflow: 'auto' }}>
          <List>
            <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </Link>
            <Link to="/Customer" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton>
                <ListItemIcon>
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary="Customer" />
              </ListItemButton>
            </Link>
            <Link to="/supportTicket" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton>
                <ListItemIcon>
                  <SupportAgentIcon />
                </ListItemIcon>
                <ListItemText primary="SupportTicket" />
              </ListItemButton>
            </Link>
            <Link to="/transaction" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton>
                <ListItemIcon>
                  <AccountBalanceIcon />
                </ListItemIcon>
                <ListItemText primary="Transaction" />
              </ListItemButton>
            </Link>


          </List>
        </Box>
      </Drawer>

    </Box>

  )
}
