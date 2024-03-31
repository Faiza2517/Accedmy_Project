import React from 'react'
import { log } from '../comopnent/images'
import { Outlet } from 'react-router-dom'

export const LogoLayout = () => {
  return (
    <>
    <img src={log} style={{width:"20%"}}/>
    <Outlet/>
    </>
  )
}
