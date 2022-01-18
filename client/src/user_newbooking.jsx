import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import './css/Calendar.css'
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);
let startDate;
let endDate;

class NewBooking extends Component {

  state = {
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
  };

//This is to stick the selection and bring the alert event

  handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name')
    if (title)
      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title,
          },
        ],
      })
  }

  selectSlotHandler = (slot) => {
    startDate = slot.start;
    endDate = slot.end;
    // console.log(slot.start)
    // console.log(slot.end)
    // console.log(slot)
  }

  selectingTimeSlot = (timeSlot) => {
    console.log(timeSlot);
    console.log("Hello World")
    return true;
  }
  render() {
    return (
      <section className="Calendar">
      <div className="Calendar_box">
        <div style = {{width:700, height:500}}> 
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          style={{ height: "100%", width: "100%" }}
          selectable ={true}
          //onSelectSlot={this.selectSlotHandler}
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={this.handleSelect}
        />
        </div>
      </div>
      </section>
      
    )
  }
}

export default NewBooking;