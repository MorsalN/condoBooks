import React, { Component,  useEffect } from "react";
import { Redirect, useNavigate, useParams } from "react-router-dom";
import '../css/Admin.css'
import axios from "axios";


export default function Amenities() {
  const navigate = useNavigate();

  const params = useParams()
  console.log(params)

  function handleClickManage() {
    navigate(`/${params.user_id}/manage`);

  }

  function handleClickAdd() {
    navigate(`/${params.user_id}/add`);
  }

  useEffect(() => {
    axios
      .get(`/api/admin/amenities`) // You can simply make your requests to "/api/whatever you want"
      .then((response) => {
        console.log("amenities response",response)
      })
      .catch(function (error) {
        console.log(error);
      });
  },[]);
      

  return (

    <section className="Admin">
      <div className="Admin-box">
        <h1 className="Admin-title">Current Amenities</h1> 

          <table className="table">
            <tbody id="customers">
              <tr>
                <th>Room</th>
                <th>Start</th>
                <th>End</th>
                <th>Days</th>
                <th></th>
              </tr>
              <tr>
                <td>Gym</td>
                <td>09:00</td>
                <td>22:00</td>
                <td>All Days</td>
                <td><button className="manage" onClick={handleClickManage}>Manage Amenity</button></td>
              </tr>
              <tr>
                <td>Social</td>
                <td>09:00</td>
                <td>22:00</td>
                <td>All Days</td>
                <td><button className="manage" onClick={handleClickManage}>Manage Amenity</button></td>
              </tr>
            </tbody>
          </table>

          <button className="add" onClick={handleClickAdd}>Add Amenity</button>
          {/* <button onClick={() => navigate(-1)}>Go back</button> */}


      </div>
    </section>

  )

}
