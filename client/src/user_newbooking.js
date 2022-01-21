import React, { useState, useEffect } from "react";
import {
  createRoutesFromChildren,
  Redirect,
  useParams,
} from "react-router-dom";
import axios from "axios";
import { Calendar, momentLocalizer, TimeGrid } from "react-big-calendar";
import moment from "moment";
import "./css/Calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./css/Admin.css";
const localizer = momentLocalizer(moment);

export default function NewBooking(props) {
  //defining state of the event
  const [state, setState] = useState({
    // event represent a booking
    currentAmenity: null,
    events: [
      {
        start: moment().toDate(),
        end: moment().add(1, "days").toDate(),
        title: "Event",
      },
    ],
  });

  //defining state of an Amenity
  const [amenities, setAmenities] = useState([]);

  const params = useParams();
  console.log(params);

  //Initial request to get all amenities
  useEffect(() => {
    axios.get(`/api/users/amenities`).then((response) => {
      console.log("amenities response data", response.data);
      setAmenities(response.data);
    });
  }, []);
  console.log("Printing amenities", amenities);

  const selectdAmenities = amenities.map((room, index) => {
    return (
      <option key={index} value={room.id}>
        {room.name}
      </option>
    );
  });

  //Generate random number for ID

  const selectCalender = function(amenity_id){
     //useEffect to make the get data from backend at every render
    axios
      .get(`/api/users/${params.user_id}/${amenity_id}/bookings`) // You can simply make your requests to "/api/whatever you want"
      .then((response) => {
        console.log("Booking response",response.data)
        //Need to Map response.data as there are multiple events coming back from server
        let appointments = response.data;
        appointments = appointments.map((appointment) => {
          return {
            start: moment.utc(appointment.start_time).toDate(),
            end: moment.utc(appointment.end_time).toDate(),
            title: appointment.title,
          };
        });
        setState({
          events: appointments,
          currentAmenity: amenity_id
        });
      })
      .catch(function (error) {
        console.log(error);
      });

  }


  const handleSelect = ({ start, end }) => {
    const title = window.prompt("Book Amenitiy Time");
    if (title) {
      const events = { start, end, title, currentAmenity:state.currentAmenity };
      console.log("events", events);
      return axios
        .post(`/api/bookings/${params.user_id}`, { events })
        .then((res) => {
          const newAppointment = {
            start: moment.utc(res.data.start_time).toDate(),
            end: moment.utc(res.data.end_time).toDate(),
            title: res.data.title,
          }; // assuming object { booking_id: 1, start: <date>, end: <data> ... }
          setState({
            ...state,
            events: [...state.events, newAppointment],
          });
        });
    }
  };


  // render() {
  return (
    <section className="Admin">
      <div className="Admin-box">


        <td>Select Amenity Room</td>
        <td>
          <select name="rooms" id="rooms" onChange={(e => selectCalender(e.target.value))}>
          <option value="option0">Choose From Options</option>
            {selectdAmenities}
          </select>
        </td>
      </div>


      {state.currentAmenity && 
      <div className="Calendar">
        <div className="Calendar_box">
          <div style={{ width: 700, height: 500 }}>
            <Calendar
              localizer={localizer}
              defaultDate={new Date()}
              defaultView="month"
              events={state.events}
              style={{ height: "100%", width: "100%" }}
              selectable={true}
              //onSelectSlot={this.selectSlotHandler}
              // onSelectEvent={event => alert(event.title)}
              // onSelectEvent={(event) => setState((previousState) => {
              //   console.log(event);
              //   const events = [...previousState.events];
              //   const indexOfSelectedEvent = events.indexOf(event);
              //   console.log("I am index", indexOfSelectedEvent);
              //   console.log("this is all the events booked", events[0]);
              //   // events.splice(indexOfSelectedEvent, 1);
              //   return { events };
              // })}
              onSelectSlot={handleSelect} />
            <button>Cancel</button>
          </div>
        </div>
      </div>
}
    </section>
  );
}
