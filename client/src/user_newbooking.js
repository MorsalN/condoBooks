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
  const [amenities, setAmenities] = useState([]);
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
    axios
      .get(`/api/users/${params.user_id}/${amenity_id}/bookings`) // You can simply make your requests to "/api/whatever you want"
      .then((response) => {
        // console.log("Booking response", response.data)
        //Need to Map response.data to convert the incoming data to Calender format
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

  //Function to save the event in database
  const handleSelect = ({ start, end }) => {
    const title = window.prompt("Book Amenitiy Time");
    if (title) {
      const events = { start, end, title, currentAmenity: state.currentAmenity };
      return axios
        .post(`/api/bookings/${params.user_id}`, { events })
        .then((res) => {
<<<<<<< HEAD
          const newAppointment = {
            start: moment.utc(res.data.start_time).toDate(),
            end: moment.utc(res.data.end_time).toDate(),
            title: res.data.title,
          }; // assuming object { booking_id: 1, start: <date>, end: <data> ... }
          setState({
<<<<<<< HEAD
            ...state,
            events: [...state.events, newAppointment],
          });
=======
          navigate(`/bookings/${res.data.id}/summary`);
>>>>>>> 53a7ade03ec2b3aea86ea138930cf7e4e76af014
        });
=======
           ...state,
           events: [...state.events, newAppointment]
          })
        })
      )
>>>>>>> edit_amenities
    }
  };

  return (
<<<<<<< HEAD
    <section className="Admin">
      <div className="Admin-box">

        <td><h2>Select Amenity Room</h2></td>
        <td>
          <select className="room-options" name="rooms" id="rooms" onChange={(e => selectCalender(e.target.value))}>
            <option value="options">Choose From Options</option>
            {selectdAmenities}
          </select>
        </td>


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
                  timeslots={4}
                  min={new Date(2008, 0, 1, 8, 0)} // 8.00 AM
                  max={new Date(2008, 0, 1, 17, 0)}
                  //onSelectSlot={this.selectSlotHandler}
                  //onSelectEvent={event => alert(event.title)}
                  onSelectEvent={(event) => setState((previousState) => {
                    const events = [...previousState.events];
                    const indexOfSelectedEvent = events.indexOf(event);
                    return { events };
                  })}
                  onSelectSlot={handleSelect} />
                <button>Cancel</button>
              </div>
            </div>
          </div>
<<<<<<< HEAD
=======
    <section className="Calendar">
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
            onSelectEvent={(event) =>
              setState((previousState) => {
                console.log(event);
                const events = [...previousState.events];
                const indexOfSelectedEvent = events.indexOf(event);
                // console.log("I am index", indexOfSelectedEvent);
                // console.log("this is all the events booked", events[0]);
                // events.splice(indexOfSelectedEvent, 1);
                return { events };
              })
            }
            onSelectSlot={handleSelect}
          />
          <button
            // onClick={
            //   (event) =>
            //     //cancel() /*this place should splice the events from onSelectEvent*/
            // }
          >
            Cancel
          </button>
>>>>>>> edit_amenities
        </div>
      }
=======
        }
>>>>>>> 53a7ade03ec2b3aea86ea138930cf7e4e76af014
      </div>
    </section>
  );

  return { amenities, setAmenities };
}
