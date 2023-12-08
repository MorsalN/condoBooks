import React, { useState, useEffect } from "react";
import {
  createRoutesFromChildren,
  useNavigate,
  useParams,
} from "react-router-dom";
import axios from "axios";
import { Calendar, momentLocalizer, TimeGrid } from "react-big-calendar";
import moment from "moment";
import "./css/Calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./css/Admin.css";
// const momentTimezone = require("moment-timezone");
// const m = (...args) => momentTimezone.tz(...args, "UTC");
// m.localeData = momentTimezone.localeData;
// const localizer = momentLocalizer(m);
const localizer = momentLocalizer(moment);

export default function NewBooking(props) {
  //defining state of an Amenity
  const [amenities, setAmenities] = useState([]);
  //defining state of the event
  const [state, setState] = useState({
    // event represent a booking
    currentAmenity: null,
    availableFrom: "",
    availableTo: "",
    events: [
      {
        start: moment().toDate(),
        end: moment().add(1, "days").toDate(),
        title: "Event",
      },
    ],
  });

  // Navigate and Params required to redirect to Summary Page
  const navigate = useNavigate();
  const params = useParams();

  //Initial request to get all amenities
  useEffect(() => {
    axios.get(`/api/users/amenities`).then((response) => {
      setAmenities(response.data);
    });
  }, []);

  //This will display amenities in drop down list
  const selectdAmenities = amenities.map((room, index) => {
    return (
      <option key={index} value={room.id}>
        {room.name}
      </option>
    );
  });

  //Function to display Calender on the basis of selected amenity
  const selectCalender = function (amenity_id) {
    Promise.all([
      axios.get(`/api/users/${params.user_id}/${amenity_id}/bookings`), // You can simply make your requests to "/api/whatever you want"
      axios.get(`/api/amenities/${amenity_id}`),
    ])
      .then((response) => {
        //Need to Map response.data to convert the incoming data to Calender format
        // const se = (response[1].data.available_from);
        // const ee = (response[1].data.available_to);
        console.log("response[1].data.available_from)", response[1].data.available_from)
        const se = moment(response[1].data.available_from).toDate();
        const ee = moment(response[1].data.available_to).toDate();
        console.log("se and ee", se, ee)

        let appointments = response[0].data;
        appointments = appointments.map((appointment) => {
          return {
            start: moment.utc(appointment.start_time).toDate(),
            end: moment.utc(appointment.end_time).toDate(),
            title: appointment.title,
            id: appointment.id,
          };
        });
        setState({
          events: appointments,
          currentAmenity: amenity_id,
          availableFrom: se,
          availableTo: ee
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //Function to save the event in database
  const handleSelect = ({ start, end }) => {
    const title = window.prompt("Book Amenitiy Time");
    if (title) {
      const events = {
        start,
        end,
        title,
        currentAmenity: state.currentAmenity,
      };
      return axios
        .post(`/api/bookings/${params.user_id}`, { events })
        .then((res) => {
          if (res.data.message === "Error") {
            alert("Max Capacity reached for this hour pls select other slot");
            navigate(`/1/booking`);
          } else {
            navigate(`/bookings/${res.data.id}/summary`);
          }
        });
    }
  };

  const deleteBooking = (booking) => {
    let confirmation = window.confirm(
      `Are you sure you want to delete the ${booking.title}?`
    );
    if (confirmation) {
      //send delete request to backend servers
      return axios
        .delete(`/api/bookings/${booking.id}`, { booking })
        .then(() => {
          confirmation = window.confirm("Appointment Deleted");
          window.location.reload();
        });
    } else {
      return alert(`You cant delete this ${booking.title}"`);
    }
  };

  console.log("state.available from", state.availableFrom)
  console.log("state.available to", state.availableTo)

  return (
    <section className="Admin">
      <div className="Admin-box">
        <div className="Admin-container">
          <td>
            <h2>Select Amenity Room</h2>
          </td>
          <td>
            <select
              className="room-options"
              name="rooms"
              id="rooms"
              onChange={(e) => selectCalender(e.target.value)}
            >
              <option value="options">Choose From Options</option>
              {selectdAmenities}
            </select>
          </td>

          {state.currentAmenity && (
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
                    timeslots={2}
                    //action="click"
                    // min={new Date(state.availableFrom)} // 8.00 AM
                    // max={new Date(state.availableTo)}
                    min={state.availableFrom} // 8.00 AM
                    max={state.availableTo}
                    onSelectEvent={(e) => {
                      deleteBooking(e);
                    }}
                    onSelectSlot={handleSelect}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
  return { amenities, setAmenities };
}
