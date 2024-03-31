import React from 'react'
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import axios from 'axios';


const columns = [
  { id: '_id', label: 'ID', minWidth: 170 },
  { id: 'first_name', label: 'First Name', minWidth: 100 },
  { id: 'last_name', label: 'Last Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'industry_type', label: 'Industry Type', minWidth: 170 },
  { id: 'account_status', label: 'Account Status', minWidth: 170 },
  { id: 'customer_type', label: 'Customer Type', minWidth: 170 },
  { id: 'createdAt', label: 'Created At', minWidth: 170 },
];


const SearchBar = ({ setSearchQuery }) => (
  <form>
    <TextField
      className="text"
      onInput={(e) => {
        setSearchQuery(e.target.value);
      }}
      placeholder="Search Customer..."
      size="small"
    />
  </form>
);

export const Customer = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("");
  const [customers, setCustomers] = useState([])
  const [page, setPage] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  //   handle api to get customer 

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'x-sh-auth': token,
      };

      const response = await axios.post(
        'http://146.190.164.174:4000/api/customer/get_customers',
        {},
        { headers: headers }
      );
      const data = response.data.customer.map((val) => {
        return (
          {
            ...val,
            email: val.user.email
          }
        )
      })
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error.response);
    }
  };
  //end customer get api calling


  const handleDeleteCustomer = async (id) => {

    // Function to delete a post using Axios
    try {
      const response = await axios.delete(`http://146.190.164.174:4000/api/customer/delete_customer/${id}`, {
        headers: {
          'x-sh-auth': localStorage.getItem('token')
        }
      });
      console.log("Post deleted:", id);
      setCustomers(customers.filter((customers) => customers.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error.response);
    }
  };

  //handle edit page
  const handleEditCustomer = (row) => {
    console.log(row._id, "hjkkhjj");
    navigate(`/editCustomer/${row._id}`, { state: row })
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleClose = () => {
    setAnchorEl(null);
  }; 

  return (
    <div style={{ marginTop: -70 }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div>
            <Avatar sx={{ bgcolor: deepPurple[500] }}>M</Avatar>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }} className='mt-5'>
          <Link to='/addCustomer'><Button variant="contained" className='btn' startIcon={<AddIcon />}>
            Add Customer
          </Button>
          </Link>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }} className='mt-3'>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <div
            className="text"
            style={{
              justifyContent: "normal",
              fontSize: '10px',
              color: "white",
            }}
          >
          </div>
        </div>

        <div style={{ textAlign: 'left', fontSize: 'bold' }}>
          <h3>Customer</h3>
        </div>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                      {column.label}
                    </TableCell>
                  ))}
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === 'email' ? row.user.email : row[column.id]}
                            {/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
                          </TableCell>
                        );
                      })}
                      {/* <TableCell align="right">
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDeleteCustomer(row.user_id)}
                      >
                        Delete
                      </Button>
                    </TableCell> */}

                      <div style={{ display: 'flex', justifyContent: 'flex-end' ,marginTop:15}}>
                        <Button
                          id="basic-button"
                          aria-controls={open ? 'basic-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                          onClick={handleClick}
                        >
                        <MoreVertIcon/>
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
                          <MenuItem onClick={()=>handleEditCustomer(row)}>Edit</MenuItem>
                          <MenuItem onClick={()=>handleDeleteCustomer(row.user._id)}>Delete</MenuItem>

                        </Menu>
                      </div>

                      {/* <TableCell>
                        <Button onClick={() => handleEditCustomer(row)}
                        >Edit</Button>
                        <Button onClick={()=>handleDeleteCustomer(row.user._id)} >Delete</Button>
                      </TableCell> */}

                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={customers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>

  )
}

