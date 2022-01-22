import React, { Component } from "react";
import Logo from './images/house.gif'
import './css/Nav.css'
import { useNavigate, useParams } from "react-router-dom";


export default function Nav(props) {

  const navigate = useNavigate();

  const params = useParams()
  console.log(params)

  function handleClick() {
    navigate(`/`);
  }

  return (

    <nav className="navbar">
      <nav className="navbar_left" onClick={handleClick}>
        <img src={Logo} alt="Logo" className="navbar_logo"  />
        <div className="condo"><strong>Condo</strong></div>
        <div className="condo-books">Books</div>
      </nav>
  
      <nav className="navbar_right">
        <button className="navbar_logout" onClick={props.logout}>Logout</button>
      </nav>
    </nav>
  )
}

