import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/Admin.css";
import axios from "axios";
import { useEffect, useState } from "react";
import TimePicker from 'react-time-picker';
import useApplicationData from "../hooks/useApplicationData";
// import { add } from "nodemon/lib/rules";



export default function Add(props) {

  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState(1);
  const [start, setStart] = useState('09:00');
  const [end, setEnd] = useState('22:00');

  const params = useParams()
  const navigate = useNavigate();

   //generate a 6 alpha numeric character
   function generateNumber() {
    return Math.floor(Math.random() * 100);
  }

  function validate() {
    const id = generateNumber();
      const newAmenity = { id, name, capacity , available_from: "2022-01-22T02:04:01.000Z", available_to: "2023-01-03T02:04:01.000Z"};

      
      props.addAmenity(newAmenity)
        .then(navigate(`/${params.user_id}/amenities`) )
  }

 
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
                <label>
                  Start Time
                </label>
                <TimePicker
                  onChange={setStart}
                  value={start}
                />

                <label>
                  End Time
                </label>
                <TimePicker
                  onChange={setEnd}
                  value={end}
                />

              </td>
            </tr>
          </tbody>
        </table>

        <button className="add" onClick={validate}>
          Add Amenity
        </button>
        <button className="back" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </section>
  );
}
