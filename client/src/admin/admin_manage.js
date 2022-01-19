import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../css/Admin.css'


export default function Manage() {

  const navigate = useNavigate();

  const params = useParams()
  console.log(params)

  function handleClickAdd() {
    navigate(`/${params.user_id}/add`);
  }

  return (

    <section className="Admin">
      <div className="Admin-box">
        <h1 className="Admin-title">Manage Amenities</h1>

        <table className="table">
          <tbody id="customers">
            <tr>
              <td>Select Amenity Room</td>
              <td>
                <select name="rooms" id="rooms">
                  <option value="option0">Choose From Options</option>
                  <option value="option1">Gym Room</option>
                  <option value="option2">Party Room Floor 2</option>
                  <option value="option3">Party Room Floor 48</option>
                  <option value="option4">Basketball Room</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Change Days Available</td>
              <td>
                <select name="rooms" id="rooms">
                  <option value="option0">Calender to Choose Day</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Max Capacity for Bookings (Per Hour)</td>
              <td>
              <select name="rooms" id="rooms">
                  <option value="option0">1</option>
                  <option value="option1">2</option>
                  <option value="option2">5</option>
                  <option value="option3">10</option>
                  <option value="option4">20</option>
                  <option value="option2">50</option>
                  <option value="option3">100</option>
                </select>
                </td>
            </tr>
          </tbody>
        </table>

        <button className="add" onClick={handleClickAdd}>Add Amenity</button>
        <button className="back"onClick={() => navigate(-1)}>Back</button>

      </div>
    </section>

  )
}