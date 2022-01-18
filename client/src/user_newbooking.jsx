import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import './css/Calendar.css'
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);

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

  selectSlotHandler = (slot) => {
    console.log(slot)
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
          onSelectSlot={this.selectSlotHandler}
        />
        </div>
      </div>
      </section>
      
    )
  }
}

export default NewBooking;