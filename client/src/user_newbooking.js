import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Calendar, momentLocalizer, TimeGrid } from "react-big-calendar";
import moment from "moment";
import './css/Calendar.css'
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);



export default function NewBooking(props) {


  useEffect(() => {

    axios.get('/api/users', {params:{user_id:1}}) // You can simply make your requests to "/api/whatever you want"
    .then((response) => {
      // handle success
      console.log(response.data) // The entire response from the Rails API

      console.log(response.data.message) // Just the message
      // this.setState({
      //   message: response.data.message
      // });
    }) 

    // axios.get('/api/slot', {params:{user_id:1}}) // You can simply make your requests to "/api/whatever you want"
    // .then((response) => {
    //   // handle success
    //   console.log(response.data) // The entire response from the Rails API

    //   console.log(response.data.message) // Just the message
    //   // this.setState({
    //   //   message: response.data.message
    //   // });
    // }) 


  })


  const [state, setState] = useState({
     // event represent a booking
     events: [
      {
        start: moment().toDate(),
        end: moment()
          .add(1, "days")
          .toDate(),
        title: "Event"
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
    console.log('handleselect')


    console.log('props:',props.events)
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
          onSelectEvent={event => 
          
            setState((previousState) => {
              console.log(event);
              const events = [...previousState.events]
              const indexOfSelectedEvent = events.indexOf(event)
              console.log(indexOfSelectedEvent);
              console.log("this is all the events booked", events);
              // events.splice(indexOfSelectedEvent, 1);
              return { events };
            })       

          }
          onSelectSlot={handleSelect}
        />
        <button onClick={event => cancel()/*this place should splice the events from onSelectEvent*/} >Cancel</button>
        </div>
      </div>
      </section>
      
    )
}
