import React from 'react'
import {NavLink} from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home"
import MenuIcon from "@mui/icons-material/Menu"
import Search from "@mui/icons-material/Search"
import Chat from "@mui/icons-material/Chat"
import InfoIcon from "@mui/icons-material/Info"
import BarChart from "@mui/icons-material/BarChart"
import TrendingUp from "@mui/icons-material/TrendingUp"
import Group from "@mui/icons-material/Group"
import Settings from "@mui/icons-material/Settings"
export const NavigationBar = () => {
  return (
    <div className='navmenu-section'>
        <ul>
            <li title='Home'>
                <NavLink to="/" className={({isActive})=>isActive ? "active":""}>
                    <HomeIcon/>
                </NavLink>
            </li>
            <li title='Menu'>
                <NavLink to="/menu" className={({isActive})=>isActive ? "active":""}>
                    <MenuIcon/>
                </NavLink>
            </li>
            <li title='Search'>
                <NavLink to="/search" className={({isActive})=>isActive ? "active":""}>
                    <Search/>
                </NavLink>
            </li>
            <li title='Chat'>
                <NavLink to="/chat" className={({isActive})=>isActive ? "active":""}>
                    <Chat/>
                </NavLink>
            </li>
            <li title='About'>
                <NavLink to="/about" className={({isActive})=>isActive ? "active":""}>
                    <InfoIcon/>
                </NavLink>
            </li>
            <li title='Graph'>
                <NavLink to="/graph" className={({isActive})=>isActive ? "active":""}>
                    <BarChart/>
                </NavLink>
            </li>
            <li title='Statistics'>
                <NavLink to="/statistics" className={({isActive})=>isActive ? "active":""}>
                    <TrendingUp/>
                </NavLink>
            </li>
            <li title='Users'>
                <NavLink to="/user" className={({isActive})=>isActive ? "active":""}>
                    <Group/>
                </NavLink>
            </li>
            <li title='Settings'>
                <NavLink to="/settings" className={({isActive})=>isActive ? "active":""}>
                    <Settings/>
                </NavLink>
            </li>
        </ul>
    </div>
  )
}