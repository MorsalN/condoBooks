import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import './css/Calendar.css'
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);



export default function NewBooking(props) {

  const [state, setState] = useState({
     // event represent a booking
     events: [
      {
        start: moment().toDate(),
        end: moment()
          .add(1, "days")
          .toDate(),
        title: "Event 1"
      }
    ],

    slot: []
  });

  // Resets Form to empty values
   const reset = function () {
    // setStudent("");
    setState({
      
      events: [
      {
        start: moment().toDate(),
        end: moment()
          .add(1, "days")
          .toDate(),
        title: "Event 1"
      }
    ]});
    // }
  }

  // Reset Form and cancels
  const cancel = function () {
    reset();
    // props.onCancel();
  }

  //This is to stick the selection and bring the alert event

  const handleSelect = ({ start, end }) => {
    const title = window.prompt('Book Amenitiy Time')
    if (title)
      setState({
        events: [
          ...state.events,
          {
            start,
            end,
            title,
          },
        ],
      })
  }

  const selectSlotHandler = (slot) => {
    // startDate = slot.start;
    // endDate = slot.end;
    // console.log(slot.start)
    // console.log(slot.end)
    // console.log(slot)
  }

  const selectingTimeSlot = (timeSlot) => {
    console.log(timeSlot);
    console.log("Hello World")
    return true;
  }
  // render() {
    return (
      <section className="Calendar">
      <div className="Calendar_box">
        <div style = {{width:700, height:500}}> 
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={state.events}
          style={{ height: "100%", width: "100%" }}
          selectable ={true}
          //onSelectSlot={this.selectSlotHandler}
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={handleSelect}
        />
        <button onClick={event => cancel()} >Cancel</button>
        </div>
      </div>
      </section>
      
    )
}
