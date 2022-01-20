import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/Admin.css";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Add() {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState(1);

  function generateNumber() {
    //   //generate a 6 alpha numeric character
    return Math.floor(Math.random() * 100);
  }

  const addAmenity = function () {
    //console.log(name, capacity)
    const id = generateNumber();
    const newAmenity = { id, name, capacity };

    return axios.post('/api/admin/amenities', { newAmenity })
  };

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
                  <input
                    type="text"
                    placeholder="Enter Amenity Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
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
                <select
                  name="rooms"
                  id="rooms"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
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

        <button className="add" onClick={addAmenity}>
          Add Amenity
        </button>
        <button className="back" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </section>
  );
}
