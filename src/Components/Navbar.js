import React from 'react'

// user react-router-dom for routing
import { BrowserRouter, Routes, Route,Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div style={{alignItems:"center",position:"fixed",top:"0px",display:"flex",justifyContent:"space-between",width:"100vw",padding:"20px 20px",paddingTop:"20px",zIndex:"10000"}} className='navbar'>
      <div>
        <img src="/assets/logos/logo1.jpg" alt="logo" style={{width:"36px",height:"36px"}} />
      </div>
      <ul style={{fontFamily:"arial, serif",display:"flex",gap:"40px",listStyleType:"none",fontSize:"1em",color:"white"}}>


        
        <li><Link to="/about">About</Link></li>
        <li><a href="#events">Events</a></li>
        <li><a href="#games">Games</a></li>
        <li><Link to="/team">Team</Link></li>
        <li><a href="#gallery">Gallery</a></li>
        <li><a href="/contact">Contact</a></li>

      </ul>

      <div style={{paddingRight:"22px",fontWeight:"600"}}>
        LOGIN
      </div>
    </div>
  )
}

export default Navbar
