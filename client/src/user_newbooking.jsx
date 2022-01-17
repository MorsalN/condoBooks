import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

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
    ]
  };

  render() {
    return (
      <div className="App">
        <div style = {{width:700, height:500}}> 
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          style={{ height: "100%", width: "100%" }}
        />

        </div>
      </div>
      
    )
  }
}

export default NewBooking;