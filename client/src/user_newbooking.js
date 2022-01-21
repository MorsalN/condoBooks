import React, { useState, useEffect } from "react";
import { createRoutesFromChildren, Redirect, useParams } from "react-router-dom";
import axios from "axios";
import { Calendar, momentLocalizer, TimeGrid } from "react-big-calendar";
import moment from "moment";
import "./css/Calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import './css/Admin.css'
const localizer = momentLocalizer(moment);

export default function NewBooking(props) {
  //defining state of the event
  const [state, setState] = useState({
    // event represent a booking
    events: [
      {
        start: moment().toDate(),
        end: moment().add(1, "days").toDate(),
        title: "Event",
      },
    ],
  });

  //defining state of an Amenity
  const [amenities, setAmenities] = useState({
    amenities: [
      {
          id: null,
          name: "",
          capacity: null,
          availability: false,
          available_from: "",
          available_to: "",
      },
    ],
  });

  const params = useParams();
  console.log(params);

  //Initial request to get all amenities
  useEffect(() => {
    axios
    .get(`/api/users/${params.user_id}/amenities`)
    .then((response) => {
      console.log(response.data);
      let showAmenities = response.data;
      showAmenities = showAmenities.map((showAmenity) => {
        return {

          id: showAmenity.id,
          name: showAmenity.name,
          capacity: showAmenity.capacity,
          availability: showAmenity.availability,
          available_from: showAmenity.available_from,
          available_to: showAmenity.available_to,

        }
      });
      setAmenities({
        amenities:showAmenities,
      })
    });
  },[]);
console.log(amenities)
const selectdAmenities = amenities[0] ? amenities.map(
  (room, index) => {
    // console.log('room',room)
    return(
      <td>
        <select name="rooms" id="rooms">
          <option value={room.id}>{room.name}</option>
        </select>
      </td>
    )

  }
) : []


  //useEffect to make the get data from backend at every render
  useEffect(() => {
    axios
      .get(`/api/users/${params.user_id}/bookings`) // You can simply make your requests to "/api/whatever you want"
      .then((response) => {
        //console.log("response",response)
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
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  //Generate random number for ID

  function generateNumber() {
    return Math.floor(Math.random() * 100);
  }

  const handleSelect = ({ start, end }) => {
    const title = window.prompt("Book Amenitiy Time");
    const id = generateNumber();
    if (title) {
      const events = { start, end, title };
      console.log("events", events);
      return axios
        .post(`/api/bookings/${params.user_id}/${id}`, { events })
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
                {/* <select name="rooms" id="rooms">
                  <option value="option0">Choose From Options</option>
                  <option value="option1">Gym Room</option>
                  <option value="option2">Party Room Floor 2</option>
                  <option value="option3">Party Room Floor 48</option>
                  <option value="option4">Basketball Room</option>
                </select> */}
                {selectdAmenities}
              </td>
      </div>
    
    
    {/* <div className="Calendar">
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
              onSelectEvent={(event) => setState((previousState) => {
                console.log(event);
                const events = [...previousState.events];
                const indexOfSelectedEvent = events.indexOf(event);
                console.log("I am index", indexOfSelectedEvent);
                console.log("this is all the events booked", events[0]);
                // events.splice(indexOfSelectedEvent, 1);
                return { events };
              })}
              onSelectSlot={handleSelect} />
            <button>Cancel</button>
          </div>
        </div>
      </div> */}
      </section>
      
  );
}
