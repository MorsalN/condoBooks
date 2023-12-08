import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { formatDate, formatTimeslot } from "./helpers/date-helper";


export default function Summary(props) {
  const [booking, setBooking] = useState();

  const navigate = useNavigate();
  const params = useParams()

  function handleClickHome() {
    navigate(`/`);
  }

  function handleClickCancel() {
    //navigate(`/${params.user_id}/booking`);
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
          navigate(`/1/booking`);
        }
          )
    }
     else {
      return alert(`You cant delete this ${booking.title}"`);
    }
  };

  // Getting the booking and amenity data from the back-end
  useEffect(() => {
    axios.get(`/api/bookings/${params.booking_id}`)
      .then((response) => {
        setBooking({ ...response.data.booking, amenity: response.data.amenity });
      });
  }, [params]);

  // If there is no booking
  if (!booking) {
    return <p>Loading!</p>
  }

  console.log('booking:', booking)
  return (
    <section className="User">
      <div className="User-box">
        <h1 className="User-title">Summary</h1>

        <table className="table">
          <tbody id="customers">

            <h1 className="booked">Booked!</h1>

            <tr>
              <td><h3>Amenity</h3></td>
              <td>{booking.amenity.name}</td>
            </tr>

            <tr>
              <td><h3>Booking Time</h3></td>
              <td>
                {formatTimeslot(booking.start_time, booking.end_time)}
              </td>
            </tr>

          </tbody>
        </table>

        <p className="note">Please note that admin may make changes if need be. </p>
        <div className="summary-buttons">
          <button className="cancel" onClick={(e) => {handleClickCancel(e)}}>Cancel</button>
          <button className="home" onClick={handleClickHome}>Home</button>

        </div>

      </div>
    </section>
  )

}
