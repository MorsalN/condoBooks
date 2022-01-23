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
const localizer = momentLocalizer(moment);

export default function NewBooking(props) {
  //defining state of an Amenity
  console.log("props in newBooking", props)
  const [amenities, setAmenities] = useState([]);
  //defining state of the event
  const [state, setState] = useState({
    // event represent a booking
    currentAmenity: null, availableFrom: "", availabelTo: "",
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
      // console.log("amenities response data", response.data);
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
    axios.get(`/api/amenities/${amenity_id}`)
    ])
      .then((response) => {
        console.log("Booking response", response)
        console.log("response[1].data.available_from,", response[1].data.available_from)
        console.log("response[1].data.available_from,", response[1].data.available_to)
        
        //Need to Map response.data to convert the incoming data to Calender format
        let appointments = response[0].data;
        console.log("appointments", appointments)
        appointments = appointments.map((appointment) => {
          return {
            start: moment.utc(appointment.start_time).toDate(),
            end: moment.utc(appointment.end_time).toDate(),
            title: appointment.title,
            id: appointment.id
          };
        });
        setState({
          events: appointments,
          currentAmenity: amenity_id,
          availableFrom: response[1].data.available_from,
          availableTo: response[1].data.available_to
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
    console.log("booing info", booking)
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
        }
          )
    }
     else {
      return alert(`You cant delete this ${booking.title}"`);
    }
  };

  return (
    <section className="Admin">

      <div className="Admin-box">
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
                  // min={(state.availableFrom)} // 8.00 AM
                  // max={(state.availabelTo)}
                  min={new Date(2008, 0, 1, 6, 0)} // 8.00 AM
                  max={new Date(2008, 0, 1, 22, 0)}
                  //onSelectSlot={this.selectSlotHandler}
                  //onSelectEvent={event => alert(event.title)}
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
    </section>
  );
  return { amenities, setAmenities };
}
