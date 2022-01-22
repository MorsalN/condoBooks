import React, { Component } from "react";
import Logo from './images/house.gif'
import './css/Nav.css'
import { useNavigate, useParams } from "react-router-dom";


export default function Nav(props) {

  const navigate = useNavigate();

  const params = useParams()
  console.log(params)


  function handleClickAdmin() {
    navigate(`/${params.user_id}/amenities`);
  }

  function handleClickUser() {
    navigate(`/${params.user_id}/booking`);
  }

  function handleClick() {
    navigate(`/`);
  }

  return (

    <nav className="navbar">
      <nav className="navbar_left">
        <img src={Logo} alt="Logo" className="navbar_logo" onClick={handleClick} />
        <div className="condo"><strong>Condo</strong></div>
        <div className="condo-books">Books</div>
      </nav>
      {/* <nav className="navbar_mid">
      <button className="navbar_admin" onClick={handleClickAdmin}>Admin</button>
      <button className="navbar_user" onClick={handleClickUser}>User</button>
      </nav> */}
      <nav className="navbar_right">
        <button className="navbar_logout" onClick={props.logout}>Logout</button>
      </nav>
    </nav>
  )
}

