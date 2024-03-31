import React from 'react'
import {  Routes ,Route,Navigate} from 'react-router-dom';
import {  DashboardLyout } from './DashboardLyout';
import { Customer } from '../comopnent/Customer';
import { Dashboard } from '../comopnent/Dashboard';
import { AuthenticationLayout } from './AuthenticationLayout';
import { Login } from '../comopnent/Login';
import { Signpage} from '../comopnent/Signpage';
import { SupportTicket } from '../comopnent/SupportTicket';
import { Transaction } from '../comopnent/Transaction';
import { ForgetPassword } from '../comopnent/ForgetPassword';
import { AddCustomer } from '../comopnent/AddCustomer';
import { EditCustomer } from '../comopnent/EditCustomer';


export const MyRouter = () => {
  

  return (
    <Routes>
        <Route  element={<DashboardLyout/>}>
          <Route path='/dashboard' element={<Dashboard/>}/>
         <Route path='/customer' element={<Customer/>}/>
         <Route path='/addCustomer' element={<AddCustomer/>}/>
         <Route path='/supportticket' element={<SupportTicket/>}/>
         <Route path='/transaction' element={<Transaction/>}/>
         <Route path='/forgetPassword' element={<ForgetPassword/>}/>
         <Route path='editCustomer/:id' element={<EditCustomer/>}/>
        
        </Route>
        <Route path='/' element={<AuthenticationLayout/>}>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signpage' element={<Signpage/>}/>
        </Route>
      </Routes>
  )
}
