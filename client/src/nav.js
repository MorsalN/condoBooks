import React, { Component } from "react";
import Logo from './images/home.png'
import './css/Nav.css'
import {Link, Redirect} from "react-router-dom";

// class Nav extends Component {

  export default function Nav(props) {

  // state = {
  //   redirect: false
  // }
  // render(){
  return (

    <nav className="navbar">
          <nav className="navbar_left">
            {/* <Logo className="navbar_logo" onClick={this.redirectHome}/> */}
            <img src={Logo} alt ="Logo"className="navbar_logo" onClick={props.redirectHome}/>
          </nav>
          <nav className="navbar_right">
            <button className="navbar_logout" onClick={props.logout}>Logout</button>
          </nav>
    </nav>

    )
  // }
}

// export default Nav