import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../css/Admin.css'




export default function Add() {

  const navigate = useNavigate();
  return (

    <section className="Admin">
      <div className="Admin-box">
        <h1 className="Admin-title">Add Amenity</h1>

        <table className="table">
          <tbody id="customers">
            <tr>
              <td>Amenity Name</td>
              <td>
                <form>
                  <input type="text" placeholder="Enter Amenity Name" />
                </form>
              </td>
            </tr>
            <tr>
              <td>Days Available</td>
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
            <tr>
              <td>Times Available</td>
              <td>
                <select name="rooms" id="rooms">
                  <option value="option0">Start Time</option>
                </select>
                <select name="rooms" id="rooms">
                  <option value="option0">End Time</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        <button className="add">Add Amenity</button>
        <button className="back"onClick={() => navigate(-1)}>Back</button>

        

      </div>
    </section>

  )

}
