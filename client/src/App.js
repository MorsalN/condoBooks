import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Homepage from './user_homepage';
import NewBooking from './user_newbooking';
import Summary from './user_summary';
import Amenities from './admin/admin_homepage';
import Add from './admin/admin_add';
import Manage from './admin/admin_manage';
import Nav from './nav';
import useApplicationData from './hooks/useApplicationData';



// class App extends Component {
const App = () => {

  const {
    amenities, addAmenity, setAmenities
  } = useApplicationData();
  // constructor(props) {
  // super(props)
  // this.state = {
  //   // message: 'Click the button to load data!'
  // }
  // }

  const fetchData = () => {
    //   axios.get('/api/data') // You can simply make your requests to "/api/whatever you want"
    //   .then((response) => {
    //     // handle success
    //     console.log(response.data) // The entire response from the Rails API

    //     console.log(response.data.message) // Just the message
    //     this.setState({
    //       message: response.data.message
    //     });
    //   }) 

    // Homepage for Users
    axios.get('/api/user', { params: { user_id: 1 } }) // You can simply make your requests to "/api/whatever you want"
      .then((response) => {
        // handle success
        console.log(response.data) // The entire response from the Rails API

        console.log(response.data.message) // Just the message
        this.setState({
          message: response.data.message
        });
      })

    axios.post('/api/slot', { params: { user_id: 1 } }) // You can simply make your requests to "/api/whatever you want"
      .then((response) => {
        // handle success
        console.log(response.data) // The entire response from the Rails API

        console.log(response.data.message) // Just the message
        this.setState({
          message: response.data.message
        });
      })

  }

  // render() {
  return (

    <BrowserRouter>
      <Nav />
      <main className='main-container'>
        <Routes>

          <Route path='/route' element={<div>This is a new route</div>} />

          {/* Homepage for User (src/user_homepage.jsx) */}
          <Route path='/' element={<Homepage />} />

          {/* New Amenity Booking (src/user_newbooking.jsx) */}
          <Route path='/:user_id/booking' element={<NewBooking amenities={amenities}/>} />

          {/* Summary Route (src/user_summary.jsx) */}
          <Route path='/bookings/:booking_id/summary' element={<Summary />} />

          {/* Admin - Homepage (src/admin/admin_homepage.jsx) */}
          <Route path='/:user_id/amenities' element={<Amenities amenities={amenities} />} />

          {/* Admin - Add Amenities (src/admin/admin_add.jsx) */}
          <Route path='/:user_id/add' element={<Add addAmenity={addAmenity} amenities={amenities} setAmenities={setAmenities} />} />

          {/* Admin - Manage Amenities (src/admin/admin_manage.jsx) */}
          <Route path='/:user_id/manage' element={<Manage />} />

          {/* <Route path='/:user_id/nav' element= {<Nav />}/> */}

        </Routes>
      </main>
    </BrowserRouter>

  );
  // }
}

export default App;

