import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import './css/User.css'


export default function Homepage() { 

  const navigate = useNavigate();

  const params = useParams()
  console.log(params)


  function handleClick() {
    //navigate(`/${params.user_id}/booking`);
    navigate(`/1/booking`);
  }
    return (
      <section className="User">
      <div className="User-box">
        <h1 className="User-title">Welcome!</h1>

        <table className="table">
          <tbody id="customers-user">


            <tr>
              <td><div className="numberCircle">1</div></td>
              <td><p className="home-text-1"><strong>Click </strong> New Booking</p></td>
            </tr>

            <tr>
              <td><div className="numberCircle">2</div></td>
              <td><p className="home-text-1"><strong>Choose</strong> Amenity Room, Day and Time!</p></td>
            </tr>

            <tr>
              <td><div className="numberCircle">3</div></td>
              <td><p className="home-text-1"><strong>Confirm</strong> Booking</p></td>
            </tr>

      
           

          </tbody>
        </table>
      
              <button className="new" onClick={handleClick}>Create New Booking</button>

      </div>
    </section>

    )
}