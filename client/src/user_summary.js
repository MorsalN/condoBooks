import React, { Component } from "react";
import { useNavigate, useParams } from "react-router-dom";


  export default function Summary() {

    const navigate = useNavigate();

  const params = useParams()
  console.log(params)


  function handleClickHome() {
    navigate(`/`);
  }

  function handleClickCancel() {
    navigate(`/${params.user_id}/booking`);
  }


    return (
      <section className="User">
      <div className="User-box">
        <h1 className="User-title">Summary</h1>

        <table className="table">
          <tbody id="customers">

          <h1 className="booked">Booked!</h1>

            <tr>
              <td><h3>Amenity</h3></td>
              <td>Gym Room</td>
            </tr>

            <tr>
              <td><h3>Booking Date and Time</h3></td>
              <td>Feb 22, 2022 at 2:00pm</td>
            </tr>

          </tbody>
        </table>

        <p className="note">Please note that admin may make changes if need be. </p>
      
        <div className="summary-buttons">
              <button className="cancel" onClick={handleClickCancel}>Cancel</button>
              <button className="home" onClick={handleClickHome}>Home</button>

        </div>

      </div>
    </section>
    )

}
