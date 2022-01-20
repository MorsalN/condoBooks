import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import axios from "axios";
import { Calendar, momentLocalizer, TimeGrid } from "react-big-calendar";
import moment from "moment";
import "./css/Calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
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

  const setEvents = (events) => setState((prev) => ({ ...prev, events }));
  const params = useParams();
  console.log(params);

  //useEffect to made the get data from backend at every render
  useEffect(() => {
    axios
      .get(`/api/users/${params.user_id}/bookings`) // You can simply make your requests to "/api/whatever you want"
      .then((response) => {
        console.log("response",response)
        // setState((prev) => ({
        //   ...prev,
        //   events: [
        //     {
        //       start: moment(response.data[0].start_time).toDate(),
        //       end: moment(response.data[0].end_time).toDate(),
        //       title: response.data[0].title,
        //     },
        //   ],
        // }));

        let appointments = response.data
        appointments = appointments.map(appointment => {
          return {
            start: moment.utc(appointment.start_time).toDate(),
            end: moment.utc(appointment.end_time).toDate(),
            title: appointment.title
          }
        })
        
        setState ({
          events: appointments
        })
  
      })
      .catch(function (error) {
        console.log(error);
      });
  },[]);

  // Resets Form to empty values
  // const reset = function () {
  //   // setStudent("");
  //   setState({
  //     events: [
  //       {
  //         start: moment().toDate(),
  //         end: moment().add(1, "days").toDate(),
  //         title: "Event 1",
  //       },
  //     ],
  //   });
  //   // }
  // };

  // Reset Form and cancels
  // const cancel = function () {
  //   reset();
  //   // props.onCancel();
  // };

  //This is to stick the selection and bring the alert event

  // const handleSelect = ({ start, end }) => {
  //   const title = window.prompt("Book Amenitiy Time");
  //   console.log("handleselect");
  //   console.log("props:", props.events);
  //   if (title)
  //     setState({
  //       events: [
  //         ...state.events,
  //         {
  //           start,
  //           end,
  //           title,
  //         },
  //       ],
  //     });
  // };

  //generate random id
   function generateNumber() {
  //   //generate a 6 alpha numeric character
    return Math.floor(Math.random() * 100);
   }

    const handleSelect = ({ start, end }) => {
      const title = window.prompt('Book Amenitiy Time')
      const id = generateNumber();
      if(title) {
      const events = {start, end, title}
      console.log("events", events)
      return (
        axios.post(`/api/bookings/${params.user_id}/${id}`,{events})
        .then(res => {
          const newAppointment = {
            start: moment.utc(res.data.start_time).toDate(),
            end: moment.utc(res.data.end_time).toDate(),
            title: res.data.title
           } // assuming object { booking_id: 1, start: <date>, end: <data> ... }
          setState({
           ...state,
           events: [...state.events, newAppointment]
          })
              })
      )
    }
  }
        
          
 

  // render() {
  return (
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
                console.log("I am index", indexOfSelectedEvent);
                console.log("this is all the events booked", events[0]);
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
        </div>
      </div>
    </section>
  );
}
